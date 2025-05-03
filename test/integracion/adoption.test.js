import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:3000");


describe("===== INTEGRATION TEST FOR ADOPTIONS ROUTES =====", () => {

    let adminCookie;
    let userTestId;
    let petTestId;
    let adoptionId;
    let adminTestId 

    // Primero creamos un admin y un user y un pet para poder probar los endpoints de adoptions, ya que son privados
    before(async () => {

        //crear un administrador para las pruebas
        const admin = {
            first_name: "Admin",
            last_name: "Test",
            email: "admin@gmail.com",
            phone: "+54123456789",
            address: {
                street: "Calle Admin",
                number: 4859,
                apartment: "4th A",
                city: "Admin"
            },
            password: "!User123456",
            role: "admin"
        }

        const adminResponse = await request.post("/api/auth/register").send(admin);
        //verificamos que el registro fue exitoso
        expect(adminResponse.statusCode).to.be.equal(201);

        // Guarda el ID del admin
        adminTestId = adminResponse.body.payload._id;

        
        // Login como admin
        const adminData = {
            email: "admin@gmail.com",
            password: "!User123456",
        }

        const adminLoginResponse = await request.post("/api/auth/login").send(adminData);
        //verificamos que el login fue exitoso
        expect(adminLoginResponse.statusCode).to.be.equal(200);

        // Guarda la cookie de autenticación (usada para endpoints protegidos)
        adminCookie = adminLoginResponse.headers['set-cookie']?.[0];


        // Crear un user (adoptante)
        const user = {
            first_name: "User",
            last_name: "Test",
            email: "user@gmail.com",
            phone: "+54123456789",
            address: {
                street: "User St",
                number: 2856,
                apartment: "2B",
                city: "Ciudad User"
            },
            password: "!User123456"
        };

        const userResponse = await request.post("/api/auth/register").send(user);
        //verificamos que el registro fue exitoso
        expect(userResponse.statusCode).to.be.equal(201);

        // Guarda el ID del usuario
        userTestId = userResponse.body.payload._id; 


        // crear una mascota para la adopcion
        const pet = {
            name: "Spike",
            type: "cat",
            birthDate: "2025-05-02",
            sex: "male",
            sterilized: true
        }

        const petResponse = await request.post("/api/pets/register").set("Cookie", adminCookie).send(pet);
        //verificamos que el registro fue exitoso
        expect(petResponse.statusCode).to.be.equal(201);

        // Guarda el ID de la mascota
        petTestId = petResponse.body.payload._id;

    });


    it("[POST] /api/adoptions - Should create a new adoption", async () => {

        // Creamos una adopcion
        const adoptionData = {
            petId: petTestId,
            ownerId: userTestId
        };

        const { statusCode, body } = await request.post("/api/adoptions").set("Cookie", adminCookie).send(adoptionData);

        // Aserciones para verificar que la adopcion fue exitosa
        expect(statusCode).to.be.equal(201);
        expect(body).to.have.property("status", "Success");
        expect(body).to.have.property("payload").that.is.an("object");

        // Guarda el ID de la adopción para eliminarla después
        adoptionId = body.payload._id;

        //Verificamos tanto el owener(user) y el pet tengan el campo con el id correspondiente a pet o owner
        const ownerResponse = await request.get(`/api/users/${userTestId}`).set("Cookie", adminCookie);
        expect(ownerResponse.statusCode).to.be.equal(200);
        expect(ownerResponse.body.payload).to.have.property("pets").that.is.an("array");
        // Verificamos que el array de mascotas tenga el id de la mascota adoptada
        const petInOwner = ownerResponse.body.payload.pets.find(pet => pet._id === petTestId);
        expect(petInOwner).to.be.an("object");
        expect(petInOwner).to.have.property("_id").that.equals(petTestId);

        const petResponse = await request.get(`/api/pets/${petTestId}`);
        expect(petResponse.statusCode).to.be.equal(200);
        expect(petResponse.body.payload).to.have.property("owner");

    });


    it("[GET] /api/adoptions - Should get all adoptions", async () => {

        // Obtenemos todas las adopciones
        const { statusCode, body } = await request.get("/api/adoptions").set("Cookie", adminCookie);

        // Aserciones para verificar las adopciones
        expect(statusCode).to.be.equal(200);
        expect(body).to.have.property("status", "Success");
        expect(body).to.have.property("payload").that.is.an("array");

        body.payload.forEach(adoption => {
            expect(adoption).to.be.an("object");
            expect(adoption).to.have.property("pet");
            expect(adoption).to.have.property("owner");
        });

    });


    it("[GET] /api/adoptions/:id - Should get an adoption by ID", async () => {

        // Obtenemos la adopcion por id
        const { statusCode, body } = await request.get(`/api/adoptions/${adoptionId}`).set("Cookie", adminCookie);

        // Aserciones para verificar la adopcion
        expect(statusCode).to.be.equal(200);
        expect(body).to.have.property("status", "Success");
        expect(body).to.have.property("payload").that.is.an("object");
        expect(body.payload).to.have.property("_id").that.equals(adoptionId);
        expect(body.payload).to.have.property("pet").that.is.an("object");
        expect(body.payload).to.have.property("owner").that.is.an("object");

    });


    it("[DELETE] /api/adoptions/:id - Should delete an adoption by Id", async () => {

        // Obtenemos la adopcion por id
        const { statusCode, body } = await request.delete(`/api/adoptions/${adoptionId}`).set("Cookie", adminCookie);

        // Aserciones para verificar la adopcion fue eliminada
        expect(statusCode).to.be.equal(200);
        expect(body).to.have.property("status", "Success");
        expect(body).to.have.property("message", "Adoption remove successfully");

        // Verifica que el pet ya no tenga owner
        const petResponse = await request.get(`/api/pets/${petTestId}`).set("Cookie", adminCookie);
        expect(petResponse.statusCode).to.equal(200);
        expect(petResponse.body.payload).to.not.have.property("owner");

        // Verifica que el user ya no tenga el pet en el array de pets
        const ownerResponse = await request.get(`/api/users/${userTestId}`).set("Cookie", adminCookie);
        expect(ownerResponse.statusCode).to.equal(200);
        expect(ownerResponse.body.payload.pets).to.not.include(petTestId);

    });


    // After para limpiar los datos creados después de la prueba
    after(async () => {
        
        // Eliminar mascota
        const deletePetResponse = await request.delete(`/api/pets/${petTestId}`).set("Cookie", adminCookie);
        expect(deletePetResponse.statusCode).to.be.equal(200);

        // Eliminar usuario
        const deleteUserResponse = await request.delete(`/api/users/${userTestId}`).set("Cookie", adminCookie);
        expect(deleteUserResponse.statusCode).to.be.equal(200);

        // Eliminar admin 
        const deleteAdminResponse = await request.delete(`/api/users/${adminTestId}`).set("Cookie", adminCookie);
        expect(deleteAdminResponse.statusCode).to.be.equal(200);
    });


});
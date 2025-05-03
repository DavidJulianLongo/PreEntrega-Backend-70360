import { expect } from "chai";
import supertest from "supertest";


const request = supertest("http://localhost:3000");

describe("===== INTEGRATION TEST FOR PETS ROUTES =====", () => {

    let adminCookie;
    let createdPetId;
    let adminTestId;

    // Primero creamos admin para obtener la cookie de admin, ya que el endpoint de pets es privado
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

        // Guarda el ID del admin para elimarlo en el after 
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

    });



    it("[POST] /api/pets/register - Should register a new pet", async () => {

        const newPet = {
            name: "Mike",
            type: "dog",
            birthDate: "2025-05-02",
            sex: "male",
            sterilized: true
        }

        const { statusCode, body } = await request.post("/api/pets/register").set("Cookie", adminCookie).send(newPet);

        createdPetId = body.payload._id; // Guardar el ID de la mascota creada 

        // Aserciones para verificar que el registro fue exitoso
        expect(statusCode).to.be.equal(201);
        expect(body.payload.name).to.be.equal("Mike");
        expect(body.payload.type).to.be.equal("dog");
        //slice(0, 10) porque la fecha viene con hora y minutos y asi toma los primeros 10 caracteres
        expect(body.payload.birthDate.slice(0, 10)).to.be.equal("2025-05-02");
        expect(body.payload.sex).to.be.equal("male");
        expect(body.payload.sterilized).to.be.equal(true);

    })



    it("[PUT] /api/pets/:id - Should update a pet", async () => {

        const updatedPet = {
            name: "Peter",
            type: "cat",
            birthDate: "2025-05-02",
            sex: "male",
            sterilized: false
        }

        const { statusCode, body } = await request.put(`/api/pets/${createdPetId}`).set("Cookie", adminCookie).send(updatedPet);

        // Aserciones para verificar que el update fue exitoso
        expect(statusCode).to.be.equal(200);
        expect(body.payload.name).to.be.equal("Peter");
        expect(body.payload.type).to.be.equal("cat");
        //slice(0, 10) porque la fecha viene con hora y minutos y asi toma los primeros 10 caracteres
        expect(body.payload.birthDate.slice(0, 10)).to.be.equal("2025-05-02");
        expect(body.payload.sex).to.be.equal("male");
        expect(body.payload.sterilized).to.be.equal(false);

    })


    it("[GET] /api/pets - Should get return all pets", async () => {

        const { statusCode, body } = await request.get("/api/pets");

        // Aserciones para verificar que la respuesta es correcta
        expect(statusCode).to.be.equal(200);
        expect(body).to.have.property("payload").that.is.an("array");
        expect(body.payload.length).to.be.greaterThan(0); // Verifica que haya al menos una mascota en la respuesta

    });



    it("[GET] /api/pets/:id - Should get return a pet details", async () => {

        const { statusCode, body } = await request.get(`/api/pets/${createdPetId}`);

        // Aserciones para verificar que la respuesta es correcta
        expect(statusCode).to.be.equal(200);
        expect(body).to.have.property("payload").that.is.an("object");
        expect(body.payload).to.have.property("name").that.is.a("string");
        expect(body.payload).to.have.property("_id").that.equals(createdPetId);
        expect(body.payload).to.have.property("type").that.is.a("string");
        expect(body.payload).to.have.property("birthDate").that.is.a("string");
        expect(body.payload).to.have.property("sex").that.is.a("string");
        expect(body.payload).to.have.property("sterilized").that.is.a("boolean");
    });



    it("[DELETE] /api/pets/:id - Should delete a pet", async () => {

        const { statusCode, body } = await request.delete(`/api/pets/${createdPetId}`).set("Cookie", adminCookie);

        // Aserciones para verificar que la respuesta es correcta
        expect(statusCode).to.be.equal(200);
        expect(body).to.have.property("payload").that.is.an("object");
        expect(body).to.have.property("message").that.is.a("string");

        // Verificamos que la mascota ya no esté en la base de datos haciendo un GET
        const getResponse = await request.get(`/api/pets/${createdPetId}`);
        expect(getResponse.statusCode).to.be.equal(404);
    });


    after(async () => {

        // Eliminar admin crado para el test
        const deleteAdminResponse = await request.delete(`/api/users/${adminTestId}`).set("Cookie", adminCookie);
        expect(deleteAdminResponse.statusCode).to.be.equal(200);

    });

});
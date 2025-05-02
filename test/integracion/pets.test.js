import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:3000");

describe("===== INTEGRATION TEST FOR PETS ROUTES =====", () => {

    let adminCookie;
    let createdPetId; // 

    before(async () => {
        // Login para obtener la auth de "admin" ya que las rutas de pets requieren ser "admin"
        const loginAdmin = {
            email: "bert.emard@gmail.com",
            password: "!User123456",
        }

        const response = await request.post("/api/auth/login").send(loginAdmin);
        expect(response.statusCode).to.be.equal(200);
        expect(response.body.message).to.be.equal("Login successful");
        expect(response.body.token).to.exist;

        adminCookie = response.headers["set-cookie"]?.[0]; // Guardamos la cookie
    });

    it("[POST] /api/pets/register - Should register a new pet", async () => {

        const newPet = {
            name: "Mike",
            type: "dog",
            birthDate: "2025-05-02",
            sex: "male",
            sterilized: true
        }

        const response = await request.post("/api/pets/register").set("Cookie", adminCookie).send(newPet);
        // console.log(response.statusCode);
        // console.log(response.body);
        // // console.log(response.error);
        createdPetId = response.body.payload._id; // Guardar el ID de la mascota creada para eliminarla después

        // Aserciones para verificar que el registro fue exitoso
        expect(response.statusCode).to.be.equal(201);
        expect(response.body.payload.name).to.be.equal("Mike");
        expect(response.body.payload.type).to.be.equal("dog");
        //slice(0, 10) porque la fecha viene con hora y minutos y asi toma los primeros 10 caracteres
        expect(response.body.payload.birthDate.slice(0, 10)).to.be.equal("2025-05-02");
        expect(response.body.payload.sex).to.be.equal("male");
        expect(response.body.payload.sterilized).to.be.equal(true);


        after(async () => {
           const res = await request.delete(`/api/pets/${createdPetId}`).set("Cookie", adminCookie);
            console.log(res.body);
        });

    })



    // it("[POST] /api/auth/login - Should login a user", async () => {

    //     const userData = {
    //         email: "alefector@gmail.com",
    //         password: "!User123456",
    //     }

    //     const response = await request.post("/api/auth/login").send(userData);

    //     // Aserciones para verificar que el login fue exitoso
    //     expect(response.statusCode).to.be.equal(200);
    //     expect(response.body.message).to.be.equal("Login successful");
    //     expect(response.body.token).to.exist; 

    //     // Guarda la cookie de autenticación (usada para endpoints protegidos
    //     authCookie = response.headers["set-cookie"]?.[0];
    // });


    // //se ejecuta después de todos los tests: elimina al usuario creado
    // after(async () => {
    //     try {
    //         const res = await request
    //         .delete(`/api/users/${userTest._id}`)
    //         .set("Cookie", authCookie); // Usar la cookie de autenticación para eliminar el usuario
    //         console.log(res.body);
    //     } catch (error) {
    //         console.log(error);
    //     }

    // });

});
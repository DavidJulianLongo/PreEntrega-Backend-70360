import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:3000");

describe("===== INTEGRATION TEST FOR AUTH ROUTES =====", () => {

    let userTestId;
    let authCookie;

    it("[POST] /api/auth/register - Should register a new user", async () => {

        const newUser = {
            first_name: "German",
            last_name: "García",
            email: "ggarcia@gmail.com",
            phone: "+54123456789",
            address: {
                street: "Calle Falsa",
                number: 3156,
                apartment: "2do A",
                city: "San Martín"
            },
            password: "!User123456",
        }

        const { statusCode, body } = await request.post("/api/auth/register").send(newUser);

        userTestId = body.payload; // Guardar el usuario creado para eliminarlo después

        // Aserciones para verificar que el registro fue exitoso
        expect(statusCode).to.be.equal(201);
        expect(body.payload.first_name).to.be.equal("German");
        expect(body.payload.last_name).to.be.equal("García");
        expect(body.payload.email).to.be.equal("ggarcia@gmail.com");
        expect(body.payload.phone).to.be.equal("+54123456789");
        expect(body.payload.address.street).to.be.equal("Calle Falsa");
        expect(body.payload.address.number).to.be.equal(3156);
        expect(body.payload.address.apartment).to.be.equal("2do A");
        expect(body.payload.address.city).to.be.equal("San Martín");
        expect(body.payload.password).to.not.be.equal("!User123456"); // porque la pass viene encriptada
    })



    it("[POST] /api/auth/login - Should login a user", async () => {

        const userData = {
            email: "ggarcia@gmail.com",
            password: "!User123456",
        }

        const response = await request.post("/api/auth/login").send(userData);

        // Aserciones para verificar que el login fue exitoso
        expect(response.statusCode).to.be.equal(200);
        expect(response.body.message).to.be.equal("Login successful");
        expect(response.body.token).to.exist; 
        
        // Guarda la cookie de autenticación (usada para endpoints protegidos
        authCookie = response.headers["set-cookie"]?.[0];
    });


    //se ejecuta después de todos los tests: elimina al usuario creado
    after(async () => {
        try {
            await request.delete(`/api/users/${userTestId._id}`).set("Cookie", authCookie); // Usar la cookie de autenticación para eliminar el usuario
        } catch (error) {
            console.log(error);
        }

    });

});
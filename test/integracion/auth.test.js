import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:3000");

describe("Auth routes integration test", () => {

    let userTest;
    let authCookie;

    it("[POST] /api/auth/register - Should register a new user", async () => {

        const newUser = {
            first_name: "German",
            last_name: "Fasafector",
            email: "alefector@gmail.com",
            phone: "+54123456789",
            address: {
                street: "Calle Falsa",
                number: 3156,
                apartment: "2do A",
                city: "San Martín"
            },
            password: "!User123456",
        }

        const { statusCode, body, error } = await request.post("/api/auth/register").send(newUser);

        userTest = body.payload; // Guardar el usuario creado para eliminarlo después

        expect(statusCode).to.be.equal(201);
        expect(body.payload.first_name).to.be.equal("German");
        expect(body.payload.last_name).to.be.equal("Fasafector");
        expect(body.payload.email).to.be.equal("alefector@gmail.com");
        expect(body.payload.phone).to.be.equal("+54123456789");
        expect(body.payload.address.street).to.be.equal("Calle Falsa");
        expect(body.payload.address.number).to.be.equal(3156);
        expect(body.payload.address.apartment).to.be.equal("2do A");
        expect(body.payload.address.city).to.be.equal("San Martín");
        expect(body.payload.password).to.not.be.equal("!User123456"); // porque la pass viene encriptada
    })



    it("[POST] /api/auth/login - Should login a user", async () => {

        const userData = {
            email: "alefector@gmail.com",
            password: "!User123456",
        }

        const response = await request.post("/api/auth/login").send(userData);
        expect(response.statusCode).to.be.equal(200);
        expect(response.body.message).to.be.equal("Login successful");
        expect(response.body.token).to.exist; 
        
        //guardamos la cookie con el JWT
        authCookie = response.headers["set-cookie"]?.[0];
    });

    after(async () => {
        try {
            const res = await request
            .delete(`/api/users/${userTest._id}`)
            .set("Cookie", authCookie); // Usar la cookie de autenticación para eliminar el usuario
            console.log(res.body);
        } catch (error) {
            console.log(error);
        }

    });

});
import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:3000");

describe("===== INTEGRATION TEST FOR USERS ROUTES =====", () => {

    let userTest;
    let adminTest;
    let adminCookie;
    let userCookie;

    // Primero creamos un admin y un user para poder probar los endpoints de users, ya que son privados
    before(async () => {

        const newAdmin = {
            first_name: "Pablo",
            last_name: "Pérez",
            email: "pperez@gmail.com",
            phone: "+54123456789",
            address: {
                street: "Calle Falsa",
                number: 3156,
                apartment: "2do A",
                city: "San Martín"
            },
            password: "!User123456",
            role: "admin"
        }

        const newUser = {
            first_name: "Pedro",
            last_name: "García",
            email: "pgarcia@gmail.com",
            phone: "+54123456789",
            address: {
                street: "Calle Falsa",
                number: 3156,
                apartment: "2do A",
                city: "San Martín"
            },
            password: "!User123456",
        }

        const admin = await request.post("/api/auth/register").send(newAdmin);
        //verificamos que el registro fue exitoso
        expect(admin.statusCode).to.be.equal(201);
        
        const user = await request.post("/api/auth/register").send(newUser);
        //verificamos que el registro fue exitoso
        expect(user.statusCode).to.be.equal(201);

        userTest = user.body.payload; // Guardar el usuario 
        adminTest = admin.body.payload; // Guardar el usuario 

        // Login como admin
        const loginAdmin = {
            email: "pperez@gmail.com",
            password: "!User123456"
        }

        const resAdmin = await request.post("/api/auth/login").send(loginAdmin);
        //verificamos que el login fue exitoso
        expect(resAdmin.statusCode).to.be.equal(200);
        // Guarda la cookie de autenticación (usada para endpoints protegidos)
        adminCookie = resAdmin.headers["set-cookie"]?.[0];


        // Login como user
        const loginUser = {
            email: "pgarcia@gmail.com",
            password: "!User123456",
        };

        const resUser = await request.post("/api/auth/login").send(loginUser);
        //verificamos que el login fue exitoso
        expect(resUser.statusCode).to.be.equal(200);
        // Guarda la cookie de autenticación (usada para endpoints protegidos)
        userCookie = resUser.headers["set-cookie"]?.[0];
    });



    it("[GET] /api/users - Should get return all users", async () => {

        const { statusCode, body } = await request.get("/api/users/").set("Cookie", adminCookie);

        // Aserciones para verificar que el registro fue exitoso
        expect(statusCode).to.be.equal(200);
        expect(body.payload).to.be.an("array");
        expect(body.payload.length).to.be.greaterThan(0); // Verifica que haya al menos un usuario
    });


    it("[GET] /api/users/:id -  Should get return a user details", async () => {

        const { statusCode, body } = await request.get(`/api/users/${userTest._id}`).set("Cookie", adminCookie);

        // Aserciones para verificar que el GET fue exitoso
        expect(statusCode).to.be.equal(200);
        expect(body.payload).to.be.an("object");
        expect(body.payload._id).to.be.equal(userTest._id); // Verifica que el id del usuario sea el mismo que el del usuario creado
    });


    it("[PUT] /api/users/update - Should update a user", async () => {

        const udateUser = {
            first_name: "Pedro",
            last_name: "García",
            email: "pgarcia@gmail.com",
            phone: "+54123456789",
            address: {
                street: "Otra Calle",
                number: 1556,
                apartment: "14th A",
                city: "Belgrano"
            },
        }

        const { statusCode, body } = await request.put("/api/users/update").set("Cookie", userCookie).send(udateUser);

        // Aserciones para verificar que el update fue exitoso
        expect(statusCode).to.be.equal(200);
        expect(body).to.have.property("status", "success");
        expect(body).to.have.property("payload").that.is.an("object");
        expect(body.payload).to.be.an("object");
        expect(body.payload.first_name).to.be.equal("Pedro");
        expect(body.payload.last_name).to.be.equal("García");
        expect(body.payload.email).to.be.equal("pgarcia@gmail.com");
        expect(body.payload.phone).to.be.equal("+54123456789");
        expect(body.payload.address.street).to.be.equal("Otra Calle");
        expect(body.payload.address.number).to.be.equal(1556);
        expect(body.payload.address.apartment).to.be.equal("14th A");
        expect(body.payload.address.city).to.be.equal("Belgrano");

    });


    it("[PUT] /api/users/restore-pass - Should restore a user password", async () => {

        const restorePass = {
            current_password: "!User123456",
            new_password: "!NewUser123456"
        }

        const { statusCode, body } = await request.put("/api/users/restore-pass").set("Cookie", userCookie).send(restorePass);

        // Aserciones para verificar que el update fue exitoso
        expect(statusCode).to.be.equal(200);
        expect(body).to.have.property("status", "success");
        expect(body).to.have.property("message", "Password updated successfully");
        expect(body).to.have.property("payload").that.is.an("object");
        expect(body.payload).to.be.an("object");
        expect(body.payload._id).to.be.equal(userTest._id); // Verifica que el id del usuario sea el mismo que el del usuario creado
    
        // Verificamos que la contraseña haya sido actualizada haciendo login con la nueva contraseña
        const loginNewPass = {
            email: "pgarcia@gmail.com",
            password: "!NewUser123456"
        }   

        const { statusCode: loginStatusCode, body: loginBody } = await request.post("/api/auth/login").send(loginNewPass);
        // Aserciones para verificar que el login fue exitoso
        expect(loginStatusCode).to.be.equal(200);
        expect(loginBody).to.have.property("message", "Login successful");
        expect(loginBody).to.have.property("token");
    });


    //tanto el admin como el user pueden eliminar su propio usuario
    it("[DELETE] /api/users/:id - Should delete a user", async () => {

        // Eliminamos el usuario 
        const { statusCode: userStatusCode, body: userBody } = await request.delete(`/api/users/${userTest._id}`).set("Cookie", userCookie);

        // Aserciones para verificar que el delete fue exitoso
        expect(userStatusCode).to.be.equal(200);
        expect(userBody.payload).to.be.an("object");
        expect(userBody.payload._id).to.be.equal(userTest._id);

        // Eliminar al admin
        const { statusCode: adminStatusCode, body: adminBody } = await request.delete(`/api/users/${adminTest._id}`).set("Cookie", adminCookie);
        // Aserciones para verificar que el delete fue exitoso
        expect(adminStatusCode).to.be.equal(200);
        expect(adminBody.payload).to.be.an("object");
        expect(adminBody.payload._id).to.be.equal(adminTest._id);

        // Verificamos que el user ya no esté en la base de datos haciendo un GET
        const responseAfterDeleteUser = await request.get(`/api/users/${userTest._id}`).set("Cookie", adminCookie);
        expect(responseAfterDeleteUser.statusCode).to.be.equal(404);

        // Verificamos que el admin ya no esté en la base de datos haciendo un GET
        const responseAfterDeleteAdmin = await request.get(`/api/users/${adminTest._id}`).set("Cookie", adminCookie);
        expect(responseAfterDeleteAdmin.statusCode).to.be.equal(404);

    })

});
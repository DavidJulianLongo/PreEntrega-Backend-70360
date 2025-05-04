import { logger } from "../../src/common/utils/logger.js";
import { userDao } from "../../src/modules/users/user.dao.js";
import mongoose from "mongoose";
import { expect } from "chai";
import dotenv from "dotenv";

dotenv.config();


// Conexión a la base de datos antes de los tests


describe("===== TEST USERDAO =====", () => {
  let userTest;

  it("Should create a user", async () => {
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

    const user = await userDao.create(newUser);
    userTest = user;

    expect(user).to.be.an("object");
    expect(user).to.have.property("first_name");
    expect(user).to.have.property("last_name");
    expect(user).to.have.property("email");
    expect(user).to.have.property("password");
    expect(user.first_name).to.equal("German");
    expect(user).to.not.have.property("age");
  });


  it("Should return an array of users", async () => {
    const users = await userDao.getAll();
    expect(users).to.be.an("array");
  });


  it("Should get a user by ID", async () => {
    const user = await userDao.getOne({ _id: userTest.id });
    expect(user).to.be.an("object");
    expect(user).to.have.property("first_name");
    expect(user).to.have.property("pets");
    expect(user.pets).to.be.an("array");
    
  });

  it("Should update a user", async () => {
    const userUpdateData = {
      first_name: "Pepe",
      last_name: "Sapo",
    };

    const userUpdate = await userDao.update(userTest._id, userUpdateData);
    expect(userUpdate.first_name).to.equal("Pepe");
    expect(userUpdate.last_name).to.equal("Sapo");
  });

  it("Should delete a user", async () => {
    await userDao.remove(userTest._id);
    const user = await userDao.getOne({ _id: userTest._id });
    expect(user).to.be.null;
  });

  after(async () => {
    // Cerrar la conexión a la base de datos después de los tests
    await mongoose.connection.close();
    logger.info("Disconnected from MongoDB");
    console.log("  ===== UNIT TESTING FINISHED =====");
  });
});
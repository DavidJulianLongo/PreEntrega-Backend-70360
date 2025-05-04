import { logger } from "../../src/common/utils/logger.js";
import { petDao } from "../../src/modules/pets/pet.dao.js";
import mongoose from "mongoose";
import { expect } from "chai";
import dotenv from "dotenv";

dotenv.config();

describe("===== UNIT TESTING START =====", () => {
    let petTest;

    // Conexión a la base de datos antes de los tests
    before(async () => {
        await mongoose.connect(process.env.MONGO_URL);
        logger.info("Connected to MongoDB for unitaries tests");
        console.log("  ===== TEST PETDAO =====");
    });


    it("Should create a pet", async () => {
        const newPet = {
            name: "Mike",
            type: "dog",
            birthDate: "2025-05-02",
            sex: "male",
            sterilized: true
        }

        const pet = await petDao.create(newPet);
        petTest = pet;

        expect(pet).to.be.an("object");
        expect(pet).to.have.property("_id");
        expect(pet).to.have.property("name");
        expect(pet).to.have.property("type");
        expect(pet).to.have.property("birthDate");
        expect(pet).to.have.property("sex");
        expect(pet).to.have.property("sterilized");

    });


    it("Should return an array of pet", async () => {
        const pet = await petDao.getAll();
        expect(pet).to.be.an("array");
    });


    it("Should get a pet by ID", async () => {
        const pet = await petDao.getOne({ _id: petTest._id });
        expect(pet).to.be.an("object");
        expect(pet).to.have.property("name");
        expect(pet).to.have.property("type");
        expect(pet).to.have.property("birthDate");
        expect(pet).to.have.property("sex");
        expect(pet).to.have.property("sterilized");
        expect(pet).to.have.property("owner");
    });

    it("Should update a pet", async () => {
        const petUpdateData = {
            name: "Mikey",
            type: "cat",
            birthDate: "2022-05-02",
            sex: "male",
            sterilized: false
        }

        const petUpdate = await petDao.update(petTest._id, petUpdateData);
        expect(petUpdate.name).to.equal("Mikey");
        expect(petUpdate.type).to.equal("cat");
        expect(petUpdate.birthDate.toISOString().slice(0, 10)).to.equal("2022-05-02");
        expect(petUpdate.sex).to.equal("male");
        expect(petUpdate.sterilized).to.equal(false);
    });

    it("Should delete a pet", async () => {
        await petDao.remove(petTest._id);
        const pet = await petDao.getOne({ _id: petTest._id });
        expect(pet).to.be.null;
    });

});
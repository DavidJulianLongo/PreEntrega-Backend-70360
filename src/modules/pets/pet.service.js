import { petDao } from "./pet.dao.js";
import { petMock } from "../../mocks/pet.mock.js";
import { AppError } from "../../common/errors/appError.js";
import PetDTO from "./pet.dto.js";

import OwnerDTO from "../adoptions/adoptions.dto.js";


class PetService {

    async create(data) {
        const newPet = new PetDTO({ ...data });

        // Verifica si ya existe una mascota con los mismos detalles
        const existingPet = await petDao.getOne({
            name: newPet.name,
            type: newPet.type,
            birthDate: newPet.birthDate,
            sex: newPet.sex,
            sterilized: newPet.sterilized
        });

        if (existingPet) throw new AppError('Pet already exists', 409);

        return await petDao.create(newPet);
    }


    async createPetMock(amount) {
        const pets = petMock(amount);
        await petDao.removeAll();

        for (const pet of pets) {
            const newPet = new PetDTO(pet);
            await petDao.create(newPet);
        }

        return await petDao.create(pets);
    }

    async getAll() {
        const pets = await petDao.getAll();
        if (!pets) throw new AppError("Pets not found", 404);
        return pets;
    }

    async getOne(id) {
        const pet = await petDao.getOne({ _id: id });
        if (!pet) throw new AppError("Pet not found", 404);

        if (pet.owner) pet.owner = new OwnerDTO(pet.owner);
        return pet
    }

    async update(id, updateData) {
        if (Object.keys(updateData).length === 0) throw new AppError('No data to update', 400);

        const pet = await petDao.getOne({ _id: id });
        if (!pet) throw new AppError("Pet not found", 404);

        for (const key of Object.keys(updateData)) {
            if (typeof updateData[key] === "object" && pet[key] !== undefined) {
                pet[key] = { ...pet[key], ...updateData[key] };
            } else {
                pet[key] = updateData[key];
            }
        }

        const updatedPet = await petDao.update(pet._id, pet);
        return new PetDTO(updatedPet);
    }

    async remove(id) {
        const pet = await petDao.getOne({ _id: id });
        if (!pet) throw new AppError("Pet not found", 404);

        return await petDao.remove(id);
    }

}

export const petService = new PetService();



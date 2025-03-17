import { petDao } from "./petDao.js";
import { petMock } from "../../mocks/pet.mock.js";


class PetService {

    async create(data) {
        return await petDao.create(data);
    }

    async createPetMock(amount) {
        const pets = petMock(amount);
        await petDao.removeAll();

        for (const pet of pets) {
            if(pet.birthDate) pet.birthDate = pet.birthDate.toLocaleDateString("es-ES");
            await petDao.create(pet);
        }
        return await petDao.getAll();
    }

}

export const petService = new PetService();
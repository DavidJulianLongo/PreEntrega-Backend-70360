import { petDao } from "./pet.dao.js";
import { petMock } from "../../mocks/pet.mock.js";
import { AppError } from "../../common/errors/appError.js";
import PetDTO from "./pet.dto.js";
import dayjs from "dayjs";


class PetService {

    async create(data) {
        const formattedBirthDate = dayjs(data.birthDate).startOf('day').toDate();
        const newPet = new PetDTO({ ...data, birthDate: formattedBirthDate });

        // Verifica si ya existe una mascota con los mismos detalles
        const existingPet = await petDao.getOne({ name: newPet.name, type: newPet.type, birthDate: newPet.birthDate })
        if (existingPet) throw new AppError('Pet already exists', 409);

        return await petDao.create(newPet);
    }

    async createPetMock(amount) {
        const pets = petMock(amount);
        await petDao.removeAll();

        // Formatea la fecha de nacimiento para evitar diferencias en la hora
        const petsDTO = pets.map(pet => {
            const formattedBirthDate = dayjs(pet.birthDate).startOf('day').format('YYYY-MM-DD');
            return new PetDTO({ ...pet, birthDate: formattedBirthDate });
        });

        return await petDao.create(petsDTO);
    }

    async getAll() {
        const pets = await petDao.getAll();
        if (!pets) throw new AppError("Pets nor found", 404);
        return pets;
    }

}

export const petService = new PetService();



import { petDao } from "./petDao.js";
import { petMock } from "../../mocks/pet.mock.js";
import { AppError } from "../../common/errors/appError.js";
import PetDTO from "./pet.dto.js";
import dayjs from "dayjs";


class PetService {

    async create(data) {
        const formattedBirthDate = dayjs(data.birthDate).startOf('day').toDate(); 
        const newPet = new PetDTO({ ...data, birthDate: formattedBirthDate });

        // Verifica si ya existe una mascota con los mismos detalles
        const exixtingPet = await petDao.getOne({ name: newPet.name, type: newPet.type, birthDate: newPet.birthDate })
        if (exixtingPet) throw new AppError('Pet already exists', 409);

        return await petDao.create(newPet);
    }

    async createPetMock(amount) {
        const pets = petMock(amount);
        await petDao.removeAll();

        const petsDTO = pets.map(pet => {
            const formattedBirthDate = dayjs(pet.birthDate).startOf('day').format('YYYY-MM-DD');
            return new PetDTO({
                ...pet,
                birthDate: formattedBirthDate
            });
        });

        return await petDao.create(petsDTO);
    }

    async getAll() {
        return await petDao.getAll();
    }

}

export const petService = new PetService();



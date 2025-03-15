import { petDao } from "./petDao.js";


class PetService{

    async create(data) {
        return await petDao.create(data);
    }

}

export const petService = new PetService();
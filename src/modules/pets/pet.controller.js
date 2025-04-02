import { petService } from "./pet.service.js";


class PetController {

    async create(req, res, next) {
        try {
            const pet = req.body;
            const newPet = await petService.create(pet);
            res.status(201).json({ status: "success", payload: newPet });
        } catch (error) {
            next(error);
        }
    }

    async createPetMock(req, res, next) {
        try {
            const { amount } = req.params;
            const pets = await petService.createPetMock(amount);
            res.status(200).json({ status: "success", payload: pets });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const pets = await petService.getAll();
            res.status(200).json({ status: "success", payload: pets });
        } catch (error) {
            next(error);
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const pet = await petService.getOne(id);
            res.status(200).json({ status: "success", payload: pet });
        } catch (error) {
            next(error);
        }
    }

}


export const petController = new PetController();
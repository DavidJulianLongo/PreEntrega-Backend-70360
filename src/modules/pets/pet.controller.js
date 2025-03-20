import { petService } from "./pet.service.js";


class PetController {

    async createPet(req, res) {
        try {
            const pet = req.body;
            const newPet = await petService.create(pet);
            res.status(201).json({ status: "success", payload: newPet });
        } catch (error) {
            next(error);
        }
    }

    async createPetMock(req, res) {
        try {
            const { amount } = req.params;
            const pets = await petService.createPetMock(amount);
            res.status(200).json({ status: "success", payload: pets });
        } catch (error) {
           next(error);
        }
    }

}


export const petController = new PetController();
import { petService } from "./pet.service.js";


class PetController {

    async createPet(req, res) {
        try {

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async createPetMock(req, res) {
        try {
            const { amount } = req.params;
            const pets = await petService.createPetMock(amount);
            res.status(200).json({ status: "success", payload: pets });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

}


export const petController = new PetController();
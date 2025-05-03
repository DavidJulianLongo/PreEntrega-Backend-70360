import { adoptionService } from "./adoption.service.js";


class AdoptionController {

    async getAll(req, res, next) {
        try {
            const adoptions = await adoptionService.getAll();
            res.status(200).json({ status: "Success", payload: adoptions });
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const adoption = await adoptionService.getById({ _id: id });
            res.status(200).json({ status: "Success", payload: adoption });
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const { petId, ownerId } = req.body;
            const newAdoption = await adoptionService.create(petId, ownerId);
            res.status(201).json({ status: "Success", payload: newAdoption });
        } catch (error) {
            next(error)
        }
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params;
            const adoption = await adoptionService.remove(id);
            res.status(200).json({ status: "Success", message: "Adoption remove successfully" });
        } catch (error) {
            next(error);
        }
    }
}

export const adoptionController = new AdoptionController();

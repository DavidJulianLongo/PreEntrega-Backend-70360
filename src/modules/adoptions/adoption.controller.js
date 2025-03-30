import { adoptionService } from "./adoption.service.js";


class AdoptionController {

    async getAll(req, res, next) {
        try {
            const adoptions = await adoptionService.getAll();
            res.status(200).json({ status: "Succes", payload: adoptions });
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const adoption = await adoptionService.getById({ _id: id });
            res.status(200).json({ status: "Succes", payload: adoption });
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const { pet, owner } = req.body;
            const newAdoption = await adoptionService.create(pet, owner);
            res.status(201).json({ status: "Succes", payload: newAdoption });
        } catch (error) {
            next(error)
        }
    }

}

export const adoptionController = new AdoptionController();

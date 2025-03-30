import { AppError } from "../../common/errors/appError.js";
import { adoptionDao } from "./adoption.dao.js";
import { petDao } from "../pets/pet.dao.js";
import { userDao } from "../users/user.dao.js";
import  OwnerDTO  from "./adoptions.dto.js";


class AdoptionService {

    async getAll() {
        const adoptions = await adoptionDao.getAll();
        if (adoptions.length === 0) throw new AppError("No adoptions found", 404);

        // Aplicamos el DTO a cada owner dentro del array de adopciones
        adoptions.forEach(adoption => { adoption.owner = new OwnerDTO(adoption.owner.toObject()) });

        return adoptions;
    }

    async getById(query) {
        const adoption = await adoptionDao.getOne(query);
        if (!adoption) throw new AppError("Adoption not found", 404);

        // Usamos map para crear un nuevo arreglo de instancias de UserDTO
        adoption.owner = new OwnerDTO(adoption.owner.toObject());
        return adoption;
    }

    async create(petId, ownerId) {
        const pet = await petDao.getOne({ _id: petId });
        console.log("Pet ID (String):", petId);

        if (!pet) throw new AppError("Pet not found", 404);
        if (pet.adopted) throw new AppError("Pet has already been adopted", 409);

        const owner = await userDao.getOne({ _id: ownerId });
        if (!owner) throw new AppError("Owner not found", 404);

        const newAdoption = await adoptionDao.create({ pet: petId, owner: ownerId });

        //Actualizar pet
        await petDao.update(pet._id, { adopted: true, owner: ownerId });

        //Actualizar user
        const updatePets = [...owner.pets, { _id: petId }]
        await userDao.update(ownerId, { pets: updatePets })

        return newAdoption;
    }

}

export const adoptionService = new AdoptionService();

import dayjs from "dayjs";

export default class PetDTO {

    constructor(pet) {
        this._id = pet._id;
        this.name = pet.name.trim();
        this.type = pet.type.trim().toLowerCase();
        this.birthDate = pet.birthDate ? dayjs(pet.birthDate).startOf("day").toDate() : null;
        this.sex = pet.sex,
        this.sterilized  = pet.sterilized 
    }
}


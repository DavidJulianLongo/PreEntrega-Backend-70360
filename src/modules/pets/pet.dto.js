export default class PetDTO {
    constructor(pet) {
        this._id = pet._id;
        this.name = pet.name.trim();
        this.type = pet.type.trim();
        this.birthDate = new Date(pet.birthDate);
        this.sex = pet.sex.trim().toLowerCase();
        this.sterilized = pet.sterilized;
    }
}

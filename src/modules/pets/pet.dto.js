import dayjs from "dayjs";

export default class PetDTO {

   constructor({ name, type, birthDate}) {
    this.name = name.trim();
    this.type = type.trim().toLowerCase();
    this.birthDate = dayjs(birthDate).startOf('day').toDate();
    }
}


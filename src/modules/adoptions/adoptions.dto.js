export default class OwnerDTO {
    constructor(owner) {
        this.id = owner._id;
        this.first_name = owner.first_name;
        this.last_name = owner.last_name;
        this.email = owner.email;
        this.phone = owner.phone;
        this.address = owner.address;
        this.role = owner.role;
        this.pets = owner.pets;
        //Omitimos la pass del owner(usuario)
    }
}
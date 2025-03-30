export default class UserDTO {

    constructor(user) {
        
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = (user.email).toLowerCase().trim();
        this.phone = (user.phone).trim();
        this.address =  {
            street: user.address.street?.trim(),
            number: user.address.number,
            apartment: user.address.apartment?.trim(),
            city: user.address.city?.trim(),
        }
        this.role = user.role;
        this.pets = user.pets;
    }
}

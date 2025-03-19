import { capitalizeWords } from '../../common/utils/capitalizeWords.js';

export default class UserDTO {
    constructor(user) {
        // Capitaliza los nombres y direcciones
        this.first_name = capitalizeWords(user.first_name),
        this.last_name = capitalizeWords(user.last_name),
        this.address = {
            street: capitalizeWords(user.address.street),
            city: capitalizeWords(user.address.city),
            zipCode: user.address.zipCode
        };
        this.email = user.email,
        this.phone = user.phone,
        this.password = user.password
    }
}
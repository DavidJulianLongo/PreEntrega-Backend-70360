import { capitalizeWords } from '../../common/utils/capitalizeWords.js';

export default class UserDTO {
    constructor(user) {
        // Capitaliza los nombres y direcciones
        this.first_name = capitalizeWords(user.first_name).trim(),
        this.last_name = capitalizeWords(user.last_name).trim(),
        this.address = {
            street: capitalizeWords(user.address.street).trim(),
            city: capitalizeWords(user.address.city).trim(),
            zipCode: user.address.zipCode.trim()
        };
        this.email = user.email.toLowerCase().trim(),
        this.phone = user.phone.trim(),
        this.password = user.password.trim()
    }
}
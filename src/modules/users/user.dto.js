
export default class UserDTO {
    constructor(user = {}) {
        this.first_name = (user.first_name || '').trim();
        this.last_name = (user.last_name || '').trim();
        this.email = (user.email || '').toLowerCase().trim();
        this.phone = (user.phone || '').trim();
        this.password = user.password && user.password.trim() !== '' ? user.password.trim() : undefined;
        this.address = {
            street: (user.address?.street || '').trim(),
            number: user.address.number,
            apartment: (user.address?.apartment || '').trim(),
            city: (user.address?.city || '').trim(),
            zipCode: (user.address?.zipCode || '').trim()
        };
    }
}

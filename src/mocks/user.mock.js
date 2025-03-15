import { fakerES as faker } from '@faker-js/faker';
import { createHash } from "../common/utils/hashPassword.js";

export const userMock = (amount) => {

    const users = [];

    for (let i = 0; i < amount; i++) {
        users.push({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            phone: faker.phone.number( { style: 'international' } ),
            address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.zipCode()}`, 
            image: faker.image.avatar(),
            password: createHash('123456'),
        });
    }
    return users;
}    
import { fakerEN_US as faker } from '@faker-js/faker';
import { createHash } from "../common/utils/hashPassword.js";

export const userMock = (amount) => {

    const users = [];

    for (let i = 0; i < amount; i++) {
        users.push({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            address: {
                street: faker.location.streetAddress(),
                number: faker.location.buildingNumber(),
                city: faker.location.city(),
                zipCode: faker.location.zipCode()
            },
            password: createHash('123456'),
        });
    }
    return users;
}    
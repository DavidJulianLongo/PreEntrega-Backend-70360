import { fakerEN_US as faker } from '@faker-js/faker';
import { createHash } from "../common/utils/hashPassword.js";

export const userMock = (amount) => {

    const users = [];

    // genera un array con 10 "admin" y el resto del parametro amount serán "user"
    const roles = [
        ...Array(10).fill("admin"),
        ...Array(amount - 10).fill("user")
    ];

    // mezcla los roles para que no estén todos juntos
    const shuffledRoles = faker.helpers.shuffle(roles);

    for (let i = 0; i < amount; i++) {
        users.push({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            address: {
                street: faker.location.street(),
                number: faker.location.buildingNumber(),
                apartment: faker.location.secondaryAddress(),
                city: faker.location.city(),
            },
            password: createHash('!User123456'),
            role: shuffledRoles[i], 
        });
    }
    return users;
}    
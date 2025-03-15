import { fakerES as faker } from '@faker-js/faker';


export const petMock = (amount) => {

    const pets = [];

    for (let i = 0; i < amount; i++) {
        pets.push({
            name: faker.animal.petName(),
            type: faker.helpers.arrayElement(["gato", "perro"]),
            birthDate: faker.date.past( { years: 3 } ),
        });
    }
    return pets;
}    
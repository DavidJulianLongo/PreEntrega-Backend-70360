import { faker as faker } from '@faker-js/faker';


export const petMock = (amount) => {

    const pets = [];

    for (let i = 0; i < amount; i++) {
        pets.push({
            name: faker.animal.petName(),
            type: faker.helpers.arrayElement(["cat", "dog"]),
            birthDate: faker.date.past({ years: 5 }).toISOString().slice(0, 10),
            sex: faker.helpers.arrayElement(["male", "female"]),
            sterilized: faker.datatype.boolean(),
        });
    }
    return pets;
}    
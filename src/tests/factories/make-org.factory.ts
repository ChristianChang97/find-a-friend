import { faker } from "@faker-js/faker"


type Overwrite = {
    password?: string
}

export function makeOrg(overwrite?: Overwrite) {
    return {
        id: crypto.randomUUID(),
        name: faker.company.name(), 
        author_name: faker.person.fullName(), 
        email: faker.internet.email(), 
        whatsapp: faker.phone.number(), 
        password: overwrite?.password ?? faker.internet.password(),
        cep: faker.location.zipCode(), 
        state: faker.location.state(), 
        city: faker.location.city(), 
        neighborhood: faker.location.streetAddress(), 
        street: faker.location.street(), 
        latitude: faker.location.latitude(), 
        longitude: faker.location.longitude()  
    }
}
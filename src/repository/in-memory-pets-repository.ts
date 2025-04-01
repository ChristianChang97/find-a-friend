import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "./pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
    public pets: any[] = []

    async create(data: Prisma.PetCreateInput) {
        const pet = {
            id: 'pet-1',
            name: data.name,
            about: data.about, 
            age: data.age,
            size: data.size,
            energy_level: data.energy_level,
            environment: data.environment,
            org_id: 'org-1'
        }

        this.pets.push(pet)
        return pet
    }

    async findById(id: string): Promise<Pet | null> {
        const pet = this.pets.find((item) => item.id === id)
        if(!pet) {
            return null
        }
        return pet
    }
}
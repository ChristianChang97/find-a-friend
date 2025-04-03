import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "./pets-repository";
import { InMemoryOrgsRepository } from "./in-memory-orgs-repository";

export class InMemoryPetsRepository implements PetsRepository {
    public pets: any[] = []

    constructor(private orgsRepository: InMemoryOrgsRepository) {}

    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = {
            id: crypto.randomUUID(),
            ...data
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

    async findAll(params: { city: string; age?: string; size?: string; energy_level?: string; environment?: string; }): Promise<Pet[]> {
        const orgsByCity = this.orgsRepository.orgs.filter((org) => org.city === params.city)

        const petsResults = this.pets
        .filter((pet) => orgsByCity.some((org) => org.id === pet.org_id))
        .filter((pet) => params.age ? pet.age === params.age : true)
        .filter((pet) => params.size ? pet.size === params.size : true)
        .filter((pet) => params.energy_level ? pet.energy_level === params.energy_level : true)
        .filter((pet) => params.environment ? pet.environment === params.environment : true)

        return petsResults
    }
}
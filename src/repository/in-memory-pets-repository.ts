import { Prisma } from "@prisma/client";

export class InMemoryPetsRepository {
    public pets: any[] = []

    async create(data: Prisma.PetCreateInput) {
        this.pets.push(data)
    }
}
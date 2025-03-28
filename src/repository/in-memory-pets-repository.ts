import { Prisma } from "@prisma/client";

export class InMemoryOrgsRepository {
    public pets: any[] = []

    async create(data: Prisma.PetCreateInput) {
        this.pets.push(data)
    }
}
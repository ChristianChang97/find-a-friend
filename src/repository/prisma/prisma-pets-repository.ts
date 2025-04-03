import { prisma } from "@/lib/prisma";
import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";

export class PrismaPetsRepository implements PetsRepository {
    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = await prisma.pet.create({
            data
        })

        return pet
    }

    async findById(id: string): Promise<Pet | null> {
        const pet = await prisma.pet.findUnique({ where: {id}})

        return pet
    }

    async findAll({city, age, size, energy_level, environment} : { city: string, age?: string, size?: string, energy_level?: string, environment?: string }): Promise<Pet[]> {
        const pets = await prisma.pet.findMany({
            where: {
                age: age,
                size: size,
                energy_level: energy_level,
                environment: environment,
                org: {
                    city: {
                        contains: city,
                        mode: "insensitive"
                    }
                }
            }
        })

        return pets
    }
}
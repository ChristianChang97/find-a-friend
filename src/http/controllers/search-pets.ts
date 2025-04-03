import { PrismaPetsRepository } from "@/repository/prisma/prisma-pets-repository";
import { SearchPetsUseCase } from "@/use-cases/search-pets";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function searchPetsController(request: FastifyRequest, reply: FastifyReply) {
    const searchPetsSchema = z.object({
        city: z.string().min(1),
        age: z.string().optional(),
        size: z.string().optional(),
        energy_level: z.string().optional(),
        environment: z.string().optional(),
    })

    const { city, age, energy_level, environment, size } = searchPetsSchema.parse(request.query)

    const prismaRepository = new PrismaPetsRepository()
    const searchPetsUseCase = new SearchPetsUseCase(prismaRepository)

    try {
        const { pets } = await searchPetsUseCase.execute({
            city, age, energy_level, environment, size
        })

        return pets
    } catch(error) {

        return reply.status(500).send({ message: 'Internal server error' })
    }
}
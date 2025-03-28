import { PrismaPetsRepository } from "@/repository/prisma/prisma-pets-repository"
import { RegisterPetUseCase } from "@/use-cases/register-pet"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"


export async function registerPet(request: FastifyRequest, reply: FastifyReply) {

    // Validation Schema
    const registerBodySchema = z.object({
        name: z.string(),
        about: z.string(),
        age: z.string(),
        size: z.string(),
        energy_level: z.string(),
        environment: z.string(),
        org_id: z.string(),
    })

    const { name, about, age, size, energy_level, environment, org_id } = registerBodySchema.parse(request.body)

    try {
        const petsRepository = new PrismaPetsRepository()
        const registerUseCase = new RegisterPetUseCase(petsRepository)

        await registerUseCase.execute({
            name, about, age, size, energy_level, environment, org_id
        })
    } catch (err) {
        return reply.status(409).send()
    }

    return reply.status(201).send()
}
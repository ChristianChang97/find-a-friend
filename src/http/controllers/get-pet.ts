import { PrismaPetsRepository } from "@/repository/prisma/prisma-pets-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { GetPetProfileUseCase } from "@/use-cases/get-pet-profile";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPetController(request: FastifyRequest, reply: FastifyReply) {

    const schema = z.object({
        id: z.string()
    })

    const { id } = schema.parse(request.params)


    const petRepository = new PrismaPetsRepository()
    const getPetProfileUseCase = new GetPetProfileUseCase(petRepository)

    try {
        const { pet } = await getPetProfileUseCase.execute({ petId: id })

        return reply.status(200).send(pet)
    } catch(error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message})
        }

        return reply.status(500).send({ message: 'Internal server error' })
    }
}
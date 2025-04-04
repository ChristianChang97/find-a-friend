import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error"
import { makeRegisterOrgUseCase } from "@/use-cases/factories/make-register-org-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"


export async function registerOrg(request: FastifyRequest, reply: FastifyReply) {

    // Validation Schema
    const registerBodySchema = z.object({
        name: z.string(),
        author_name: z.string(),
        email: z.string(),
        whatsapp: z.string(),
        password: z.string(),
        cep: z.string(),
        state: z.string(),
        city: z.string(),
        neighborhood: z.string(),
        street: z.string(),

        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
        }),

        pets: z.array(z.object({
            name: z.string(),
            about: z.string(),
            age: z.string(),
            size: z.string(),
            energy_level: z.string(),
            environment: z.string(),
            org_id: z.string(),
        }))
    })

    const { name, author_name, email, whatsapp, password, cep, state, city, neighborhood, street, latitude, longitude } = registerBodySchema.parse(request.body)

    try {
        // Factory Pattern
        const registerUseCase = makeRegisterOrgUseCase()

        await registerUseCase.execute({
            name, author_name, email, whatsapp, password, cep, state, city, neighborhood, street, latitude, longitude
        })
    } catch (err) {
        if(err instanceof OrgAlreadyExistsError) {
            return reply.status(409).send({ message: err.message })
        }

        throw err
    }

    return reply.status(201).send()
}
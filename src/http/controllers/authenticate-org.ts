import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaOrgsRepository } from '@/repository/prisma/prisma-orgs-repository'
import { AuthenticateOrgUseCase } from '@/use-cases/authenticate-org'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'


export async function Authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { email, password } = authenticateBodySchema.parse(request.body)
  try {
    const orgsRepository = new PrismaOrgsRepository()
    const authenticateUseCase = new AuthenticateOrgUseCase(orgsRepository)
    await authenticateUseCase.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
  return reply.status(200).send()
}
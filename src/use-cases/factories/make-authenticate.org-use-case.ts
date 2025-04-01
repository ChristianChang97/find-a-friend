import { PrismaOrgsRepository } from "@/repository/prisma/prisma-orgs-repository";
import { AuthenticateOrgUseCase } from "../authenticate-org";

export function makeAuthenticateOrgUseCase() {
    const orgsRepository = new PrismaOrgsRepository()
    const authenticateUseCase = new AuthenticateOrgUseCase(orgsRepository)

    return authenticateUseCase
}
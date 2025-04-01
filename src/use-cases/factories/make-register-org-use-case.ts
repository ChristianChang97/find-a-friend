import { PrismaOrgsRepository } from "@/repository/prisma/prisma-orgs-repository";
import { RegisterOrgUseCase } from "../register-org";

export function makeRegisterOrgUseCase() {
    const orgsRepository = new PrismaOrgsRepository()
    const registerUseCase = new RegisterOrgUseCase(orgsRepository)

    return registerUseCase
}
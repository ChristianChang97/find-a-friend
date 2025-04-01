
import { OrgsRepository } from "@/repository/orgs-repository";
import { Org } from "@prisma/client";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateUseCaseResponse {
    org: Org
}

export class AuthenticateOrgUseCase {
    constructor(private orgRepository: OrgsRepository) {}


    async execute({
        email,
        password,
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const org = await this.orgRepository.findByEmail(email);

        if(!org) {
            //usar o new pra criar uma instância do erro
            throw new InvalidCredentialsError()
        } 

        const doesPasswordMatches = compare(password, org.password)

        if(!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        }

        return {
            org
        }
    }
}
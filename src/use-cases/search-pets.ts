import { PetsRepository } from "@/repository/pets-repository";
import { Pet } from "@prisma/client";

interface SearchPetsUseCaseRequest {
    age?: string,
    size?: string,
    energy_level?: string,
    environment?: string,
    city: string,
}

interface SearchPetsUseCaseResponse {
    pets: Pet[]
}

export class SearchPetsUseCase {
    constructor(private petsRepository: PetsRepository) {}

    async execute({
        city,
        age,
        energy_level,
        environment,
        size
    }: SearchPetsUseCaseRequest ): Promise<SearchPetsUseCaseResponse> {
        const pets = await this.petsRepository.findAll({
            age,
            energy_level,
            environment,
            size,
            city,
        })

        return { pets }
    }
}
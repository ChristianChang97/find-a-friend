import { PetsRepository } from "@/repository/pets-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";


interface GetUPetProfileUseCaseRequest {
    petId: string
}

interface GetPetProfileUseCaseResponse {
    pet: Pet
}

export class GetPetProfileUseCase {
    constructor(private petsRepository: PetsRepository) {}


    async execute({
        petId
    }: GetUPetProfileUseCaseRequest): Promise<GetPetProfileUseCaseResponse> {
        const pet = await this.petsRepository.findById(petId);

        if(!pet)  {
            throw new ResourceNotFoundError()
        }
            
        return {
            pet
        }

    }
}
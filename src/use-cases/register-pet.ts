interface RegisterUseCaseRequest {
    name: string
    about: string
    age: string
    size: string
    energy_level: string
    environment: string
    org_id: string
}

export class RegisterPetUseCase {
    constructor (private petsRepository: any) {}

    async execute({ 
        name, 
        about, 
        age, 
        size, 
        energy_level, 
        environment, 
        org_id   } : RegisterUseCaseRequest ) {
            
        const pet = await this.petsRepository.create({
                name, 
                about, 
                age,
                size,
                energy_level,
                environment,
                org_id        
            })

            return {
                pet
            }
        }
}
import { hash } from "bcryptjs"
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error"

interface RegisterUseCaseRequest {
    name: string
    author_name: string 
    email: string 
    whatsapp: string 
    password: string 
    cep: string 
    state: string 
    city: string 
    neighborhood: string 
    street: string 
    latitude: number
    longitude: number
}

export class RegisterOrgUseCase {
    constructor (private orgsRepository: any) {}

    async execute({ 
        name, 
        author_name, 
        email, 
        whatsapp, 
        password, 
        cep, 
        state, 
        city, 
        neighborhood, 
        street, 
        latitude, 
        longitude  } : RegisterUseCaseRequest ) {

            const password_hash = await hash(password, 6)
        
            const orgWithSameEmail = await this.orgsRepository.findByEmail(email)
        
            if (orgWithSameEmail) {
                throw new OrgAlreadyExistsError()
            }
            
            const org = await this.orgsRepository.create({
                    name, 
                    author_name, 
                    email, 
                    whatsapp, 
                    password: password_hash, 
                    cep, 
                    state, 
                    city, 
                    neighborhood, 
                    street, 
                    latitude, 
                    longitude         
            })

            return {
                org
            }
        }

}
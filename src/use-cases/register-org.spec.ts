import { describe, expect, it } from "vitest";
import { compare } from "bcryptjs";
import { RegisterOrgUseCase } from "./register-org";
import { InMemoryOrgsRepository } from "@/repository/in-memory-orgs-repository";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

describe('Register Org Use Case', () => {
    it('should hash org password upon registration', async () => {
        const orgsRepository = new InMemoryOrgsRepository()
        const registerOrgUseCase = new RegisterOrgUseCase(orgsRepository)
        
        const { org } = await registerOrgUseCase.execute({
            name: "test 01", 
            author_name: "test", 
            email: "test", 
            whatsapp: "test", 
            password: "123456",
            cep: "test", 
            state: "test", 
            city: "test", 
            neighborhood: "test", 
            street: "test", 
            latitude: -23.6579954, 
            longitude: -46.692164  
        })
        
        const isPasswordCorrectlyHashed = await compare(
            '123456',
            org.password
        )
        
        expect(isPasswordCorrectlyHashed).toBe(true)
    })
    
    it('should not be able to register with same email twice', async () => {
        const orgsRepository = new InMemoryOrgsRepository()
        const registerOrgUseCase = new RegisterOrgUseCase(orgsRepository)
        
        
        const email = 'johndoe@email.com'
        
        await registerOrgUseCase.execute({
            name: "test 01", 
            author_name: "test", 
            email: email, 
            whatsapp: "test", 
            password: "123456",
            cep: "test", 
            state: "test", 
            city: "test", 
            neighborhood: "test", 
            street: "test", 
            latitude: -23.6579954, 
            longitude: -46.692164  
        })
        
        expect(() => 
            registerOrgUseCase.execute({
                name: "test 01", 
                author_name: "test", 
                email: email, 
                whatsapp: "test", 
                password: "123456",
                cep: "test", 
                state: "test", 
                city: "test", 
                neighborhood: "test", 
                street: "test", 
                latitude: -23.6579954, 
                longitude: -46.692164  
            })
        ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
    })
})
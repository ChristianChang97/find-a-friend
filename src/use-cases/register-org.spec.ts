import { describe, expect, it } from "vitest";
import { compare } from "bcryptjs";
import { RegisterOrgUseCase } from "./register-org";

describe('Register Org Use Case', () => {
    it('should hash org password upon registration', async () => {
        const registerOrgUseCase = new RegisterOrgUseCase({
            async findByEmail() {
                return null
            },

            async create(data: any) {
                return {
                    id: 'org-1',
                    name: data.name, 
                    author_name: data.author_name, 
                    email: data.email, 
                    whatsapp: data.whatsapp, 
                    password: data.password,
                    cep: data.cep, 
                    state: data.state, 
                    city: data.city, 
                    neighborhood: data.neighborhood, 
                    street: data.street, 
                    latitude: data.latitude, 
                    longitude: data.longitude  
                }
            }
        })

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
})
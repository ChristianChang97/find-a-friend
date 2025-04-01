import { describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repository/in-memory-orgs-repository'
import { AuthenticateOrgUseCase } from '@/use-cases/authenticate-org'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate Org Use Case', () => {
    orgsRepository = new InMemoryOrgsRepository()
    // System under Test
    sut = new AuthenticateOrgUseCase(orgsRepository)

    it('should be able to authenticate', async () => {

        // Aqui a técnica consiste em criar uma abstração da camada repository, de modo que esse teste não bata no banco de dados. 
        // É uma forma de fazer testes de unidade rapidamente sem ter que configurar banco e etc
    
        await orgsRepository.create({
            name: 'Dog Hero Org',
            author_name: "test", 
            email: 'dogheroorg@example.com',
            whatsapp: "test", 
            password: await hash('123456', 6),
            cep: "test", 
            state: "test", 
            city: "test", 
            neighborhood: "test", 
            street: "test", 
            latitude: -23.6579954, 
            longitude: -46.692164  
        })

        const { org } = await sut.execute({
            email: 'dogheroorg@example.com',
            password: '123456'
        })


        expect(org.id).toEqual(expect.any(String))
    })


    it('should not be able to authenticate with wrong email', async () => {

        await expect(() => 
            sut.execute({
                email: 'testerror@example.com',
                password: '123456'
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })


    it('should not be able to authenticate with wrong password', async () => {


        await orgsRepository.create({
            name: 'Dog Hero Org',
            author_name: "test", 
            email: 'dogheroorg@example.com',
            whatsapp: "test", 
            password: await hash('123456', 6),
            cep: "test", 
            state: "test", 
            city: "test", 
            neighborhood: "test", 
            street: "test", 
            latitude: -23.6579954, 
            longitude: -46.692164  
        })

        await expect(() => 
            sut.execute({
                email: 'john@example.com',
                password: '123123'
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})
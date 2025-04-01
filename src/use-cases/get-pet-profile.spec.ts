import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryPetsRepository } from '@/repository/in-memory-pets-repository'
import { GetPetProfileUseCase } from './get-pet-profile'

let petsRepository: InMemoryPetsRepository
let sut: GetPetProfileUseCase


describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        // Aqui a técnica consiste em criar uma abstração da camada repository, de modo que esse teste não bata no banco de dados. 
        // É uma forma de fazer testes de unidade rapidamente sem ter que configurar banco e etc
        petsRepository = new InMemoryPetsRepository()
        // System under Test
        sut = new GetPetProfileUseCase(petsRepository)
    })

    it('should be able to get a pet profile', async () => {        
        const pet =  await petsRepository.create({
            id: crypto.randomUUID(),
            name: 'Thor', 
            about: 'test about', 
            age: 'test age',
            size: 'test size',
            energy_level: 'test energy level',
            environment: 'test environment',
            org: { connect: { id: 'org-1' } }
        })

        const result = await sut.execute({
            petId: pet.id
        })

        expect(pet.name).toEqual('Thor')
    })


    it('should not be able to get pet profile with wrong id', async () => {
        await expect(() => 
            sut.execute({
                petId: 'non-existing-id'
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
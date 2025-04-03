import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryPetsRepository } from '@/repository/in-memory-pets-repository'
import { GetPetProfileUseCase } from './get-pet-profile'
import { InMemoryOrgsRepository } from '@/repository/in-memory-orgs-repository'
import { makePet } from '@/tests/factories/make-pet.factory'

let petsRepository: InMemoryPetsRepository
let sut: GetPetProfileUseCase
let orgsRepository:  InMemoryOrgsRepository


describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        // Aqui a técnica consiste em criar uma abstração da camada repository, de modo que esse teste não bata no banco de dados. 
        // É uma forma de fazer testes de unidade rapidamente sem ter que configurar banco e etc
        orgsRepository = new InMemoryOrgsRepository()
        petsRepository = new InMemoryPetsRepository(orgsRepository)
        // System under Test
        sut = new GetPetProfileUseCase(petsRepository)
    })

    it('should be able to get a pet profile', async () => {        
        const pet =  await petsRepository.create(makePet())

        const result = await sut.execute({
            petId: pet.id
        })

        expect(result.pet).toEqual(pet)
    })


    it('should not be able to get pet profile with wrong id', async () => {
        await expect(() => 
            sut.execute({
                petId: 'non-existing-id'
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
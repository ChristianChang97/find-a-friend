import { InMemoryOrgsRepository } from "@/repository/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repository/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchPetsUseCase } from "./search-pets";
import { makeOrg } from "@/tests/factories/make-org.factory";
import { makePet } from "@/tests/factories/make-pet.factory";

let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase
let orgsRepository:  InMemoryOrgsRepository

describe('Search Pets Use Case', () => {
     beforeEach(() => {
        // Aqui a técnica consiste em criar uma abstração da camada repository, de modo que esse teste não bata no banco de dados. 
        // É uma forma de fazer testes de unidade rapidamente sem ter que configurar banco e etc
        orgsRepository = new InMemoryOrgsRepository()
        petsRepository = new InMemoryPetsRepository(orgsRepository)
        // System under Test
        sut = new SearchPetsUseCase(petsRepository)
    })

    it('should be able to search pets by city', async () => {
        const org = await orgsRepository.create(makeOrg())

        await petsRepository.create(makePet({ org_id: org.id }))

        await petsRepository.create(makePet({ org_id: org.id }))

        const org2 = await orgsRepository.create(makeOrg())

        await petsRepository.create(makePet({ org_id: org2.id }))

        const { pets } = await sut.execute({
            city: org.city
        })
        
        expect(pets).toHaveLength(2)
    })
    
    it('should be able to search pets by city and age', async () => {
        const org = await orgsRepository.create(makeOrg())
    
        await petsRepository.create(makePet({ org_id: org.id, age: '2' }))
        await petsRepository.create(makePet({ org_id: org.id, age: '2' }))
    
        await petsRepository.create(makePet({ org_id: org.id }))
    
        const { pets } = await sut.execute({
            city: org.city,
            age: '2',
        })

        expect(pets).toHaveLength(2)
    })


    it('should be able to search pets by city and size', async () => {
        const org = await orgsRepository.create(makeOrg())
    
        await petsRepository.create(makePet({ org_id: org.id, size: 'medium' }))
        await petsRepository.create(makePet({ org_id: org.id, size: 'medium' }))
    
        await petsRepository.create(makePet({ org_id: org.id }))
    
        const { pets } = await sut.execute({
            city: org.city,
            size: 'medium',
        })

        expect(pets).toHaveLength(2)
    })

})
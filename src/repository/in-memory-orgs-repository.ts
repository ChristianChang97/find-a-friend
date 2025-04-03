import { Org, Prisma } from "@prisma/client";
import { OrgsRepository } from "./orgs-repository";

export class InMemoryOrgsRepository implements OrgsRepository {
    public orgs: Org[] = []

    async findByEmail(email: string) {
        const org = this.orgs.find((item) => item.email === email)

        if(!org) {
            return null
        }

        return org
    }

    async create(data: Prisma.OrgCreateInput) {
        const org = {
            id: crypto.randomUUID(),
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
            latitude: new Prisma.Decimal(data.latitude.toString()), 
            longitude: new Prisma.Decimal(data.longitude.toString())
        }
        this.orgs.push(org)

        return org
    }
}
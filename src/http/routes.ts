import { FastifyInstance } from "fastify";
import { registerOrg } from "./controllers/register-org";
import { registerPet } from "./controllers/register-pet";
import { Authenticate } from "./controllers/authenticate-org";
import { getPetController } from "./controllers/get-pet";
import { searchPetsController } from "./controllers/search-pets";

export async function appRoutes(app: FastifyInstance) {

    // # 
    app.post('/org', registerOrg)
    app.post('/sessions', Authenticate)

    app.post('/pet', registerPet)
    app.get('/orgs/pets/:id', getPetController)
    app.get('/orgs/pets', searchPetsController)

}
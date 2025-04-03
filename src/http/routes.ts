import { FastifyInstance } from "fastify";
import { registerOrg } from "./controllers/register-org";
import { registerPet } from "./controllers/register-pet";
import { Authenticate } from "./controllers/authenticate-org";
import { getPetController } from "./controllers/get-pet";
import { searchPetsController } from "./controllers/search-pets";
import { verifyJWT } from "./middleware/verify-jwt";

export async function appRoutes(app: FastifyInstance) {

    // # 
    app.post('/org', registerOrg)
    app.post('/sessions', Authenticate)

    app.post('/pet', { onRequest: [verifyJWT] }, registerPet)
    app.get('/orgs/pets/:id', getPetController)
    app.get('/orgs/pets',  searchPetsController)

}
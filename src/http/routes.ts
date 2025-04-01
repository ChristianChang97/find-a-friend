import { FastifyInstance } from "fastify";
import { registerOrg } from "./controllers/register-org";
import { registerPet } from "./controllers/register-pet";
import { Authenticate } from "./controllers/authenticate-org";

export async function appRoutes(app: FastifyInstance) {

    // # 
    app.post('/org', registerOrg)

    app.post('/pet', registerPet)

    app.post('/sessions', Authenticate)
}
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { devServices } from "../services/DevServices";

export async function DevController(app: FastifyInstance) {
  app.post(
    "/developer/create",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const developer = request.body as createDeveloper;
      try {
        await devServices.register(developer);
        reply.code(200).send();
      } catch (error: any) {
        reply.code(400).send({ erro: error.message });
      }
    }
  );

  app.get(
    "/developer",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const list = await devServices.getAll();
        reply.code(200).send(list);
      } catch (error: any) {
        reply.code(400).send({ erro: error.message });
      }
    }
  );

  app.get(
    "/developer/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const params = request.params as { id: string };

      try {
        const developerExists = await devServices.getById(params.id);
        reply.code(200).send(developerExists);
      } catch (error: any) {
        reply.code(400).send({ error: error.message });
      }
    }
  );

  app.patch(
    '/developer/updateTechs/:id',
    async(request: FastifyRequest, reply: FastifyReply) => {
      const techs = request.body as {techs: string[]}
      const params = request.params as {id: string} 
      
      try {
        const updatedDeveloper = await devServices.updateTechs(params.id, techs.techs);
        reply.code(200).send(updatedDeveloper)
      } catch (error: any) {
        reply.code(400).send({erro: error.message})
      }
    }
  )

  app.delete(
    "/developer/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const params = request.params as { id: string };

      try {
        const inactivatedDeveloper = await devServices.deleteById(params.id);
        reply.code(200).send(inactivatedDeveloper);
      } catch (error: any) {
        reply.code(400).send({ error: error.message });
      }
    }
  );
}

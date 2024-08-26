import { FastifyReply, FastifyRequest } from "fastify";

export default class Generate204Controller {
    public static async get(_: FastifyRequest, reply: FastifyReply) {
        reply.code(204);
        return;
    }
}
import { FastifyReply, FastifyRequest, RouteShorthandOptions } from 'fastify';

export default class RobotsComponent {
    public static async get(_: FastifyRequest, reply: FastifyReply) {
        reply.code(200);
        return 'User-agent: *\nDisallow: /';
    }

    public static out: RouteShorthandOptions = {
        schema: {
            response: {
                200: {
                    type: "string"
                }
            }
        }
    }
}
import { FastifyReply, FastifyRequest, RouteShorthandOptions } from 'fastify';
import ProjectConfig from '../../configs/ProjectConfig';

export default class MainInfoComponent {
    public static async get(_: FastifyRequest, reply: FastifyReply) {
        reply.code(200);
        reply.header("X-Authlib-Injector-API-Location","/injector/")
        return {
            name: "backend",
            description: "Backend for Minecraft project",
            version: ProjectConfig.Injector.Version,
            author: ProjectConfig.Injector.Author
        };
    }

    public static out: RouteShorthandOptions = {
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        description: { type: 'string' },
                        version: { type: 'string' },
                        author: { type: 'string' }
                    }
                }
            }
        }
    }
}
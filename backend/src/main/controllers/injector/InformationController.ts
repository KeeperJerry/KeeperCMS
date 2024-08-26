import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";

import AuthlibUtils from "../../utils/AuthlibUtils";

export default class InformationController {
    public static async get(_: FastifyRequest, reply: FastifyReply) {
        reply.code(200);
        return AuthlibUtils.Status.get();
    }

    public static out: RouteShorthandOptions = {
        schema: {
            response: {
                200: AuthlibUtils.Status.out,
            }
        }
    }
}
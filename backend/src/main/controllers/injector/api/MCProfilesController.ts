import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import LoggerUtils from "../../../utils/LoggerUtils";
import FastifyUtils from "../../../utils/FastifyUtils";

import { ProfilePlayer } from "../../../models/injector/response/ProfileModel";
import MCPlayersRepository from "../../../orm/repository/MCPlayersRepository";
import AuthlibUtils from "../../../utils/AuthlibUtils";
import ConvertUtils from "../../../utils/ConvertUtils";

type CustomRequest = FastifyRequest<{ Body: string[]; }>;

export default class MCProfilesController {
    public static async get(request: CustomRequest, reply: FastifyReply) {
        const data: string[] = request.body;
        LoggerUtils.DEBUG(`${data}`);

        if (!Array.isArray(data) || data.length === 0) {
            reply.code(403);
            return FastifyUtils.Template.req(
                403,
                "IllegalArgumentException",
                "[3001] Invalid argument",
                undefined
            )
        }

        if (data.length >= 10) {
            reply.code(403);
            return FastifyUtils.Template.req(
                403,
                "IllegalArgumentException",
                "[3002] Not more that 10 profile name per call is allowed",
                undefined
            );
        }

        let players: ProfilePlayer[] = [];
        try {
            await Promise.all(
                data.map(async (userfull) => {
                    let result = await MCPlayersRepository.findOneBy({ nickname: userfull });
                    if (result !== undefined) {
                        players.push({ id: ConvertUtils.withoutDashes(result.id), name: userfull });
                    }
                })
            );
        } catch (error) {
            reply.code(500);
            FastifyUtils.Error.catch(error, "3003");
        }

        if (!players) {
            reply.code(404);
            return FastifyUtils.Template.req(
                404,
                "User not Found",
                "[3004] User is not found. Please, register on the site or contact support",
                undefined
            );
        }

        reply.code(200);
        return players;
    }

    public static out: RouteShorthandOptions = {
        schema: {
            response: {
                200: AuthlibUtils.MCProfiles.out,
                403: FastifyUtils.Template.out,
                404: FastifyUtils.Template.out,
                500: FastifyUtils.Template.out,
            }
        }
    }
}
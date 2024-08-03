import Fastify, { FastifyInstance, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

import GeneralConfig from '../configs/GeneralConfig';
import LoggerUtils from '../utils/LoggerUtils';
import RoutingService from '../services/RoutingService';

export default class WebServerCore {
    public static async init() {
        const instance: FastifyInstance = Fastify({
            trustProxy: true,
        });

        instance.addHook("onRequest", (request: FastifyRequest, _, done: HookHandlerDoneFunction) => {
            if(GeneralConfig.debug) {
                if(request.url !== `/generate_204`) {
                    LoggerUtils.DEBUG(`[${request.method}] [${request.ip}] "${request.url}"`);
                }
            }
            done();
        });

        RoutingService.init(instance);

        try {
            await instance.listen({ host: GeneralConfig.host, port: Number(GeneralConfig.port) });
            LoggerUtils.DEBUG(`Start interface web-server: http://${GeneralConfig.host}:${GeneralConfig.port}/`);
        } catch (err) {
            LoggerUtils.ERROR(`[CODE] 500-1: ${err}`);
            process.exit(1);
        }
    }
}
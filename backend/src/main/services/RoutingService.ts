import { FastifyInstance, HookHandlerDoneFunction } from "fastify";

import MCProfilesController from "../controllers/injector/api/MCProfilesController";
import JoinController from "../controllers/injector/sessionserver/JoinController";
import HasJoinedController from "../controllers/injector/sessionserver/HasJoinedController";
import ProfileController from "../controllers/injector/sessionserver/ProfileController";
import ValidateController from "../controllers/injector/authserver/ValidateController";
import SignOutController from "../controllers/injector/authserver/SignOutController";
import InvalidateController from "../controllers/injector/authserver/InvalidateController";
import RefreshController from "../controllers/injector/authserver/RefreshController";
import AuthenticateController from "../controllers/injector/authserver/AuthenticateController";
import InformationController from "../controllers/injector/InformationController";
import RobotsController from "../controllers/root/RobotsController";
import Generate204Controller from "../controllers/root/Generate204Controller";
import MainInfoController from "../controllers/root/MainInfoController";

/**
 * Сервис управления роутингом
 * Для упрощенности вывел в отдельные функции
 */
export default class RoutingService {
    /**
     * Основная инициализация
     */
    public static init(instance: FastifyInstance) {
        instance.register(this.root);

        instance.register(this.injector, { prefix: '/injector' });
        instance.register(this.authserverInjector, { prefix: '/injector/authserver' });
        instance.register(this.sessionserverInjector, { prefix: '/injector/sessionserver/session/minecraft' });
        instance.register(this.apiInjector, { prefix: '/injector/api' });
    }

    /**
     * Корневой роутинг
     */
    private static root(instance: FastifyInstance, options: any, done: HookHandlerDoneFunction) {
        instance.options('/generate_204', Generate204Controller.get);
        instance.get('/robots.txt', RobotsController.out, RobotsController.get);
        instance.get('/', MainInfoController.out, MainInfoController.get)
        done();
    }

    private static injector(instance: FastifyInstance, options: any, done: HookHandlerDoneFunction) {
        instance.get('/', InformationController.out, InformationController.get);
        done();
    }

    private static authserverInjector(instance: FastifyInstance, options: any, done: HookHandlerDoneFunction) {
        instance.post("/authenticate", AuthenticateController.out, AuthenticateController.get);   // 11xx
        instance.post("/refresh", RefreshController.out, RefreshController.get);                  // 12xx
        instance.post("/invalidate", InvalidateController.out, InvalidateController.get);         // 13xx
        instance.post("/signout", SignOutController.out, SignOutController.get);                  // 14xx
        instance.post("/validate", ValidateController.out, ValidateController.get);               // 15xx
        done();
    }

    private static sessionserverInjector(instance: FastifyInstance, options: any, done: HookHandlerDoneFunction) {
        // Страницы сервера сессии
        instance.get("/profile/:uuid", ProfileController.out, ProfileController.get);             // 21XX
        instance.get("/hasJoined", HasJoinedController.out, HasJoinedController.get);             // 22XX
        instance.post("/join", JoinController.out, JoinController.get);                           // 23XX
        done();
    }

    private static apiInjector(instance: FastifyInstance, options: any, done: HookHandlerDoneFunction) {
        instance.post("/profiles/minecraft", MCProfilesController.out, MCProfilesController.get);
        done();
    }
}
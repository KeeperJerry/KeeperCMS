import { FastifyInstance, HookHandlerDoneFunction } from "fastify";

import MCProfilesComponent from "../components/injector/api/MCProfilesComponent";
import JoinComponent from "../components/injector/sessionserver/JoinComponent";
import HasJoinedComponent from "../components/injector/sessionserver/HasJoinedComponent";
import ProfileComponent from "../components/injector/sessionserver/ProfileComponent";
import ValidateComponent from "../components/injector/authserver/ValidateComponent";
import SignOutComponent from "../components/injector/authserver/SignOutComponent";
import InvalidateComponent from "../components/injector/authserver/InvalidateComponent";
import RefreshComponent from "../components/injector/authserver/RefreshComponent";
import AuthenticateComponent from "../components/injector/authserver/AuthenticateComponent";
import InformationComponent from "../components/injector/InformationComponent";
import RobotsComponent from "../components/root/RobotsComponent";
import Generate204Component from "../components/root/Generate204Component";

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
        instance.options('/generate_204', Generate204Component.get);
        instance.get('/robots.txt', RobotsComponent.out, RobotsComponent.get);
        done();
    }

    private static injector(instance: FastifyInstance, options: any, done: HookHandlerDoneFunction) {
        instance.get('/', InformationComponent.out, InformationComponent.get);
        done();
    }

    private static authserverInjector(instance: FastifyInstance, options: any, done: HookHandlerDoneFunction) {
        instance.post("/authenticate", AuthenticateComponent.out, AuthenticateComponent.get);   // 11xx
        instance.post("/refresh", RefreshComponent.out, RefreshComponent.get);                  // 12xx
        instance.post("/invalidate", InvalidateComponent.out, InvalidateComponent.get);         // 13xx
        instance.post("/signout", SignOutComponent.out, SignOutComponent.get);                  // 14xx
        instance.post("/validate", ValidateComponent.out, ValidateComponent.get);               // 15xx
        done();
    }

    private static sessionserverInjector(instance: FastifyInstance, options: any, done: HookHandlerDoneFunction) {
        // Страницы сервера сессии
        instance.get("/profile/:uuid", ProfileComponent.out, ProfileComponent.get);             // 21XX
        instance.get("/hasJoined", HasJoinedComponent.out, HasJoinedComponent.get);             // 22XX
        instance.post("/join", JoinComponent.out, JoinComponent.get);                           // 23XX
        done();
    }

    private static apiInjector(instance: FastifyInstance, options: any, done: HookHandlerDoneFunction) {
        instance.post("/profiles/minecraft", MCProfilesComponent.out, MCProfilesComponent.get);
        done();
    }
}
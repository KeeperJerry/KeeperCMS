import { Route, Routes } from "react-router-dom";
import Error404Controller from "../controllers/root/Error404Controller";
import MainController from "../controllers/root/MainController";
import RouteModels from "../models/RouteModels";
import LoginController from "../controllers/auth/LoginController";
import RegisterController from "../controllers/auth/RegisterController";
import AuthTemplate from "../controllers/auth/AuthTemplate";
import ResetPassController from "../controllers/auth/ResetPassController";

const routes: RouteModels[] = [
    { 
        path: '/auth/login',
        element: <AuthTemplate 
            title='Вход'
            element={ <LoginController/> }
        />
    },{ 
        path: '/auth/register',
        element: <AuthTemplate 
            title='Регистрация'
            element={ <RegisterController/> }
        />
    },{ 
        path: '/auth/reset-password',
        element: <AuthTemplate 
            title='Восстановление'
            element={ <ResetPassController/> }
        />
    },{ 
        path: '/',
        element: <MainController/>
    },{
        path: '*',
        element: <Error404Controller/>
    }
]

export default function NavigatorCore() {
    return(
        <Routes>
        {
            routes.map((route, index) => (
                <Route key={`route-${index}`} path={ route.path } element={ route.element }/>
            ))
        }
        </Routes>
    );
}
import { Route, Routes } from "react-router-dom";
import Error404Component from "../components/root/Error404Component";
import MainComponent from "../components/root/MainComponent";
import RouteModels from "../models/RouteModels";
import LoginComponent from "../components/auth/LoginComponent";
import RegisterComponent from "../components/auth/RegisterComponent";
import AuthTemplate from "../components/auth/AuthTemplate";
import ResetPassComponent from "../components/auth/ResetPassComponent";

const routes: RouteModels[] = [
    { 
        path: '/auth/login',
        element: <AuthTemplate 
            title='Вход'
            element={ <LoginComponent/> }
        />
    },{ 
        path: '/auth/register',
        element: <AuthTemplate 
            title='Регистрация'
            element={ <RegisterComponent/> }
        />
    },{ 
        path: '/auth/reset-password',
        element: <AuthTemplate 
            title='Восстановление'
            element={ <ResetPassComponent/> }
        />
    },{ 
        path: '/',
        element: <MainComponent/>
    },{
        path: '*',
        element: <Error404Component/>
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
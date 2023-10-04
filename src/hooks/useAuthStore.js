import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";

export const useAuthStore = () => {


    const {status, user, errorMessage} = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const startLogin = async({email, pass}) => {
        dispatch(onChecking())
        try{
            //TODO, enviar al backend.
            const resp = await calendarApi.post('/auth/login', {email, pass});
            const {data} = resp;
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({name: data.name, uid: data.uid}))
        }catch(error){
            const {data} = error.response;
            dispatch(onLogout(data.msg))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 1000);
        }
    }

    const startRegister = async ({email, pass, name}) => {
        dispatch(onChecking())
        try{
            //TODO, enviar al backend.
            const resp = await calendarApi.post('/auth/new', {email, pass, name});
            const {data} = resp;
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({name: data.name, uid: data.uid}))
        }catch(error){
            const err = error.response.data.msg;
            dispatch(onLogout(err, "error"))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 1000);
        }
    }

    const checkAuthToken = async() =>{
        const token = localStorage.getItem('token') || '';
        if(!token){
            dispatch(onLogout())
            return;
        }
        try{
            const {data} = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({name: data.name, uid: data.uid}))
        }catch(error){+
            localStorage.clear();
            dispatch(onLogout())
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutCalendar())
        dispatch(onLogout());
    }

    return {

        errorMessage,
        status,
        user,


        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,

    }
}
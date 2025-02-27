import axios from "axios";

export const api = axios.create({
    baseURL : "http://localhost:3002"
})

api.interceptors.request.use(
    (config:any) => {
        if(!config?.url?.includes("/auth")){
            const token = localStorage.getItem("jwt_token"); //access token eka return karai
            config.headers["Authorization"] = `Bearer ${token}`; //all request waldi token eka yawimata
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error); //Promis ekedi errors throw krana ekama sidu karai.api call waldi use
    }
)
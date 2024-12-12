/*import axios from 'axios';

function Axios () {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_BASE_API
    })
    instance.interceptors.request.use(async (request) => {
        const token = await cookie.getCookie(import.meta.env.VITE_COOKIE_TOKEN)

        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
    });
    return instance;
}
const instance = Axios();
export {
    instance
}*/


import {useState} from "react";

function Axios () {
    const userData = {
        name: "Daniel",
        email: "email@prueba.com",
        date: "1998-07-02",
        phone: "3118760727",
        description: "dasd",
        city: "Bogotá",
        interests: ["Viajar","Musica","Restaurantes"]
    };

    return (userData);
}
const instance = Axios();
export {
    instance
}
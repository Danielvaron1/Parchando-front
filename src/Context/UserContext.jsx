import React, {createContext, useContext, useEffect, useState} from 'react';

const UserContext = createContext();



export const UserProvider = ({children}) => {
    const [userData, setUserData] = useState(() => {
        const savedData = localStorage.getItem('userData');
        return savedData ? JSON.parse(savedData) : {
            id: '',
            nombre: '',
            correo: '',
            fechaNacimiento: null,
            telefono: '',
            descripcion: '',
            ciudad: '',
            intereses: [],
            fotos:""
        };
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || "";
    });

    const handleLogout = () => {
        setUserData({
            id: '',
            nombre: '',
            correo: '',
            fechaNacimiento: null,
            telefono: '',
            descripcion: '',
            ciudad: '',
            intereses: [],
            fotos:""
        });
        setToken("");
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
    };

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData));
    }, [userData]);

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    return (
        <UserContext.Provider value={{userData, setUserData, handleLogout, token, setToken }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
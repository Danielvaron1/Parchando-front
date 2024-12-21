import React, {createContext, useContext, useEffect, useState} from 'react';

const UserContext = createContext();



export const UserProvider = ({children}) => {
    const [userData, setUserData] = useState(() => {
        const savedData = localStorage.getItem('userData');
        return savedData ? JSON.parse(savedData) : {
            id: '',
            name: '',
            email: '',
            date: null,
            phone: '',
            password: '',
            description: '',
            city: '',
            interests: []
        };
    });

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData));
    }, [userData]);

    return (
        <UserContext.Provider value={{userData, setUserData}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
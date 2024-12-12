import React, {createContext, useContext, useState} from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userData, setUserData] = useState({
        name: null,
        email: null,
        date: null,
        phone: null,
        password: null,
        description: null,
        city: null,
        interests: []
    });

    return (
        <UserContext.Provider value={{userData, setUserData}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
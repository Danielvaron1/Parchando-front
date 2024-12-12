import React from 'react';
import ReactDOM from 'react-dom/client';
import {NextUIProvider} from "@nextui-org/react";
import "./input.css";
import {AppRouter} from "./Router/AppRouter";
import {ToastContainer} from "react-toastify";
import {UserProvider} from "./Context/UserContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <UserProvider>
            <AppRouter>
                <NextUIProvider />
            </AppRouter>
        </UserProvider>
        <ToastContainer stacked/>

    </React.StrictMode>
);

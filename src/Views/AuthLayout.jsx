import Background from "../Components/Background/Background";
import Logo from "../Components/Logo/Logo";
import React from "react";
import './App.css';
import {Outlet} from "react-router-dom";

export const AuthLayout = () =>{
    return (
        <div className="App">
            <Background/>
            <div className="layout">
                <Logo className="item item-1"/>
                <Outlet/>
            </div>
        </div>
    );
}
import React from "react";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegistroForm from "../Components/Registro-Form/Registro-Form";
import Form from "../Components/Login-Form/Login-Form";
import RegistroCiudad from "../Components/Registro-Form/Registro-Ciudad";
import RegistroIntereses from "../Components/Registro-Form/Registro-Intereses";
import {AuthLayout} from "../Views/AuthLayout";
import {Landing} from "../Views/Landing";
import CardTemplate from "../Components/Assets/CardTemplate";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <Landing/>
                }>
                    <Route path="" element={
                        <CardTemplate/>
                    }/>
                </Route>
                <Route path="/auth" element={
                    <AuthLayout/>
                }>
                    <Route path="" element={
                        <Form class="item item-2"/>
                    }/>
                    <Route path="registro" element={
                        <RegistroForm class="form-container item item-2"/>
                    }/>
                    <Route path="registro-ciudad" element={
                        <RegistroCiudad class="form-container item item-2"/>
                    }/>
                    <Route path="registro-ciudad" element={
                        <RegistroCiudad class="form-container item item-2"/>
                    }/>
                    <Route path="registro-intereses" element={
                        <RegistroIntereses class="form-container item item-2"/>
                    }/>
                </Route>
                <Route path="*" element={
                    //404
                    <AuthLayout>
                        <Form class="item item-2"/>
                    </AuthLayout>
                }/>
            </Routes>
        </BrowserRouter>
    )
}


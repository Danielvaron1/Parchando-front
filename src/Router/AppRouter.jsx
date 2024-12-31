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
import Perfil from "../Components/Perfil/Perfil";
import PerfilUsuario from "../Components/Perfil/PerfilUsuario";
import Amigos from "../Components/Perfil/Amigos";
import Evento from "../Components/Evento/Evento";
import MensajesIndex from "../Components/Mensajes/MensajesIndex";
import Chat from "../Components/Mensajes/Chat";
import Eventos from "../Components/Evento/Eventos";

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
                    <Route path="PerfilUpdate" element={
                        <Perfil/>
                    }/>
                    <Route path="Perfil" element={
                        <PerfilUsuario/>
                    }/>
                    <Route path="Amigos" element={
                        <Amigos/>
                    }/>
                    <Route path="Evento" element={
                        <Evento/>
                    }/>
                    <Route path="Eventos" element={
                        <Eventos tipo={"eventos"}/>
                    }/>
                    <Route path="Mis Eventos" element={
                        <Eventos tipo={"mis eventos"}/>
                    }/>
                    <Route path="Mensajes" element={
                        <MensajesIndex/>
                    }/>
                    <Route path="Chat" element={
                        <Chat/>
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
                    <Landing/>
                }/>
            </Routes>
        </BrowserRouter>
    )
}


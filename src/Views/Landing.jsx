/*import React from "react";
import './Landing.css';
import Header from "../Components/Header/Header";

export const Landing = ({children}) => {
    return (
        <DashboardLayout defaultSidebarCollapsed>
            <DemoPageContent pathname={pathname} />
        </DashboardLayout>
    );
}*/

/*
<div className="App">
    <Header/>
    {children}
</div>*/


import * as React from 'react';
import './Landing.css';
import {Stack} from "@mui/material";
import Header from "../Components/Header/Header";
import {Outlet} from "react-router-dom";




export const Landing = () => {


    return (
        <Stack>
            <Header/>
            <Outlet/>
        </Stack>
    );
}
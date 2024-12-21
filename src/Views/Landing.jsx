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
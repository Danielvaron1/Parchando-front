import { Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as React from "react";
import {deepPurple} from "@mui/material/colors";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Header from "../Header/Header";
import {Link} from "react-router-dom";

export const NotFound = () => {

    return (
        <Stack>
            <Header/>
            <Stack sx={{justifyContent: "center", alignItems: "center", marginTop:1,marginBottom:2}}>
                <ErrorOutlineIcon color="error" sx={{ fontSize: 80 }}/>
                <Typography variant={"h2"} align="center">No se encuentra la página o evento que buscas.</Typography>
                <Button to={"/"} component={Link} variant="contained" sx={{ textTransform: "none" , marginTop:3, background:deepPurple[400]}}>
                    <Typography variant="h4" component="span" >
                        Inicio
                    </Typography>
                </Button>
            </Stack>
        </Stack>
    );
}
import * as React from 'react';
import {CircularProgress, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import CardTemplate from "../Assets/CardTemplate";
import { getEventos} from "../../Api/EventosApi";
import {useUserContext} from "../../Context/UserContext";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import EventIcon from '@mui/icons-material/Event';


export default function Eventos({tipo}) {
    const {userData} = useUserContext();
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadEventos() {
            setLoading(true);
            try {
                let eventosFetch;
                if(tipo === "eventos"){
                    eventosFetch = await getEventos({ciudad: userData.ciudad});
                }
                if(tipo === "mis eventos"){
                    eventosFetch = await getEventos({usuarioId: userData.id});
                }
                setEventos(eventosFetch);
            } catch (error) {
                console.error("Error fetching event data:", error);
            } finally {
                setLoading(false);
            }

        }

        loadEventos();
    }, [tipo]);


    return (
        <Stack>
            <Stack direction="row" sx={{justifyContent: "center", marginTop: '10px'}}>
                    <Button
                        variant="contained"
                        component={Link}
                        to={`/Evento`}
                        startIcon={<EventIcon/>}
                        sx={{width: {xs: 350, md: 400}}}
                    >
                        Crear un evento
                    </Button>
            </Stack>
            {loading ? ( // Muestra el loader si está cargando
                <Stack direction="row" justifyContent="center" sx={{ marginTop: '20px' }}>
                    <CircularProgress color="secondary"/>
                </Stack>
            ) : (
                <Stack direction="row" spacing={2}
                       sx={{ justifyContent: "center", marginTop: '15px', flexWrap: 'wrap' }} useFlexGap>
                    {eventos.map((evento) => (
                        <CardTemplate evento={evento} key={evento.id} />
                    ))}
                </Stack>
            )}
        </Stack>
    );
}

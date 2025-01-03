import * as React from 'react';
import {CircularProgress, Stack, Tooltip} from "@mui/material";
import {useEffect, useState} from "react";
import CardTemplate from "../Assets/CardTemplate";
import {getEventos, getEventosDate} from "../../Api/EventosApi";
import {useUserContext} from "../../Context/UserContext";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import EventIcon from '@mui/icons-material/Event';
import HistoryIcon from '@mui/icons-material/History';

export default function Eventos({tipo}) {
    const {userData} = useUserContext();
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);

    const [history, setHistory] = useState(false);

    useEffect(() => {
        async function loadEventos() {
            setLoading(true);
            try {
                let eventosFetch;
                if (tipo === "eventos" || tipo === "mis eventos") {
                    const fetchFunction = history ? getEventosDate : getEventos;
                    const params = tipo === "eventos" ? {ciudad: userData.ciudad} : {usuarioId: userData.id};
                    eventosFetch = await fetchFunction(params);
                }
                setEventos(eventosFetch);
            } catch (error) {
                console.error("Error fetching event data:", error);
            } finally {
                setLoading(false);
            }

        }

        loadEventos();
    }, [tipo, history]);

    useEffect(() => {
        setHistory(false);
    }, [tipo]);

    function handleHistoryEvents() {
        setHistory(!history);
    }

    const tooltipText = history ? "Eventos disponibles" : "Eventos pasados";

    return (
        <Stack>
            {userData.nombre !== "" && (
                <Stack direction="row" sx={{justifyContent: "space-evenly", marginTop: '10px'}}>
                    <Stack>
                        <EventIcon sx={{color: "white"}}/>
                    </Stack>
                    <Stack>
                        <Button
                            variant="contained"
                            component={Link}
                            to={`/Evento`}
                            startIcon={<EventIcon/>}
                            sx={{marginLeft: '10px'}}
                        >
                            Crear un evento
                        </Button>
                    </Stack>
                    <Stack>
                        <Tooltip title={tooltipText} arrow>
                            <Button
                                variant="outlined"
                                color={"info"}
                                onClick={handleHistoryEvents}
                            >
                                {history ? (

                                    <EventIcon/>
                                ) : (
                                    <HistoryIcon/>
                                )}

                            </Button>
                        </Tooltip>
                    </Stack>
                </Stack>
            )}
            {loading ? (
                <Stack direction="row" justifyContent="center" sx={{marginTop: '20px'}}>
                    <CircularProgress color="secondary"/>
                </Stack>
            ) : (
                <Stack direction="row" spacing={2}
                       sx={{justifyContent: "center", marginTop: '15px', flexWrap: 'wrap'}} useFlexGap>
                    {eventos.map((evento) => (
                        <CardTemplate evento={evento} key={evento.id}/>
                    ))}
                </Stack>
            )}
        </Stack>
    );
}

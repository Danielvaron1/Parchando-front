import {Divider, Stack} from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import {useEffect, useRef, useState} from "react";
import dayjs from "dayjs";
import "./Evento.css";
import Typography from "@mui/material/Typography";
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/es';
import {Library} from "@googlemaps/js-api-loader";
import {useJsApiLoader} from "@react-google-maps/api";
import {deepPurple} from "@mui/material/colors";
import Comentarios from "../Assets/Comentarios";
import Asistentes from "../Assets/Asistentes";
import {useUserContext} from "../../Context/UserContext";
import {useNavigate} from "react-router-dom";
import {deleteAsistencia, getAsistencias, postAsistencia} from "../../Api/EventosApi";
import {Bounce, toast} from "react-toastify";
import {createNotificacion} from "../../Api/UsuariosApi";

const libs: Library[] = ["core", "maps", "places", "marker"];

const EventoVer = ({eventoFetch}) => {
    const eventDetailsRef = useRef(null);
    const {userData, token} = useUserContext();

    const [loading, setLoading] = useState(true);
    const [evento, setEvento] = useState(null);
    const [partesUbicacion, setPartesUbicacion] = useState([]);
    const [resultadoFinal, setResultadoFinal] = useState("");
    const navigate = useNavigate();
    const [asistentes, setAsistentes] = useState([]);

    dayjs.extend(localeData);
    dayjs.locale('es');

    useEffect(() => {
        if (eventoFetch) {
            getAsistenciasFetch();
            const fechaCompleta = dayjs(eventoFetch.fecha);
            setEvento({
                usuarioId: eventoFetch.usuarioId,
                titulo: eventoFetch.titulo,
                precio: eventoFetch.precio,
                descripcion: eventoFetch.descripcion,
                fecha: fechaCompleta,
                hora: fechaCompleta,
                ubicacion: eventoFetch.ubicacion,
                ciudad: eventoFetch.ciudad,
                id: eventoFetch.id
            });
            const fechaHora = dayjs(fechaCompleta);
            const formatoDeseado = fechaHora.format('dddd, D [de] MMMM [de] YYYY [a las] h:mm A');
            setPartesUbicacion(eventoFetch.ubicacion.split('/'));
            setResultadoFinal(capitalizarDiasYMeses(formatoDeseado));
            setLoading(false);
        }
    }, [eventoFetch]);

    async function getAsistenciasFetch() {
        try {
            const asistencias = await getAsistencias(eventoFetch.id, token);
            setAsistentes(asistencias);
        } catch (error) {
            console.log(error);
        }
    }


    const capitalizarDiasYMeses = (str) => {
        return str.split(' ').map((palabra) => {
            if (palabra === 'de' || palabra === 'a' || palabra === 'las') {
                return palabra.toLowerCase();
            }
            if (palabra === 'AM' || palabra === 'PM') {
                return palabra.toUpperCase();
            }
            return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
        }).join(' ');
    };


    async function handleAsistirEvent() {
        try {
            if (usuarioAsistente) {
                await deleteAsistencia(evento.id, userData.id);
                await createNotificacion({usuarioId:evento.usuarioId,tipoId:evento.id,tipo:"salio",nombre:evento.titulo},token);
                toast.error('Saliste del evento '+evento.titulo, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce
                });
            } else{
                await postAsistencia(evento.id, userData.id);
                await createNotificacion({usuarioId:evento.usuarioId,tipoId:evento.id,tipo:"asistente",nombre:evento.titulo},token);
                toast.success('Asistirás al evento '+evento.titulo, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce
                });
            }
            getAsistenciasFetch();
        } catch (e) {
            console.log(e);
        }
    }

    const [map, setMap] = useState(null);
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
        libraries: libs,
        language: 'es',
    });

    const mapRef = useRef(null);

    useEffect(() => {
        if (isLoaded && partesUbicacion.length > 2 && mapRef.current) {
            const location = {lat: parseFloat(partesUbicacion[1]), lng: parseFloat(partesUbicacion[2])};
            const mapOptions = {
                center: location,
                zoom: 5,
                mapId: "MY-MAP-1234",
                mapTypeId: "roadmap",
                fullscreenControl: false,
                disableDefaultUI: true,
            };
            const gMap = new window.google.maps.Map(mapRef.current, mapOptions);

            gMap.setZoom(17);
            const marker = new window.google.maps.marker.AdvancedMarkerElement({
                map: gMap,
                position: location,
                title: evento.titulo,
            });
            setMap(gMap);
        }
    }, [isLoaded, partesUbicacion, evento]);

    const [eventDetailsHeight, setEventDetailsHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            if (eventDetailsRef.current) {
                setEventDetailsHeight(eventDetailsRef.current.clientHeight);
            }
        };

        const debounce = (func, delay) => {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), delay);
            };
        };

        const debouncedHandleResize = debounce(handleResize, 200);

        handleResize();

        window.addEventListener("resize", debouncedHandleResize);

        return () => {
            window.removeEventListener("resize", debouncedHandleResize);
        };
    }, []);

    const handleEditEvent = () => {
        navigate(`/Evento?id=${evento.id}&edit=true`);
    };

    if (loading || !evento) {
        return <p>Cargando...</p>;
    }

    const fechaActual = dayjs();
    const usuarioAsistente = asistentes.some(asistente => asistente.usuario.id === userData.id);
    const totalAsistentes = asistentes.length;

    return (
        <Stack>
            <Stack direction={{xs: 'column', sm: 'row'}} ref={eventDetailsRef} sx={{
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: 1,
                marginBottom: 1
            }}>
                <Stack sx={{width: {xs: 350, md: 400}, maxWidth: '100%'}}>
                    <Typography color={"textSecondary"} variant={"subtitle2"}>{resultadoFinal}</Typography>
                    <Typography color={"textPrimary"} variant={"h6"}>{evento.titulo}</Typography>
                    <Typography color={"textSecondary"} variant={"caption"}>
                        {evento.precio === "" || evento.precio === "0" ? (
                            <span>Evento gratuito</span>
                        ) : (
                            <span>Precio del evento: ${evento.precio}</span>
                        )}
                    </Typography>
                    {userData.id != evento.usuarioId ? (
                        <Button
                            variant="contained"
                            onClick={handleAsistirEvent}
                            disabled={fechaActual.isAfter(evento.fecha)}
                            sx={{backgroundColor: deepPurple[400], display: {xs: 'flex', sm: 'none'}}}
                        >
                            Asistiré
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={handleEditEvent}
                            sx={{backgroundColor: deepPurple[400], display: {xs: 'flex', sm: 'none'}}}
                        >
                            Editar
                        </Button>
                    )}
                    <Typography color={"textPrimary"} variant={"body2"}
                                style={{whiteSpace: 'pre-line'}}>{evento.descripcion}</Typography>
                    <Stack sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        flexGrow: 1,
                        marginTop: 2,
                        overflow: 'hidden',
                        display: "row"
                    }}>
                        <Typography color={"textPrimary"} variant={"h6"}>{totalAsistentes} Asistentes</Typography>
                    </Stack>
                </Stack>
                <Stack sx={{width: {xs: 350, md: 400}, maxWidth: '100%'}} direction={"column"}>
                    <Stack direction={"row"} sx={{
                        width: {xs: 350, md: 400},
                        maxWidth: '100%',
                        justifyContent: "flex-end",
                        alignItems: "center",
                        display: {xs: 'none', sm: 'flex'}
                    }}>
                        {userData.id != evento.usuarioId ? (
                            <Button
                                variant="contained"
                                onClick={handleAsistirEvent}
                                disabled={fechaActual.isAfter(evento.fecha) || userData.nombre === ""}
                                sx={{backgroundColor: deepPurple[400]}}
                            >
                                {usuarioAsistente ? "No Asistiré" : "Asistiré"}
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={handleEditEvent}
                                sx={{backgroundColor: deepPurple[400]}}
                            >
                                Editar
                            </Button>
                        )}
                    < /Stack>
                    <Stack>
                        <Typography color={"textPrimary"} variant={"subtitle2"}
                                    style={{textAlign: 'right'}}>{partesUbicacion[0]}</Typography>
                        {isLoaded ?
                            <div style={{height: "250px"}} ref={mapRef}/>
                            : <p>Cargando...</p>
                        }
                    </Stack>
                </Stack>

            </Stack>
            <Divider variant={"middle"}></Divider>
            {usuarioAsistente && (
                <Stack direction={{xs: 'column', sm: 'row'}} sx={{
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexGrow: 1,
                    overflow: 'hidden'
                }}>
                    <Stack sx={{width: {xs: 350, md: "50vh"}, flexGrow: 1}}>
                        <Comentarios maxHeight={`calc(100vh - ${eventDetailsHeight}px - 210px)`} eventoId={evento.id} eventoTitulo={evento.titulo} asistencias={asistentes}/>
                    </Stack>
                    <Divider orientation="vertical" flexItem/>
                    <Stack sx={{width: {xs: 350, md: "50vh"}, flexGrow: 1}}>
                        <Asistentes maxHeight={`calc(100vh - ${eventDetailsHeight}px - 163px)`} eventoId={evento.id}
                                    asistencias={asistentes}/>
                    </Stack>
                </Stack>
            )}
        </Stack>
    );
}

export default EventoVer;
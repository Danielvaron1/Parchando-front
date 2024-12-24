import {Divider, Stack} from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import {useEffect, useRef, useState} from "react";
import dayjs from "dayjs";
import "./Evento.css"
import Typography from "@mui/material/Typography";
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/es';
import {Library} from "@googlemaps/js-api-loader";
import {useJsApiLoader} from "@react-google-maps/api";
import {deepPurple} from "@mui/material/colors";
import Comentarios from "../Assets/Comentarios";
import Asistentes from "../Assets/Asistentes";

const libs: Library[] = ["core", "maps", "places", "marker"]
const EventoVer = () => {
    const eventDetailsRef = useRef(null);

    const [evento] = useState({
        usuarioId: "1",
        titulo: "Montar cicla",
        precio: "1,232",
        descripcion: "Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final.\nAunque no posee actualmente fuentes para justificar sus hipótesis, el profesor de filología clásica Richard McClintock asegura que su uso se remonta a los impresores de comienzos del siglo XVI.1​ Su uso en algunos editores de texto muy conocidos en la actualidad ha dado al texto lorem ipsum nueva popularidad.",
        fecha: "2024-12-21",
        hora: "05:30 PM",
        ubicacion: "Av José Celestino Mutis #68-95, Bogotá, Colombia/4.6684395/-74.09735599999999",
        ciudad: ""
    });
    dayjs.extend(localeData);
    dayjs.locale('es');

    const partesUbicacion = evento.ubicacion.split('/');

    const fechaHora = dayjs(`${evento.fecha} ${evento.hora}`);
    const formatoDeseado = fechaHora.format('dddd, D [de] MMMM [de] YYYY [a las] h:mm A');

    // Función para capitalizar la primera letra de cada palabra
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
    const resultadoFinal = capitalizarDiasYMeses(formatoDeseado);

    function handleCreateEvent() {
        return;
    }



    const [map, setMap] = useState(null);
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
        libraries: libs
    })

    const mapRef = useRef(null);

    useEffect(() => {
        if (isLoaded) {
            const location = {lat: parseFloat(partesUbicacion[1]), lng: parseFloat(partesUbicacion[2])}
            const mapOptions = {
                center: location,
                zoom: 5,
                mapId: "MY-MAP-1234",
                mapTypeId: "roadmap",
                fullscreenControl: false,
                disableDefaultUI: true,
            }
            const gMap = new window.google.maps.Map(mapRef.current, mapOptions);

            gMap.setZoom(17);
            const marker = new window.google.maps.marker.AdvancedMarkerElement({
                map: gMap,
                position: location,
                title: evento.title,
            })
            setMap(gMap);
        }
    }, [isLoaded]);

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

        // Llama a la función de ajuste de altura al cargar el componente
        handleResize();

        // Agrega el listener de resize
        window.addEventListener("resize", debouncedHandleResize);

        return () => {
            window.removeEventListener("resize", debouncedHandleResize);
        };
    }, []);

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
                    <Button
                        variant="contained"
                        onClick={handleCreateEvent}
                        sx={{ backgroundColor: deepPurple[400], display: {xs: 'flex', sm: 'none'}}}
                    >
                        Asistiré
                    </Button>
                    <Typography color={"textPrimary"} variant={"body2"}  style={{ whiteSpace: 'pre-line' }}>{evento.descripcion}</Typography>
                </Stack>
                <Stack sx={{width: {xs: 350, md: 400}, maxWidth: '100%'}} direction={"column"}>
                    <Stack direction={"row"} sx={{width: {xs: 350, md: 400}, maxWidth: '100%',justifyContent: "flex-end",alignItems: "center", display: {xs: 'none', sm: 'flex'}}}>
                        <Button
                            variant="contained"
                            onClick={handleCreateEvent}
                            sx={{ backgroundColor: deepPurple[400] }}
                        >
                            Asistiré
                        </Button>
                    </Stack>
                    <Stack>
                        <Typography color={"textPrimary"} variant={"subtitle2"}  style={{ textAlign: 'right' }}>{partesUbicacion[0]}</Typography>
                        {isLoaded ?
                            <div style={{height: "250px"}} ref={mapRef}/>
                            : <p>Cargando...</p>
                        }
                    </Stack>
                </Stack>
            </Stack>
            <Divider variant={"middle"}></Divider>
            <Stack direction={{xs: 'column', sm: 'row'}} sx={{
                justifyContent: "space-evenly",
                alignItems: "center",
                flexGrow: 1,
                overflow: 'hidden'
            }}>
                <Stack  sx={{width: {xs: 350, md: "50vh"}, flexGrow: 1}}>
                    <Comentarios maxHeight={`calc(100vh - ${eventDetailsHeight}px - 210px)`}/>
                </Stack>
                <Divider orientation="vertical" flexItem />
                <Stack sx={{width: {xs: 350, md: "50vh"}, flexGrow: 1}}>
                    <Asistentes maxHeight={`calc(100vh - ${eventDetailsHeight}px - 163px)`}/>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default EventoVer;
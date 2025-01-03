import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {deepPurple, red} from '@mui/material/colors';
import {CircularProgress, Stack} from "@mui/material";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {useEffect, useRef, useState} from "react";
import InfoIcon from '@mui/icons-material/Info';
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import {useJsApiLoader} from "@react-google-maps/api";
import {Library} from "@googlemaps/js-api-loader";
import {useUserContext} from "../../Context/UserContext";
import {getUsersParams} from "../../Api/UsuariosApi";
import IconButton from "@mui/material/IconButton";

const libs: Library[] = ["core", "maps", "places", "marker"];
export default function CardTemplate({evento}) {
    const {token} = useUserContext();
    const [resultadoFinal, setResultadoFinal] = useState("");
    const [partesUbicacion, setPartesUbicacion] = useState([]);
    const [map, setMap] = useState(null);
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
        libraries: libs,
        language: 'es',
    });
    const [user, setUser] = useState({nombre:"Default",id:0});
    const mapRef = useRef(null);

    const [loading, setLoading] = useState(true);

    dayjs.extend(localeData);
    dayjs.locale('es');

    useEffect(() => {
        if (evento) {
            const fechaCompleta = dayjs(evento.fecha);
            const fechaHora = dayjs(fechaCompleta);
            const formatoDeseado = fechaHora.format('MMMM D, YYYY h:mm A');
            setResultadoFinal(formatoDeseado.charAt(0).toUpperCase() + formatoDeseado.substring(1));
            if (evento.ubicacion) {
                setPartesUbicacion(evento.ubicacion.split('/'));
            }
            getUserEvent();
        }
        setLoading(false);
    }, [evento])

    async function getUserEvent() {
        try{
            const userFetch = await getUsersParams({usuarioId: evento.usuarioId}, token);
            setUser(userFetch);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (isLoaded && partesUbicacion.length > 2 && mapRef.current) {
            const location = {lat: parseFloat(partesUbicacion[1]), lng: parseFloat(partesUbicacion[2])};
            const mapOptions = {
                center: location,
                zoom: 5,
                mapId: "MY-MAP-" + evento.id,
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


    if (loading || !evento) {
        return (
            <Stack direction="row" sx={{justifyContent: "center", marginTop: '10px'}}>
                <CircularProgress color="secondary"/>
            </Stack>);
    }

    return (
        <Card sx={{width: 350}}>
            <CardHeader
                avatar={
                    <IconButton
                        size="large"
                        component={Link}
                        to={`/Perfil?id=${user.id}`}
                        edge="end"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <Avatar
                            sx={{bgcolor: deepPurple[400]}}
                            alt={user.nombre}
                            src="/static/images/avatar/1.jpg"
                        >
                            {user.nombre.charAt(0)}
                        </Avatar>
                    </IconButton>
                }
                title={evento.titulo}
                subheader={resultadoFinal}
            />
            <CardMedia>
                <Stack>
                    {isLoaded ?
                        <div style={{height: "150px"}} ref={mapRef}/>
                        : <p>Cargando...</p>
                    }
                </Stack>
            </CardMedia>
            <CardContent>
                <Typography color={"textSecondary"} variant={"caption"}>
                    {evento.precio === "" || evento.precio === "0" ? (
                        <span>Evento gratuito</span>
                    ) : (
                        <span>Precio del evento: ${evento.precio}</span>
                    )}
                </Typography>
                <Typography variant="body2" sx={{
                    color: 'text.secondary',
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    height: 40
                }}>
                    {evento.descripcion}
                </Typography>
            </CardContent>
            <CardActions sx={{
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Link to={`/Evento?id=${evento.id}`} style={{textDecoration: 'none'}}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<InfoIcon/>}
                    >
                        Detalles
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}

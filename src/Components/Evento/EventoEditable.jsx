import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputAdornment,
    Stack,
    TextField,
    useMediaQuery,
    useTheme
} from "@mui/material";
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import Button from "@mui/material/Button";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {useJsApiLoader} from "@react-google-maps/api";
import {Library} from "@googlemaps/js-api-loader";
import "./Evento.css"
import {Bounce, toast} from "react-toastify";
import {useUserContext} from "../../Context/UserContext";
import {deleteEvento, getAsistenciasSinUsuarios, postAsistencia, postEvento, putEvento} from "../../Api/EventosApi";
import {useNavigate} from "react-router-dom";
import {createNotificacion} from "../../Api/UsuariosApi";

const libs: Library[] = ["core", "maps", "places", "marker"]
const EventoEditable = ({editable,eventoFetch}) => {
    const {userData , token} = useUserContext();
    const [map, setMap] = useState(null);
    const [autoComplete, setAutoComplete] = useState(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [locacionCargada, setLocacionCargada] = React.useState(null);
    const navigate = useNavigate();

    const [evento, setEvento] = useState({
        usuarioId: "",
        titulo: "",
        precio: "",
        descripcion: "",
        fecha: null,
        hora: null,
        ubicacion: "",
        ciudad: ""
    });

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
        libraries: libs,
        language: 'es',
    })

    const mapRef = useRef(null);
    const placeAutoCompleteRef = useRef(null);

    const [place, setPlace] = useState(null);

    useEffect(() => {
        if (eventoFetch) {
            if(eventoFetch.usuarioId===userData.id){
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
                setPlace(eventoFetch.ubicacion);
                const partesUbicacion =eventoFetch.ubicacion.split('/');
                setLocacionCargada({lat: parseFloat(partesUbicacion[1]), lng: parseFloat(partesUbicacion[2])});
            } else{
                navigate(`/Evento?id=${eventoFetch.id}`);
            }

        } else {
            setEvento({
                usuarioId: "",
                titulo: "",
                precio: "",
                descripcion: "",
                fecha: null,
                hora: null,
                ubicacion: "",
                ciudad: ""
            });
        }
    }, [eventoFetch]);

    useEffect(() => {
        if (isLoaded) {
            const mapOptions = {
                center: {
                    lat: 4.719528,
                    lng: -74.117167
                },
                zoom: 5,
                mapId: "MY-MAP-1234",
                mapTypeId: "roadmap",
                fullscreenControl: false,
                disableDefaultUI: true,
            }
            const gMap = new window.google.maps.Map(mapRef.current, mapOptions);

            const colombiaBounds = new window.google.maps.LatLngBounds(
                new window.google.maps.LatLng({lat: 12.470164, lng: -66.870193}),
                new window.google.maps.LatLng({lat: -4.210185, lng: -78.978509})
            )

            const gAutoComplete = new window.google.maps.places.Autocomplete(placeAutoCompleteRef.current,
                {
                    bounds: colombiaBounds,
                    fields: ["formatted_address", "geometry", "name"],
                    componentRestrictions: {
                        country: ["co"]
                    }
                });
            setAutoComplete(gAutoComplete);
            setMap(gMap);
        }
    }, [isLoaded,locacionCargada]);

    useEffect(() => {
        if (autoComplete) {
            autoComplete.addListener("place_changed", () => {
                const placeNew = autoComplete.getPlace();
                const placeUp = {
                    address: null,
                    lat: null,
                    lng: null,
                }
                placeUp.address = placeNew.formatted_address;
                const position = placeNew.geometry?.location
                if (position) {
                    placeUp.lat = position.lat();
                    placeUp.lng = position.lng();
                    setMarker(position, placeNew.name)
                }
                setPlace(placeUp)
            })
        }
    }, [autoComplete]);

    useEffect(() => {
        if(locacionCargada!=null){
            setMarker(locacionCargada,evento.titulo);
        }
    },[map])

    function setMarker(location, name) {
        if (!map) return;
        map.setCenter(location);
        map.setZoom(17);
        const marker = new window.google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: location,
            title: name,
        })
    }


    const formatNumber = (value) => {
        const numberValue = value.replace(/[^0-9]/g, '');
        return numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handlePriceChange = (event) => {
        const inputValue = event.target.value;
        const formattedValue = formatNumber(inputValue);
        setEvento({...evento, precio: formattedValue});
    };

    async function handleCreateEvent() {
        const eventoValid = await validateForm();
        if (eventoValid) {
            try {
                const eventoTemp=await postEvento(eventoValid);
                await postAsistencia(eventoTemp.id, userData.id);
                toast.success('Evento creado', {
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
                navigate(`/Evento?id=${eventoTemp.id}`);
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        }
    }

    async function handleUpdateEvent() {
        const eventoValid = await validateForm();
        if(eventoValid){
            const {id, ...eventoTemp} = eventoValid;
            try {
                const asistencias = await getAsistenciasSinUsuarios(evento.id);
                console.log(asistencias);
                asistencias.forEach(async (asistente) => {
                    await createNotificacion({
                        usuarioId: asistente.usuarioId,
                        tipoId: evento.id,
                        tipo: "editado",
                        nombre: evento.titulo
                    },token);
                });
                await putEvento(id,eventoTemp);
                toast.success('Evento actualizado', {
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
                navigate(`/Evento?id=${evento.id}`);
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        }
    }

    const handleClickOpenDelete = () => {
        setDeleteOpen(true);
    };

    function handleCloseDelete() {
        setDeleteOpen(false);
    }

    async function validateForm() {
        if (place == null || evento.titulo === "" || evento.fecha == null || evento.hora == null || evento.descripcion === "") {
            toast.error('Campos inválidos', {
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
            console.log(evento);
            return false;
        }
        const today = dayjs().startOf('day');
        if (evento.fecha.isBefore(today)) {
            toast.error('La fecha debe ser mayor a hoy', {
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
            return false;
        }

        let ubi;
        if(place.address){
            ubi=place.address + "/" + place.lat + "/" + place.lng;
        }else{
            ubi=place;
        }
        const combinedDateTime = dayjs(`${dayjs(evento.fecha).format('YYYY-MM-DD')}T${dayjs(evento.hora).format('HH:mm:ss')}`);

        const { hora, ...eventoTemp } = evento;

        return {
            ...eventoTemp,
            ubicacion: ubi,
            fecha: combinedDateTime.format('YYYY-MM-DDTHH:mm:ss'),
            usuarioId: userData.id,
            ciudad: userData.ciudad
        } ;
    }

    const handleDeleteEvent = async () => {
        handleCloseDelete();
        if (evento) {
            try {
                const asistencias = await getAsistenciasSinUsuarios(evento.id);
                console.log(asistencias);
                asistencias.forEach(async (asistente) => {
                    await createNotificacion({
                        usuarioId: asistente.usuarioId,
                        tipoId: evento.id,
                        tipo: "cancelado",
                        nombre: evento.titulo
                    },token);
                });
                await deleteEvento(evento.id);
                toast.success('Evento eliminado', {
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
                navigate(`/`);
            } catch (error) {
                console.error("Error deletar evento", error);
            }

        }
    };

    return (
        <Stack>
            <Stack direction={{xs: 'column', sm: 'row'}} sx={{
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: 2
            }}>
                <Stack sx={{width: {xs: 300, md: 400}, maxWidth: '100%'}}>
                    <TextField id="titulo" label="Titulo" margin="dense" value={evento.titulo}
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                   setEvento({...evento, titulo: event.target.value});
                               }}/>
                    <TextField id="precio" label="Precio del evento" margin="dense" value={evento.precio}
                               type={"text"}
                               slotProps={{
                                   htmlInput: {
                                       sx: {textAlign: 'right'},
                                   },
                                   input: {
                                       endAdornment: (
                                           <InputAdornment
                                               position="end">$</InputAdornment>),
                                   },
                               }}
                               onChange={handlePriceChange}/>
                    <TextField
                        margin="dense"
                        id="descripcion"
                        label="Descripción"
                        multiline
                        rows={3}
                        value={evento.descripcion}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setEvento({...evento, descripcion: event.target.value});
                        }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            minDate={dayjs()}
                            sx={{marginTop: 1, marginBottom: "4px"}}
                            label="Fecha del evento"
                            value={evento.fecha}
                            onChange={(newValue) => {
                                setEvento({...evento, fecha: newValue})
                            }}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            sx={{marginTop: 1, marginBottom: "4px"}}
                            label="Hora del evento"
                            value={evento.hora}
                            onChange={(newValue) => {
                                setEvento({...evento, hora: newValue})
                            }}
                        />
                    </LocalizationProvider>
                </Stack>
                <Stack sx={{width: {xs: 300, md: 400}, maxWidth: '100%'}}>
                    <input className={"input"} ref={placeAutoCompleteRef} placeholder={evento.ubicacion ? eventoFetch.ubicacion.split('/')[0] : "Busca una ubicación"}/>
                    {isLoaded ?
                        <div style={{height: "400px"}} ref={mapRef}/>
                        : <p>Cargando...</p>
                    }
                </Stack>
            </Stack>
            <Stack sx={{
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: 2,
                marginBottom: 2
            }}>
                {editable ? (
                    <Stack direction="row" spacing={1} sx={{
                        width: {xs: 350, md: 500},
                        maxWidth: '100%',
                        justifyContent: "space-evenly",
                        alignItems: "center"
                    }}>
                        <Button
                            variant="contained"
                            onClick={handleUpdateEvent}
                        >
                            Editar Evento
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleClickOpenDelete}
                            color={"error"}
                        >
                            Eliminar Evento
                        </Button>
                    </Stack>
                ) : (
                    <Stack sx={{width: {xs: 300, md: 400}, maxWidth: '100%'}}>
                        <Button
                            variant="contained"
                            onClick={handleCreateEvent}
                        >
                            Crear Evento
                        </Button>
                    </Stack>
                )}
            </Stack>

            <Dialog
                fullScreen={fullScreen}
                open={deleteOpen}
                onClose={handleCloseDelete}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {`Eliminar el evento ${evento.titulo}`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Confirmas que quieres eliminar el evento {evento.titulo}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseDelete}>
                        Cancelar
                    </Button>
                    <Button onClick={handleDeleteEvent} autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
}

export default EventoEditable;
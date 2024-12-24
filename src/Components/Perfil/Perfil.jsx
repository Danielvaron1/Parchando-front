import {useUserContext} from "../../Context/UserContext";
import {Autocomplete, Stack, styled, TextField} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {deepPurple} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import Typography from "@mui/material/Typography";
import UploadIcon from '@mui/icons-material/Upload';
import Button from "@mui/material/Button";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useState} from "react";
import {Bounce, toast} from "react-toastify";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const intereses = [
    "Viajar", "Musica", "Bicicleta", "Cine", "Museos",
    "Restaurantes", "Parques", "Senderismo", "Motociclismo", "Pintar",
    "Leer", "Deportes", "Gatos", "Perros", "Bailar", "Vitrinear"
];

const ciudades = [
    "Bogotá", "Medellín", "Cartagena", "Santa Marta", "Villavicencio",
    "San Gil", "Barranquilla", "Tunja", "Manizales", "Pereira",
    "Neiva", "Armenia", "Cali", "Ibague", "Bucaramanga", "Valledupar"
];

let interesesCont = []

const today = new Date(); // Fecha actual
const eighteenYearsAgo = new Date(today); // Crea una nueva instancia de Date basada en la fecha actual
eighteenYearsAgo.setFullYear(today.getFullYear() - 18);


const Perfil = () => {
    const {userData, setUserData} = useUserContext();
    const [user, setUser] = useState({...userData, fechaNacimiento:  userData.fechaNacimiento ? dayjs(userData.fechaNacimiento) : null});
    const [errors, setErrors] = useState( {
        name: false,
        email: false,
        date: false,
        phone: false,
        password: false,
        description: false,
        city: false,
        interests: false
    });

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });


    const validateForm = () => {
        const err ={
            name: false,
            email: false,
            date: false,
            phone: false,
            password: false,
            description: false,
            city: false,
            interests: false
        };

        if (user.nombre.trim() === '') {
            err.name=true;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(user.correo)) {
            err.email=true;
        }

        if(user.fechaNacimiento==null){
            err.date = true;
        } else{
            const dateOfBirth = new Date(user.fechaNacimiento);
            const today = new Date();
            const age = parseInt((today - dateOfBirth)/365/24/60/60/1000)
            if (age < 18) {
                err.date = true;
            }
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(user.telefono)) {
            err.phone = true;
        }

        if (user.descripcion.trim() === '') {
            err.description = true;
        }

        if (user.ciudad == null || user.ciudad === '') {
            err.city = true;
        }

        if (user.intereses.length===0) {
            err.interests = true;
        }

        setErrors(err);

        if (Object.values(err).some(error => error === true)) {
            toast.error('Cambios inválidos', {
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
            setUserData({...user, fechaNacimiento: dayjs(user.fechaNacimiento).format('YYYY-MM-DD')});
            toast.success('Usuario actualizado', {
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
    };

    function setUserInterests(value) {
        if (value.length === 3) {
            interesesCont = intereses;
            setUser({...user, intereses: value});
        } else {
            interesesCont = [];
            setUser({...user, intereses: value});
        }
    }

    return (
        <Stack>
            <Stack direction="row" sx={{
                justifyContent: "center",
                alignItems: "center",
            }}>
                <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    onClick={() => document.getElementById('profile-image-input').click()}
                    color="inherit"
                >
                    <Avatar
                        sx={{width: {xs: 100, md: 150}, height: {xs: 100, md: 150}, bgcolor: deepPurple[400]}}
                        alt={userData.nombre}
                        src="https://raw.githubusercontent.com/mdn/learning-area/master/html/multimedia-and-embedding/images-in-html/dinosaur_small.jpg"
                    >
                        <Typography sx={{
                            fontSize: {xs: '2rem', md: '3rem'}
                        }}>
                            A
                            {/*{userData.nombre.charAt(0).toUpperCase()}*/}
                        </Typography>
                    </Avatar>
                </IconButton>
                <Stack sx={{marginLeft: 2}}>
                    <Typography color={"textPrimary"} sx={{
                        fontSize: {xs: '2rem'}
                    }}>
                        {userData.nombre}
                    </Typography>
                    <Stack direction="row" sx={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<UploadIcon/>}
                        >
                            Subir foto
                            <VisuallyHiddenInput
                                id="profile-image-input"
                                type="file"
                                onChange={(event) => console.log(event.target.files)}
                                multiple
                            />
                        </Button>
                        <Button
                            sx={{marginLeft: 2}}
                            variant="contained"
                            color="error"
                        >
                            <DeleteForeverIcon/>
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
            <Stack direction={{xs: 'column', sm: 'row'}}
                   spacing={0}
                   sx={{
                       justifyContent: "space-evenly",
                       alignItems: "center",
                   }}>
                <Stack sx={{width: {xs: 300, md: 400}, maxWidth: '100%'}}>
                    <TextField id="nombre" error={errors.name} label="Nombre" margin="dense" value={user.nombre}
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                   setUser({...user, nombre: event.target.value});
                               }}/>
                    <TextField id="correo" error={errors.email} type={"email"} label="Correo" margin="dense" value={user.correo}
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                   setUser({...user, correo: event.target.value});
                               }}/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            maxDate={dayjs(eighteenYearsAgo)}
                            sx={{marginTop: 1, marginBottom: "4px"}}
                            slotProps={{
                                textField: {
                                    focused: errors.date,
                                    color: 'error',
                                },
                            }}
                            label="Fecha de nacimiento"
                            referenceDate={dayjs('2022-04-17')}
                            value={user.fechaNacimiento}
                            onChange={(newValue) => {
                                setUser( {...user, fechaNacimiento:newValue})
                            }}
                        />
                    </LocalizationProvider>

                </Stack>
                <Stack sx={{width: {xs: 300, md: 400}, maxWidth: '100%'}}>
                    <TextField id="outlined-basic" error={errors.phone} type={"tel"} label="Telefono" margin="dense" value={user.telefono}
                               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                   setUser({...user, telefono: event.target.value});
                               }}/>
                    <Autocomplete
                        disablePortal
                        options={ciudades}
                        value={user.ciudad}
                        onChange={(event, newValue) => {
                            setUser({...user, ciudad: newValue});
                        }}
                        renderInput={(params) => <TextField {...params} error={errors.city} margin="dense" label="Ciudad"/>}
                    />
                    <Autocomplete
                        multiple
                        limitTags={2}
                        id="tags-outlined"
                        options={intereses}
                        filterSelectedOptions
                        value={user.intereses}
                        onChange={(event, value) => {
                            setUserInterests(value);
                        }}
                        getOptionDisabled={(option) =>
                            interesesCont.includes(option)
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Intereses"
                                margin="dense"
                                error={errors.interests}
                            />
                        )}
                    />
                </Stack>
            </Stack>
            <Stack sx={{
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Stack sx={{width: {xs: 300, sm: 600, md: 800}, maxWidth: '100%'}}>

                    <TextField
                        error={errors.description}
                        margin="dense"
                        id="outlined-multiline-static"
                        label="Descripción"
                        multiline
                        rows={2}
                        value={user.descripcion}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setUser({...user, descripcion: event.target.value});
                        }}
                    />
                </Stack>
            </Stack>
            <Stack direction={{xs: 'column', sm: 'row'}}
                   spacing={0}
                   sx={{
                       justifyContent: "space-evenly",
                       alignItems: "center",
                       marginTop: 2
                   }}>
                <Stack sx={{width: {xs: 300, md: 400}, maxWidth: '100%'}}>
                    <Button
                        variant="contained"
                        onClick={validateForm}
                    >
                        Guardar Cambios
                    </Button>
                </Stack>
                <Stack sx={{width: {xs: 300, md: 400}, marginTop: {xs: 2, sm: 0}, maxWidth: '100%'}}>
                    <Button
                        variant="outlined"
                    >
                        Cambiar Contraseña
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    )
        ;
}

export default Perfil;
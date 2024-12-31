import React from 'react';
import Avatar from "@mui/material/Avatar";
import {deepPurple} from "@mui/material/colors";
import Button from "@mui/material/Button";
import {
    Chip,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Stack,
    ListItemIcon,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import {Link} from 'react-router-dom';
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {acceptAmigos, createAmigos, createNotificacion, deleteAmigos} from "../../Api/UsuariosApi";
import {Bounce, toast} from "react-toastify";
import {useUserContext} from "../../Context/UserContext";

const UserCard = ({user, currentUserInterest, handleClick, anchorEl, handleClose, handleClickOpenDelete}) => {
    const {userData, token} = useUserContext();
    const handleCancelSol = () => {
        deleteAmigos(userData.id, user.id, token)
            .then(() => {
                toast.success('Solicitud cancelada', {
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
            })
    };

    function handleAddAmigo() {
        createAmigos(userData.id, user.id, token)
            .then(() => {
                toast.success('Solicitud enviada', {
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
                createNotificacion({usuarioId:user.id,tipoId:userData.id,tipo:"solicitud",nombre:userData.nombre},token);
            })
    }

    function handleAceptarSolicitud() {
        acceptAmigos(userData.id, user.id, token)
            .then(() => {
                toast.success('Solicitud Aceptada', {
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
                createNotificacion({usuarioId:user.id,tipoId:userData.id,tipo:"amistad",nombre:userData.nombre},token);
            });
    }

    return (
        <Card sx={{maxWidth: 345}}>
            <CardHeader
                avatar={
                    <Avatar alt={user.nombre} sx={{bgcolor: deepPurple[400]}} aria-label="recipe"
                            src="https://raw.githubusercontent.com/mdn/learning-area/master/html/multimedia-and-embedding/images-in-html/dinosaur_small.jp">
                        {user.nombre.charAt(0).toUpperCase()}
                    </Avatar>
                }
                action={
                    user.amigo === "aceptado" ? (
                        <IconButton aria-label="settings" onClick={(event) => handleClick(event, user)}>
                            <MoreVertIcon/>
                        </IconButton>
                    ) : null
                }
                title={user.nombre}
                subheader={user.ciudad}
                sx={{paddingBottom: 0}}
            />
            <CardContent sx={{paddingTop: 1, paddingBottom: 1}}>
                <Stack direction="row" spacing={1}>
                    {user.intereses.map((interest) => {
                        const isInterestMatched = currentUserInterest.includes(interest);
                        return (
                            <Chip
                                key={interest}
                                label={interest}
                                size="small"
                                sx={{
                                    bgcolor: isInterestMatched ? deepPurple[400] : "default",
                                    color: isInterestMatched ? "white" : "inherit"
                                }}
                            />
                        );
                    })}
                </Stack>
            </CardContent>
            <CardActions>
                <Stack direction="row" sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <Link to={`/Perfil?id=${user.id}`} style={{textDecoration: 'none'}}>
                        <Button
                            sx={{marginLeft: 2}}
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<PersonIcon/>}
                        >
                            Ver Perfil
                        </Button>
                    </Link>
                    {
                        user.amigo === "aceptado" ? (
                            <Button
                                sx={{marginLeft: 2}}
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<ChatIcon/>}
                            >
                                Mensaje
                            </Button>
                        ) : user.amigo === "pendiente" ? (
                            <Button
                                sx={{marginLeft: 2}}
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                color="error"
                                startIcon={<PersonRemoveIcon/>}
                                onClick={handleCancelSol}
                            >
                                Cancelar
                            </Button>
                        ) : user.amigo === "solicitud" ? (
                            <Button
                                sx={{marginLeft: 2}}
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<PersonAddIcon/>}
                                onClick={handleAceptarSolicitud}
                            >
                                Aceptar
                            </Button>
                        ) : (
                            <Button
                                sx={{marginLeft: 2}}
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<PersonAddIcon/>}
                                onClick={handleAddAmigo}
                            >
                                Añadir
                            </Button>
                        )
                    }
                </Stack>
            </CardActions>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleClickOpenDelete}>
                    <ListItemIcon>
                        <PersonRemoveIcon fontSize="small"/>
                    </ListItemIcon>
                    Eliminar amigo
                </MenuItem>
            </Menu>
        </Card>
    );
};

export default UserCard;
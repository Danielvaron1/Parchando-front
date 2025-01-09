import {Divider, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Stack} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import * as React from 'react';
import {deepPurple} from "@mui/material/colors";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {getConversaciones} from "../../Api/UsuariosApi";
import {useUserContext} from "../../Context/UserContext";
import Typography from "@mui/material/Typography";



const MensajesIndex = () => {
    const {userData,token} = useUserContext();
    const [conversaciones, setConversaciones] = React.useState([]);

    useEffect(() => {
        getUsuarioConversaciones();
    }, []);

    async function getUsuarioConversaciones() {
        const conv = await getConversaciones(userData.id, token);
        setConversaciones(conv);
    }

    return (
        <Stack>
            <div className="scrollable" style={{flexGrow: 1, overflowY: "auto", padding: 16, height: "90vh"}}>
                {conversaciones.length === 0 ? (
                    <Typography variant="h6" color="textSecondary" align="center">
                        No tienes mensajes
                    </Typography>
                ) : (
                    conversaciones.map((conversacion, index) => (
                        <div key={index}>
                            <ListItem alignItems="flex-start" to={`/Chat/${conversacion.id}`} component={Link} button>
                                <ListItemAvatar>
                                    <Avatar alt={conversacion.usuario2.nombre} sx={{ bgcolor: deepPurple[400] }} aria-label="recipe"
                                            src={conversacion.usuario2.fotos}>
                                        {conversacion.usuario2.nombre.charAt(0).toUpperCase()}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={conversacion.usuario2.nombre}
                                    secondary={
                                        <Typography variant="body2" sx={{
                                            color: 'text.secondary',
                                            display: '-webkit-box',
                                            overflow: 'hidden',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 1,
                                            height: '1.2em',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {" ~ " + conversacion.ultimoMensaje}
                                        </Typography>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <Typography variant={"caption"} color={"textSecondary"}>{conversacion.fecha}</Typography>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider variant="middle" />
                        </div>
                    ))
                )}


            </div>
        </Stack>
    );
}

export default MensajesIndex;
import {Divider, Stack, TextField} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import * as React from 'react';
import {deepPurple} from "@mui/material/colors";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {useUserContext} from "../../Context/UserContext";
import IconButton from "@mui/material/IconButton";
import SendIcon from '@mui/icons-material/Send';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getComentarios, postComentario} from "../../Api/EventosApi";
import dayjs from "dayjs";
import {createNotificacion} from "../../Api/UsuariosApi";

const Comentarios = ({maxHeight, eventoId, eventoTitulo, asistencias}) => {
    const navigate = useNavigate();
    const {userData,token} = useUserContext();
    const [messages, setMessages] = React.useState([]);
    const [inputValue, setInputValue] = React.useState("");
    const [refresh, setRefresh] = React.useState(false);


    const handleSendMessage = async () => {
        if (inputValue.trim() !== "") {
            const newMessage = {
                usuarioId: userData.id,
                comentario: inputValue,
                usuarioNombre: userData.nombre
            };
            await postComentario(eventoId, newMessage);
            asistencias.forEach(async (asistente) => {
                await createNotificacion({
                    usuarioId: asistente.usuario.id,
                    tipoId: eventoId,
                    tipo: "comentario",
                    nombre: eventoTitulo
                }, token);
            });
            setRefresh(true);
            setInputValue("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                e.preventDefault();
                setInputValue(prev => prev + "\n");
            } else {
                e.preventDefault();
                handleSendMessage();
            }
        }
    };

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const comentarios = await getComentarios(eventoId);
                setMessages(comentarios);
                setRefresh(false);
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        };
        if (eventoId != null) {
            fetchEventData();
        }
    }, [eventoId,refresh])

    return (
        <Stack sx={{flexGrow: 1, display: "flex", flexDirection: "column"}}>
            <Stack sx={{justifyContent: "center", alignItems: "center", display: 'flex', flexDirection: "flex"}}
                   position="static">
                <Typography variant="h6" sx={{
                    color: 'black'
                }}>Comentarios</Typography>
                <Stack direction="row" spacing={1} sx={{marginBottom: 1, marginLeft: 1, width: '100%'}}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={inputValue}
                        multiline
                        size="small"
                        maxRows={2}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Escribe un comentario..."
                    />
                    <IconButton
                        size="medium"
                        aria-label="show 17 new notifications"
                        onClick={handleSendMessage}
                    >
                        <SendIcon sx={{color: deepPurple[400]}}/>
                    </IconButton>
                </Stack>
            </Stack>
            <div className="scrollable"
                 style={{flexGrow: 1, overflowY: "auto", padding: 16, minHeight: "200px", maxHeight: maxHeight}}>
                {messages.length === 0 ? (
                    <Stack sx={{justifyContent: "center", alignItems: "center"}}>
                        <Typography variant="caption" color={"textPrimary"}>
                            Aun no hay comentarios
                        </Typography>
                    </Stack>
                ) : (
                    messages.map((message) => (
                        <Card key={message.id} sx={{
                            marginBottom: 1,
                            display: 'flex',
                            flexDirection: 'row-reverse'
                        }}>
                            <Stack sx={{
                                flexGrow: 1,
                                padding: 1
                            }}>
                                <Typography variant="caption" color={"textPrimary"}>
                                    {"~" + message.usuarioNombre}
                                </Typography>
                                <Typography variant="body2" color={"textPrimary"}>
                                    {message.comentario.split('\n').map((line, index) => (
                                        <React.Fragment key={index}>
                                            {line}
                                            {index < message.comentario.split('\n').length - 1 && <br/>}
                                        </React.Fragment>
                                    ))}
                                </Typography>
                                <Typography variant="caption"
                                            color="textSecondary">{ dayjs(message.fecha).format('YYYY-MM-DD h:mm A')}</Typography>
                            </Stack>
                            <Avatar alt={message.usuarioNombre} sx={{
                                bgcolor: deepPurple[400],
                                marginLeft: 1,
                                marginRight: 0,
                                marginTop: 1,
                                cursor: "pointer"
                            }} onClick={() => {
                                navigate("/Perfil?id=" + message.usuarioId)
                            }} src={message.usuarioNombre}>
                                {message.usuarioNombre.charAt(0).toUpperCase()}
                            </Avatar>

                        </Card>
                    )))}
            </div>
            <Divider/>

        </Stack>
    );
}

export default Comentarios;
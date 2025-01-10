import {Divider, Paper, Stack, TextField} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import * as React from 'react';
import {deepPurple} from "@mui/material/colors";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import './Chat.css';
import {useUserContext} from "../../Context/UserContext";
import IconButton from "@mui/material/IconButton";
import SendIcon from '@mui/icons-material/Send';
import {io} from "socket.io-client";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {getConversacionId, updateConversacion} from "../../Api/UsuariosApi";
import CircularProgress from '@mui/material/CircularProgress';

const Chat = () => {
    const {id} = useParams();
    const {userData, token} = useUserContext();
    const [messages, setMessages] = React.useState([]);
    const [inputValue, setInputValue] = React.useState("");
    const messagesEndRef = React.useRef(null);
    const [conversacion, setConversacion] = React.useState(null);
    const socketRef = React.useRef(null);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();
    const urlApi = process.env.REACT_APP_MESSAGE_API;

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: "smooth"});
        }
    };


    useEffect(() => {
        socketRef.current = io.connect(urlApi);

        const initChat = async () => {
            const conversacionFetch = await getConversacionId({id: id}, token);
            setConversacion(conversacionFetch);
            socketRef.current.emit("join_room", conversacionFetch.nombre);
            socketRef.current.emit("get_messages", conversacionFetch.nombre);
        };

        initChat();

        socketRef.current.on("receive_message", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        socketRef.current.on("load_messages", (loadedMessages) => {
            setMessages(loadedMessages);
        });

        setLoading(false);

        return () => {
            socketRef.current.off("receive_message");
            socketRef.current.off("load_messages");
            socketRef.current.disconnect();
        };
    }, [id, token]);

    useEffect(() => {
        if (conversacion && userData) {
            if (userData.id !== conversacion.usuario1.id && userData.id !== conversacion.usuario2.id) {
                navigate("/");
            }
        }
    }, [conversacion, userData, navigate]);

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (inputValue.trim() !== "") {
            const newMessage = {
                mensaje: inputValue,
                room: conversacion.nombre,
                de: userData.id,
                hora: new Date(Date.now()),
            };
            socketRef.current.emit("send_message", newMessage);
            await updateConversacion({id: conversacion.id, mensaje: inputValue}, token);
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    return (
        <Stack sx={{pb: 7, height: "100%", display: "flex", flexDirection: "column"}}>
            {loading || conversacion===null? (
                <CircularProgress color="secondary"/>
            ) : (<Stack>
                    <Stack sx={{
                        backgroundColor: deepPurple[500],
                        padding: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        display: 'flex',
                        flexDirection: "row"
                    }} position="static" component={Link} to={`/Perfil?id=${conversacion.usuario2.id}`}>
                        <Avatar
                            sx={{bgcolor: deepPurple[400], width: 30, height: 30, marginRight: 1}}
                            alt={conversacion.usuario2.nombre}
                            src={conversacion.usuario2.fotos}
                        >
                            {conversacion.usuario2.nombre.charAt(0)}
                        </Avatar>
                        <Typography variant="subtitle1" sx={{
                            color: 'white'
                        }}>{conversacion.usuario2.nombre}</Typography>
                    </Stack>
                    <div className="scrollable" style={{flexGrow: 1, overflowY: "auto", padding: 16, height: "75vh"}}>
                        {messages.length === 0 ? (
                            <Typography variant="body1" color="textSecondary" align="center" sx={{ marginTop: 2 }}>
                                No hay mensajes en esta conversación.
                            </Typography>
                        ) : (
                            messages.map((message) => (
                                <Card key={message.id} sx={{
                                    marginBottom: 1,
                                    display: 'flex',
                                    flexDirection: userData.id === message.de ? 'row' : 'row-reverse'
                                }}>
                                    <Stack sx={{
                                        flexGrow: 1,
                                        textAlign: userData.id === message.de ? 'right' : 'left',
                                        padding: 1
                                    }}>
                                        <Typography variant="body2" color={"textPrimary"}>
                                            {message.mensaje.split('\n').map((line, index) => (
                                                <React.Fragment key={index}>
                                                    {line}
                                                    {index < message.mensaje.split('\n').length - 1 && <br />}
                                                </React.Fragment>
                                            ))}
                                        </Typography>
                                        <Typography variant="caption"
                                                    color="textSecondary">{formatDate(message.hora)}</Typography>
                                    </Stack>
                                    <Avatar alt={message.de} sx={{
                                        bgcolor: deepPurple[400],
                                        marginLeft: userData.id === message.de ? 0 : 1,
                                        marginRight: userData.id === message.de ? 1 : 0,
                                        marginTop: 1
                                    }} src={userData.id === message.de ? conversacion.usuario1.fotos : conversacion.usuario2.fotos}>
                                        {userData.id === message.de ? conversacion.usuario1.nombre.charAt(0) : conversacion.usuario2.nombre.charAt(0)}
                                    </Avatar>
                                </Card>
                            ))
                        )}
                        <div ref={messagesEndRef}/>
                    </div>
                    <Divider/>
                    <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
                        <Stack direction="row" spacing={1} sx={{padding: 1}}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={inputValue}
                                multiline
                                size="small"
                                maxRows={2}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Escribe un mensaje..."
                            />
                            <IconButton
                                size="medium"
                                aria-label="show 17 new notifications"
                                onClick={handleSendMessage}
                            >
                                <SendIcon sx={{color: deepPurple[400]}}/>
                            </IconButton>
                        </Stack>
                    </Paper>
                </Stack>
            )}
        </Stack>
    );
}

export default Chat;
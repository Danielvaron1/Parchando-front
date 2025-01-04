import { Divider, Paper, Stack, TextField} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import * as React from 'react';
import {deepPurple} from "@mui/material/colors";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import './Chat.css';
import {useUserContext} from "../../Context/UserContext";
import IconButton from "@mui/material/IconButton";
import SendIcon from '@mui/icons-material/Send';
const Chat = () => {
    const {userData} = useUserContext();
    const [messages, setMessages] = React.useState([
        {id: 1, text: "Hola, ¿cómo estás?", user: {name: "DUser 1", avatar: "https://example.com/avatar1.jpg"}},
        {
            id: 2,
            text: "Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final.\nAunque no posee actualmente fuentes para justificar sus hipótesis, el profesor de filología clásica Richard McClintock asegura que su uso se remonta a los impresores de comienzos del siglo XVI.1​ Su uso en algunos editores de texto muy conocidos en la actualidad ha dado al texto lorem ipsum nueva popularidad.",
            user: {name: "da", avatar: "https://example.com/avatar2.jpg"}
        },

    ]);
    const [inputValue, setInputValue] = React.useState("");
    const messagesEndRef = React.useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: "smooth"});
        }
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (inputValue.trim() !== "") {
            const newMessage = {
                id: messages.length + 1,
                text: inputValue,
                user: {name: "You", avatar: "https://example.com/your-avatar.jpg"}
            };
            setMessages([...messages, newMessage]);
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

    return (
        <Stack sx={{pb: 7, height: "100%", display: "flex", flexDirection: "column"}}>
            <Stack sx={{backgroundColor: deepPurple[500], padding: 1, justifyContent:"center" ,alignItems:"center",display: 'flex', flexDirection:"row" }} position="static">
                    <Avatar
                        sx={{bgcolor: deepPurple[400], width: 30, height: 30, marginRight:1}}
                        alt={userData.nombre}
                        src={userData.fotos}
                    >
                        {userData.nombre.charAt(0)}
                    </Avatar>
                <Typography variant="subtitle1" sx={{
                    color: 'white'
                }}>Chat</Typography>
            </Stack>
            <div className="scrollable" style={{flexGrow: 1, overflowY: "auto", padding: 16, height: "75vh"}}>
                {messages.map((message) => (
                    <Card key={message.id} sx={{
                        marginBottom: 1,
                        display: 'flex',
                        flexDirection: userData.nombre === message.user.name ? 'row' : 'row-reverse'
                    }}>
                        <Stack sx={{
                            flexGrow: 1,
                            textAlign: userData.nombre === message.user.name ? 'right' : 'left',
                            padding: 1
                        }}>
                            <Typography variant="body2" color={"textPrimary"}>
                                {message.text.split('\n').map((line, index ) => (
                                <React.Fragment key={index}>
                                    {line}
                                    {index < message.text.split('\n').length - 1 && <br />}
                                </React.Fragment>
                                ))}
                            </Typography>
                            <Typography variant="caption"
                                        color="textSecondary">{new Date().toLocaleString()}</Typography>
                        </Stack>
                        <Avatar alt={message.user.name} sx={{
                            bgcolor: deepPurple[400],
                            marginLeft: userData.nombre === message.user.name ? 0 : 1,
                            marginRight: userData.nombre === message.user.name ? 1 : 0,
                            marginTop: 1
                        }} src={message.user.avatar}>
                            {message.user.name.charAt(0).toUpperCase()}
                        </Avatar>

                    </Card>
                ))}
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
                            <SendIcon sx={{ color: deepPurple[400] }}/>
                    </IconButton>
                </Stack>
            </Paper>

        </Stack>
    );
}

export default Chat;
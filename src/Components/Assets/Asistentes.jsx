import {Chip, Divider,  Stack} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import * as React from 'react';
import {deepPurple} from "@mui/material/colors";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {useUserContext} from "../../Context/UserContext";
import {Link} from "react-router-dom";

const Asistentes = ({maxHeight}) => {
    const {userData} = useUserContext();
    const currentUserInterest = userData.intereses;
    const [asistentes] = React.useState([
        {
            id: 1,
            name: 'Daniel Alejandro Varón Rojas',
            description: 'Descripción para usuario nuevo Describiendo sus pasatiempos.',
            city: 'Bogotá',
            interests: ["Restaurantes", "Motociclismo", "Senderismo"],
            amigo: true
        },
        {
            id: 2,
            name: 'Pepito Perez',
            description: 'Descripción para usuario nuevo Describiendo sus pasatiempos.',
            city: 'Bogotá',
            interests: ["Restaurantes", "Motociclismo", "Senderismo"],
            amigo: true
        },
        {
            id: 3,
            name: 'Donatelo Angelo',
            description: 'Descripción para usuario nuevo Describiendo sus pasatiempos.',
            city: 'Bogotá',
            interests: ["Restaurantes", "Motociclismo", "Senderismo"],
            amigo: false
        }

    ]);

    return (
        <Stack sx={{flexGrow: 1, display: "flex", flexDirection: "column"}}>
            <Stack sx={{justifyContent: "center", alignItems: "center", display: 'flex', flexDirection: "flex"}}
                   position="static">
                <Typography variant="h6" sx={{
                    color: 'black'
                }}>Asistentes</Typography>
            </Stack>
            <div className="scrollable"
                 style={{flexGrow: 1, overflowY: "auto", padding: 16, minHeight: "200px", maxHeight: maxHeight}}>
                {asistentes.map((asistente) => (
                    <Link to={`/Perfil?${asistente.id}`}>
                        <Card key={asistente.id} sx={{
                            marginBottom: 1,
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <Avatar alt={asistentes.name} sx={{
                                bgcolor: deepPurple[400],
                                marginLeft: asistentes.name === asistente.name ? 0 : 1,
                                marginRight: asistentes.name === asistente.name ? 1 : 0,
                                marginTop: 1
                            }} src={asistente.avatar}>
                                {asistente.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <Stack sx={{
                                flexGrow: 1,
                                padding: 1
                            }}>
                                <Typography variant="body2" color={"textPrimary"}>
                                    {asistente.name}
                                </Typography>
                                <Stack direction="row" spacing={1} sx={{display: {xs: 'none', sm: 'flex'}}}>
                                    {asistente.interests.map((interest) => {
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
                            </Stack>
                        </Card>
                    </Link>
                ))}
            </div>
            <Divider/>

        </Stack>
    );
}

export default Asistentes;
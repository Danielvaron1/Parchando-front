import {Chip, Divider,  Stack} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import * as React from 'react';
import {deepPurple} from "@mui/material/colors";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {useUserContext} from "../../Context/UserContext";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {getAsistencias} from "../../Api/EventosApi";

const Asistentes = ({maxHeight, eventoId, asistencias}) => {
    const {userData} = useUserContext();
    const currentUserInterest = userData.intereses;
    const [asistentes,setAsistentes] = React.useState([]);

    useEffect(() => {
        setAsistentes(asistencias);
    }, [asistencias])

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
                {asistentes.length === 0 ? (
                    <Stack sx={{justifyContent: "center", alignItems: "center"}}>
                        <Typography variant="caption" color={"textPrimary"}>
                            Aun no hay asistentes
                        </Typography>
                    </Stack>
                ):(
                    asistentes.map((asistente) => (
                    <Link to={`/Perfil?id=${asistente.usuario.id}`} key={asistente.usuario.id}>
                        <Card key={asistente.usuario.id} sx={{
                            marginBottom: 1,
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <Avatar alt={asistente.usuario.nombre} sx={{
                                bgcolor: deepPurple[400],
                                marginLeft: 1,
                                marginTop: 1
                            }} src={asistente.usuario.fotos}>
                                {asistente.usuario.nombre.charAt(0).toUpperCase()}
                            </Avatar>
                            <Stack sx={{
                                flexGrow: 1,
                                padding: 1
                            }}>
                                <Typography variant="body2" color={"textPrimary"}>
                                    {asistente.usuario.nombre}
                                </Typography>
                                <Stack direction="row" spacing={1} >
                                    {asistente.usuario.intereses.map((interest) => {
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
                )))}
            </div>
            <Divider/>

        </Stack>
    );
}

export default Asistentes;
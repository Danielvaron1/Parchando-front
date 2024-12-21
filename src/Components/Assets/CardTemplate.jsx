import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Stack} from "@mui/material";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {useState} from "react";
import InfoIcon from '@mui/icons-material/Info';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';



export default function CardTemplate() {
    const [user] = useState(
        {
            name: 'Donatelo Angelo',
            description: 'Descripción para usuario nuevo Describiendo sus pasatiempos.',
            city: 'Bogotá',
            interests: ["Restaurantes", "Motociclismo", "Senderismo"],
            amigo: false
        });

    return (
        <Stack direction="row" spacing={2} sx={{justifyContent: "center", marginTop: '15px' , marginLeft: '15px', flexWrap: 'wrap' }} useFlexGap>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title="Event Name"
                    subheader="September 14, 2016 12:00"
                />
                <CardMedia>
                    <iframe id="iframeid"
                            style={{border:0}}
                            src="https://www.google.com/maps/embed?api=1&origin=Space+Needle+Seattle+WA&destination=Pike+Place+Market+Seattle+WA&travelmode=bicycling"
                    ></iframe>
                </CardMedia>
                <CardContent>
                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        Descripción del plan, This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Stack direction="row" sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <Link to={`/Evento?name=${user.name}`} style={{textDecoration: 'none'}}>
                            <Button
                                sx={{marginLeft: 2}}
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<InfoIcon/>}
                            >
                                Detalles
                            </Button>
                        </Link>
                        {
                            user.amigo ? (
                                    <Button
                                        sx={{marginLeft: 2}}
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        color="error"
                                        startIcon={<EventBusyIcon/>}
                                    >
                                        No Asistire
                                    </Button>
                                ) :
                                <Button
                                    sx={{marginLeft: 2}}
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<EventAvailableIcon/>}
                                >
                                    Asistire
                                </Button>
                        }
                    </Stack>
                </CardActions>
            </Card>
        </Stack>
    );
}

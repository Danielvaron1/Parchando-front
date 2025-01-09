import {Paper, Stack, useMediaQuery, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import "./About.css"
import Grid from '@mui/material/Grid2';
import Button from "@mui/material/Button";
import * as React from "react";
import {deepPurple} from "@mui/material/colors";
import {Link} from "react-router-dom";

const itemData = [
    {
        img: 'https://media-cdn.tripadvisor.com/media/photo-s/0a/6d/65/0b/ciclovia-por-la-avenida.jpg',
        title: 'Evento',
    },
    {
        img: 'https://www.revistapancaliente.co/wp-content/uploads/2024/09/Restaurantes_acogedores_colombia.jpg',
        title: 'Evento',
    },
    {
        img: 'https://assets.turismocity.com/cdn-cgi/image/format=auto,width=500,height=440,fit=cover/img/1686672673450_fotos.png',
        title: 'Evento',
    },
    {
        img: 'https://www.portafolio.co/files/article_new_multimedia/uploads/2024/08/04/66aff3a426dfb.jpeg',
        title: 'Evento',
    },
    {
        img: 'https://estaticos.elcolombiano.com/binrepository/780x565/0c0/780d565/none/11101/RJAT/image-pguatape-41-jpg-42927648-202307300917_43379671_20230927171454.jpg',
        title: 'Evento',
    },
    {
        img: 'https://cdnwordpresstest-f0ekdgevcngegudb.z01.azurefd.net/es/wp-content/uploads/2023/02/Eventos-Medellin-1-1.jpg',
        title: 'Evento',
    }
];

const itemData2 = [
    {
        img: 'https://files.lafm.com.co/assets/public/styles/img_node_706x392/public/2018-12/1.jpg.webp?VersionId=yd.IS1V._iRfnTE4oSad6PjMhUePOI.f&itok=WUVzRace',
        title: 'Evento',
    },
    {
        img: 'https://imagenes.noticiasrcn.com/ImgNoticias/turismo_colombia.jpg',
        title: 'Evento',
    },
    {
        img: 'https://www.turismocol.com/wp-content/uploads/people-taking-part-sustainable-travel-movement-scaled.jpg',
        title: 'Evento',
    },
    {
        img: 'https://d9b6rardqz97a.cloudfront.net/blog/wp-content/uploads/2021/10/07192302/Turismo-en-colombia.jpg',
        title: 'Evento',
    },
    {
        img: 'https://www.bloomberglinea.com/resizer/v2/VO6RXP2PRFCPVHDFQKZTOJYVPQ.jpg?auth=64c35c490375108c67efcd8b12d49d1ae235ed8d14ff04fff7ab13fa8fdcd1ab&width=800&height=532&quality=80&smart=true',
        title: 'Evento',
    },
    {
        img: 'https://abcmundial.com/sites/default/files/noticias/2023/06/21/Colombia%20el%20turismo%20creci%C3%B3%20un%2029%25%20en%20el%20primer%20trimestre%20de%202023.jpg',
        title: 'Evento',
    }
];


export const AcercaDe = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Stack sx={{justifyContent: "center", alignItems: "center", marginTop:1,marginBottom:2}}>
            <Stack sx={{justifyContent: "center", alignItems: "center", textAlign: "center", width: {xs:"100%", sm:"80%"}}}>
                <Typography variant={isSmallScreen ? "h4" : "h5"} sx={{fontFamily: '"Oswald", serif',fontWeight: 'bold'}}>

                    ¿Por qué elegir una app de eventos como{" "}
                    <Typography variant={isSmallScreen ? "h4" : "h5"} component="span" sx={{fontFamily: '"Comforter Brush", cursive'}}>
                        Parchando
                    </Typography>
                    ?
                </Typography>
                <Typography variant={isSmallScreen ? "h5" : "subtitle1"}>
                    Creemos en el poder de las conexiones en la vida real. En un mundo dominado por las pantallas,
                    nuestra misión es volver a reunir a las personas, vivir la vida en el momento y crear recuerdos que
                    duren toda la vida.
                </Typography>
                <Grid container spacing={2} m={2} sx={{ marginTop: 2 }}>
                    {itemData.map((item, index) => (
                        <Grid item size={{ xs: 6, sm: 4,md: 4 }} key={index}>
                            <Paper elevation={3} sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%',objectFit: 'cover', borderRadius: '4px' }} />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                <Typography variant={isSmallScreen ? "h5" : "h6"} sx={{ fontWeight: 'bold' }}>
                    ¡Descubre las mejores experiencias sin esfuerzo con Parchando!
                </Typography>
                <Typography variant={isSmallScreen ? "h5" : "subtitle1"}>
                    Reunimos los eventos emocionantes de tu ciudad en una sola plataforma, dando acceso a crear y
                    asistir a eventos de una forma rápida y sencilla creando nuevas conexiones con la magia de los
                    momentos inesperados de la vida.
                </Typography>
                <Typography variant={isSmallScreen ? "h5" : "subtitle1"}>
                    Deja las pantallas, descubre personas que de otra manera no habrías conocido y aventúrate a conocer tu país generando una conexión más profunda con el mundo que te rodea.
                </Typography>
                <Grid container spacing={2} m={2} sx={{ marginTop: 2 }}>
                    {itemData2.map((item, index) => (
                        <Grid item size={{ xs: 6, sm: 4,md: 4 }} key={index}>
                            <Paper elevation={3} sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%',objectFit: 'cover', borderRadius: '4px' }} />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                <Typography variant={isSmallScreen ? "h5" : "h6"} sx={{ fontWeight: 'bold' }}>
                    Creemos en crear experiencias que enriquezcan tu vida, No que te distraigan de ella.
                </Typography>
                <Typography variant={isSmallScreen ? "h5" : "subtitle1"}>
                    Así que arriésgate y simplemente di:
                </Typography>
                <Button to={"/auth"} component={Link} variant="contained" sx={{ textTransform: "none" , marginTop:1, background:deepPurple[400]}}>
                    <Typography variant="h4" component="span" sx={{fontFamily: '"Comforter Brush", cursive'}}>
                        ¿Parchamos?
                    </Typography>
                </Button>
            </Stack>
        </Stack>
    );
}
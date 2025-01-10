import {Divider, Stack} from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import {deepPurple} from "@mui/material/colors";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CelebrationIcon from '@mui/icons-material/Celebration';
import PaletteIcon from '@mui/icons-material/Palette';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import ParkIcon from '@mui/icons-material/Park';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Link} from "react-router-dom";
import {useUserContext} from "../../Context/UserContext";

export const LandingPage = () => {
    const {userData} = useUserContext();

    const data = [
        {
            image: "https://arriendo.com/co/blog/wp-content/uploads/2024/01/vivir-en-el-centro-de-bogota-1400x934.jpg",
            name: "Bogotá"
        },
        {
            image: "https://www.civitatis.com/blog/wp-content/uploads/2022/09/vista-panoramica-medellin.jpg",
            name: "Medellín"
        },
        {
            image: "https://www.viajes.cl/hubfs/Torre%20del%20Reloj%20en%20Cartagena%20de%20Indias,%20Colombia.jpg",
            name: "Cartagena"
        },
        {
            image: "https://www.semana.com/resizer/v2/MCPCCV7Z7JFGFP2WGZB5ZVNYZ4.jpg?auth=d5366bbb7b839085c3bcf76f7e89215330259309ff30495441bfc5befcea4d09&smart=true&quality=75&width=1280&fitfill=false",
            name: "Santa Marta"
        },
        {
            image: "https://periodicodelmeta.com/wp-content/uploads/2022/09/WhatsApp-Image-2022-09-13-at-12.15.44-PM.jpeg",
            name: "Villavicencio"
        },
        {
            image: "https://guiaturisticadesantander.com/wp-content/uploads/2019/09/san-gil-guia-turismo-santander-18.jpg",
            name: "San Gil"
        },
        {
            image: "https://ul.edu.co/uleduco/cache/mod_roksprocket/caba858bd232dc141cde641e6d15b438_350_500.jpg",
            name: "Barranquilla"
        },
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Centro_de_Tunja_en_un_d%C3%ADa_lluvioso.jpg",
            name: "Tunja"
        },
        {
            image: "https://www.hotelbenidorm.co/assets/cache/uploads//blog/manizales/751x422/catedral-basilica-metropolitana-nuestra-senora-rosario-manizales-hotel-benidorm.webp?from=jpeg",
            name: "Manizales"
        },
        {
            image: "https://www.semana.com/resizer/FMwD006VZT9DmxOhvLb_aIDHats=/arc-anglerfish-arc2-prod-semana/public/NJLMN3XLA5AE5K3MIMZWJ6L7MU.png",
            name: "Pereira"
        },
        {
            image: "https://media.viajando.travel/p/eb00b1868eccfc10bc3767bc10c0a747/adjuntos/236/imagenes/000/640/0000640627/1200x675/smart/neiva-colombiajpg.jpg",
            name: "Neiva"
        },
        {
            image: "https://colombiatours.travel/wp-content/uploads/2023/10/image-48.png",
            name: "Armenia"
        },
        {
            image: "https://www.semana.com/resizer/v2/5DVGZ2YGIJBCLA5QMD7DCKWLHI.jpg?auth=a1c257dfb2110b9982e1dc5f5dabf39d4be0b843ec48c01697e329337982a492&smart=true&quality=75&width=1280&height=720",
            name: "Cali"
        },
        {
            image: "https://colombia.travel/sites/default/files/shutterstock_1280554819.jpg",
            name: "Ibague"
        },
        {
            image: "https://www.semana.com/resizer/v2/BEBK2OBCFJD2TB2BQSHJT2FU6M.jpg?auth=a6db22689536e25f9e17d02069ecbeb4b8dde17b3a75aa755707271f61f49ebe&smart=true&quality=75&width=1280",
            name: "Bucaramanga"
        },
        {
            image: "https://valledupar-cesar.gov.co/PublishingImages/VALLEDUPAR.jpeg",
            name: "Valledupar"
        }
    ];

    return (
        <Stack>
            <Grid container spacing={2} direction="row"
                  sx={{justifyContent: 'center', alignItems: 'center', marginTop: 2}}>
                <Grid size={{xs: 11, md: 6}}>
                    <Stack>
                        <Typography variant="h3" sx={{
                            fontSize: {xs: '1.5rem', sm: '2rem'}
                        }}>La plataforma de las personas:</Typography>
                        <Typography variant="h3" sx={{
                            fontSize: {xs: '1.5rem', sm: '2rem'}
                        }}>donde los intereses se convierten en parches</Typography>
                        <Typography variant="body1" color={"textSecondary"}>
                            Sea cual sea su interés, desde senderismo y lectura hasta networking y compartir
                            habilidades, hay miles de personas que lo comparten en Parchando.
                        </Typography>
                        <Typography variant="h6">
                            <span style={{fontWeight: 'bold',color: 'blue'}}>Vive.</span> No simplemente existas.
                        </Typography>
                        {userData.id==="" ?(
                            <Button to={"/auth"} component={Link} variant="contained"
                                    sx={{textTransform: "none", marginTop: 1, background: deepPurple[400]}}>
                                <Typography variant="h4" component="span" sx={{
                                    fontSize: {xs: '1.5rem', sm: '2rem'}
                                }}>
                                    Unete a <span style={{fontFamily: '"Comforter Brush", cursive'}}>Parchando</span>
                                </Typography>
                            </Button>
                        ):(
                            <Button to={"/Evento"} component={Link} variant="contained"
                                    sx={{textTransform: "none", marginTop: 1, background: deepPurple[400]}}>
                                <Typography variant="h4" component="span" sx={{
                                    fontSize: {xs: '1.5rem', sm: '2rem'}
                                }}>
                                    Crea un evento
                                </Typography>
                            </Button>
                        )}

                    </Stack>
                </Grid>
                <Grid size={{xs: 11, md: 4}} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img src={process.env.PUBLIC_URL + "/Personas.png"} alt={"colombia"}
                         style={{width: '400px', borderRadius: '4px'}}/>
                </Grid>
            </Grid>
            <Grid container spacing={2} direction="row"
                  sx={{justifyContent: 'center', alignItems: 'center', marginTop: 2}}>
                <Grid size={{xs: 3, md: 1}} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <MusicNoteIcon sx={{ fontSize: 40 }}/>
                    <Typography variant="subtitle2">Música</Typography>
                </Grid>
                <Grid size={{xs: 3, md: 1}} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <CelebrationIcon sx={{ fontSize: 40 }}/>
                    <Typography variant="subtitle2">Fiestas</Typography>
                </Grid>
                <Grid size={{xs: 3, md: 1}} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <PaletteIcon sx={{ fontSize: 40 }}/>
                    <Typography variant="subtitle2">Arte</Typography>
                </Grid>
                <Grid size={{xs: 3, md: 1}} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <AirplanemodeActiveIcon sx={{ fontSize: 40 }}/>
                    <Typography variant="subtitle2">Viajes</Typography>
                </Grid>
                <Grid size={{xs: 3, md: 1}} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <ParkIcon sx={{ fontSize: 40 }}/>
                    <Typography variant="subtitle2">Parques</Typography>
                </Grid>
                <Grid size={{xs: 3, md: 1}} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <SportsEsportsIcon sx={{ fontSize: 40 }}/>
                    <Typography variant="subtitle2">Videojuegos</Typography>
                </Grid>
                <Grid size={{xs: 3, md: 1}} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <FastfoodIcon sx={{ fontSize: 40 }}/>
                    <Typography variant="subtitle2">Comida</Typography>
                </Grid>
                <Grid size={{xs: 3, md: 1}} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <ShoppingCartIcon sx={{ fontSize: 40 }}/>
                    <Typography variant="subtitle2">Compras</Typography>
                </Grid>
            </Grid>
            <Divider variant={"middle"} sx={{marginTop:2, marginBottom:2}} />
            <Typography variant={"h5"} sx={{marginLeft:10, marginBottom:1}}>Ciudades populares</Typography>
            <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                className=""
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                partialVisible
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 4,
                        partialVisibilityGutter: 40
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 2,
                        partialVisibilityGutter: 30
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 3,
                        partialVisibilityGutter: 30
                    }
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl
                shouldResetAutoplay
                showDots
                sliderClass=""
                slidesToSlide={1}
                swipeable
            >
                {data.map((item, index) => (
                    <div key={index} style={{textAlign: 'center', position: 'relative',margin: '0 2px'}}>
                        <img src={item.image} alt={item.name} style={{width: '100%',height: '200px', objectFit: 'cover', borderRadius: '8px'}} />
                        <Typography variant="subtitle1" sx={{
                            position: 'absolute',
                            bottom: 10,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            color: 'white',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            padding: '5px 25px',
                            borderRadius: '4px',
                            display: 'inline-block'
                        }}>{item.name}</Typography>
                    </div>
                ))}
            </Carousel>
        </Stack>
    );
}
import {useEffect, useState} from "react";
import "./Evento.css"
import {useLocation} from "react-router-dom";
import EventoEditable from "./EventoEditable";
import EventoVer from "./EventoVer";
import {getEvento} from "../../Api/EventosApi";

const Evento = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const eventoId = queryParams.get("id");
    const eventoEdit = queryParams.get("edit");
    const [evento, setEvento] = useState(null);


    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const evento = await getEvento(eventoId);
                setEvento(evento);
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        };

        if (eventoId != null) {
            fetchEventData();
        }
    }, [eventoId,eventoEdit]);
    return (
        <>
            {evento != null && eventoEdit ? (
                <EventoEditable editable={true} eventoFetch={evento} />
            ) : evento != null ? (
                <EventoVer eventoFetch={evento} />
            ) : (
                <EventoEditable editable={false} eventoFetch={evento} />
            )}
        </>
    );
}

export default Evento;
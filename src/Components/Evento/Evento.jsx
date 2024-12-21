import {useEffect, useState} from "react";
import "./Evento.css"
import {useLocation} from "react-router-dom";
import EventoEditable from "./EventoEditable";
import EventoVer from "./EventoVer";

const Evento = () => {
    const [editable, setEditable] = useState(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const eventoId = queryParams.get("id");
    useEffect(() => {
        if (eventoId != null) {
            setEditable(true);
        }
    }, [eventoId]);

    /*<EventoEditable editable={editable}  />*/
    /*<EventoVer/>*/
    return (
        <EventoVer/>
    );
}

export default Evento;
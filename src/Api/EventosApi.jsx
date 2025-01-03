/*async function fetchAsistencias(eventoId) {
    const asistenciasResponse = await fetch(`/api/asistencias?eventoId=${eventoId}`);
    const asistencias = await asistenciasResponse.json();

    const userPromises = asistencias.map(asistencia =>
        fetch(`/api/usuarios/${asistencia.usuarioId}`)
    );

    const usersResponses = await Promise.all(userPromises);
    const users = await Promise.all(usersResponses.map(res => res.json()));

    return { asistencias, users };
}*/

import {getUsersParams} from "./UsuariosApi";

const eventsPath="Eventos";
const comentPath="Comentarios";
const asistPath="Asistencias";
const eventsURL = process.env.REACT_APP_EVENT_API;

//Eventos

async function getEventos({usuarioId, ciudad}) {
    const params = new URLSearchParams();

    if (usuarioId) {
        params.append('usuarioId', usuarioId);
    }
    if (ciudad) {
        params.append('ciudad', ciudad);
    }
    const data = await fetch(`${eventsURL}${eventsPath}?${params.toString()}`, {
        method: 'GET',
    });

    if (!data.ok) {
        throw new Error('Error en la solicitud: ' + data.statusText);
    }

    return await data.json();
}

async function getEventosDate({usuarioId, ciudad}) {
    const params = new URLSearchParams();

    if (usuarioId) {
        params.append('usuarioId', usuarioId);
    }
    if (ciudad) {
        params.append('ciudad', ciudad);
    }
    const data = await fetch(`${eventsURL}${eventsPath}/Date?${params.toString()}`, {
        method: 'GET',
    });

    if (!data.ok) {
        throw new Error('Error en la solicitud: ' + data.statusText);
    }

    return await data.json();
}

async function getEvento(id) {
    const data = await fetch(eventsURL+eventsPath+"/"+id, {
        method: 'GET',
    });

    if (!data.ok) {
        throw new Error('Error en la solicitud: ' + data.statusText);
    }

    return await data.json();
}

async function postEvento (data) {
    try {
        const response = await fetch(eventsURL + eventsPath, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function putEvento (id,data) {
    try {
        const response = await fetch(eventsURL + eventsPath+"/"+id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function deleteEvento (id) {
    try {
        const response = await fetch(eventsURL + eventsPath+"/"+id, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}


//Asistencias

async function getAsistencias(id,token) {

    const data = await fetch(`${eventsURL}${eventsPath}/${id}/${asistPath}`, {
        method: 'GET',
    });


    if (!data.ok) {
        throw new Error('Error en la solicitud: ' + data.statusText);
    }

    const asistencias = await data.json();

    const usuarioIds = asistencias.map(asistencia => asistencia.usuarioId);

    const userPromises = usuarioIds.map(usuarioId => getUsersParams({ usuarioId:usuarioId }, token));

    const users = await Promise.all(userPromises);

    const asistenciasConUsuarios = asistencias.map(asistencia => {
        const usuario = users.find(user => user.id === asistencia.usuarioId);
        return {
            ...asistencia,
            usuario
        };
    });

    return asistenciasConUsuarios
}

async function getAsistenciasSinUsuarios(id) {

    const data = await fetch(`${eventsURL}${eventsPath}/${id}/${asistPath}`, {
        method: 'GET',
    });


    if (!data.ok) {
        throw new Error('Error en la solicitud: ' + data.statusText);
    }

    const asistencias = await data.json();

    return asistencias
}

async function postAsistencia(id, usuarioId) {
    try {
        const response = await fetch(`${eventsURL}${eventsPath}/${id}/${asistPath}?usuarioId=${usuarioId}`, {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function deleteAsistencia (id, usuarioId) {
    try {
        const response = await fetch(`${eventsURL}${eventsPath}/${id}/${asistPath}?usuarioId=${usuarioId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

//Comentarios

async function getComentarios(id) {

    const data = await fetch(`${eventsURL}${eventsPath}/${id}/${comentPath}`, {
        method: 'GET',
    });

    if (!data.ok) {
        throw new Error('Error en la solicitud: ' + data.statusText);
    }
    return await data.json()
}

async function postComentario (id,data) {
    try {
        const response = await fetch(`${eventsURL}${eventsPath}/${id}/${comentPath}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}


export {
    getEventos,
    getEvento,
    postEvento,
    putEvento,
    deleteEvento,

    getAsistencias,
    postAsistencia,
    deleteAsistencia,
    getAsistenciasSinUsuarios,

    getComentarios,
    postComentario,
    getEventosDate

}
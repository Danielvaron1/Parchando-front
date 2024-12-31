const usersPath="Usuarios";
const notifPath="Notificaciones";
const amigPath="Amigos";
const usersURL = process.env.REACT_APP_USER_API;

//USUARIOS

async function postLogin(email, password){

    try {
        const response = await fetch(usersURL + usersPath + "/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({correo:email, contrasena:password})
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function getUsers(token) {
    const data = await fetch(usersURL+usersPath, {
        method: 'GET',
        headers: {Authorization: 'Bearer '+ token }
    });
    return await data.json();
}

async function getUsersParams({ usuarioId, correo, telefono }, token) {
    const params = new URLSearchParams();

    if (usuarioId) {
        params.append('usuarioId', usuarioId);
    }
    if (correo) {
        params.append('correo', correo);
    }
    if (telefono) {
        params.append('telefono', telefono);
    }

    const data = await fetch(`${usersURL}${usersPath}/usuario?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!data.ok) {
        throw new Error(`Error en la solicitud: ${data.status} ${data.statusText}`);
    }

    const userData= await data.json();

    if (userData.intereses) {
        userData.intereses = userData.intereses.replace(/'/g, "").split(",").map(interest => interest.trim());
    }

    return userData;
}

async function postUser (data) {
    try {
        const response = await fetch(usersURL + usersPath + "/auth/singup", {
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

async function putPwdUser (data,token) {
    try {
        const response = await fetch(usersURL + usersPath + "/usuario", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (response.status !== 204) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
    } catch (error) {
        throw error;
    }
}

async function putUser (id,data,token) {
    try {
        const response = await fetch(usersURL + usersPath + `/usuario/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        const result = await response.json();

        if (result.intereses) {
            result.intereses = result.intereses.replace(/'/g, "").split(",").map(interest => interest.trim());
        }

        return result;
    } catch (error) {
        throw error;
    }
}


//AMIGOS

async function getUserAmigo(usuarioId1,usuarioId2,token){
    try {
        const data = await fetch(`${usersURL}${amigPath}/amigo?usuario1=${usuarioId1}&usuario2=${usuarioId2}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!data.ok) {
            throw new Error('Error en la solicitud: ' + data.statusText);
        }

        const result = await data.json();
        if (result.usuario2.intereses) {
            result.usuario2.intereses = result.usuario2.intereses.replace(/'/g, "").split(",").map(interest => interest.trim());
        }
        return result;
    } catch (error) {
        throw error;
    }
}

async function getUserAmigos({ usuarioId, estado },token){
    try {
        const params = new URLSearchParams();

        if (usuarioId) {
            params.append('usuario', usuarioId);
        }
        if (estado) {
            params.append('estado', estado);
        }

        const data = await fetch(`${usersURL}${amigPath}?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!data.ok) {
            throw new Error('Error en la solicitud: ' + data.statusText);
        }

        const result = await data.json();
        result.forEach(amigo => {
            amigo.usuario2.intereses = amigo.usuario2.intereses.replace(/'/g, "").split(",").map(interest => interest.trim());
        });
        return result;
    } catch (error) {
        throw error;
    }
}

async function deleteAmigos(usuarioId1,usuarioId2,token) {
    try {
        const data = await fetch(`${usersURL}${amigPath}/amigo?usuario1=${usuarioId1}&usuario2=${usuarioId2}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!data.ok) {
            throw new Error('Error en la solicitud: ' + data.statusText);
        }
    } catch (error) {
        throw error;
    }
}

async function createAmigos(usuarioId1,usuarioId2,token){
    try {
        const body = {
            usuario1: usuarioId1,
            usuario2: usuarioId2
        };
        const data = await fetch(`${usersURL}${amigPath}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        if (!data.ok) {
            throw new Error('Error en la solicitud: ' + data.statusText);
        }
    } catch (error) {
        throw error;
    }
}

async function acceptAmigos(usuarioId1,usuarioId2,token) {
    try {
        const data = await fetch(`${usersURL}${amigPath}/amigo?usuario1=${usuarioId1}&usuario2=${usuarioId2}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!data.ok) {
            throw new Error('Error en la solicitud: ' + data.statusText);
        }
    } catch (error) {
        throw error;
    }
}




//NOTIFICACIONES

async function getNotificaciones( usuarioId,token){
    try {

        const data = await fetch(`${usersURL}${notifPath}?usuarioId=${usuarioId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!data.ok) {
            throw new Error('Error en la solicitud: ' + data.statusText);
        }

        return await data.json();
    } catch (error) {
        throw error;
    }
}

async function readNotificaciones( usuarioId,token){
    try {

        const data = await fetch(`${usersURL}${notifPath}?usuarioId=${usuarioId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!data.ok) {
            throw new Error('Error en la solicitud: ' + data.statusText);
        }

        return await data.json();
    } catch (error) {
        throw error;
    }
}

async function createNotificacion({usuarioId,tipoId,tipo,nombre},token){
    try {

        const params = new URLSearchParams();

        params.append('usuarioId', usuarioId);
        params.append('tipoId', tipoId);
        params.append('tipo', tipo);
        params.append('nombre', nombre);

        const data = await fetch(`${usersURL}${notifPath}?${params.toString()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!data.ok) {
            throw new Error('Error en la solicitud: ' + data.statusText);
        }

        return await data.json();
    } catch (error) {
        throw error;
    }
}

async function deleteNotificaciones( id,token){
    try {

        const data = await fetch(`${usersURL}${notifPath}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!data.ok) {
            throw new Error('Error en la solicitud: ' + data.statusText);
        }
    } catch (error) {
        throw error;
    }
}

export {
    getUsers,
    getUsersParams,
    postLogin,
    postUser,
    putPwdUser,
    putUser,

    getUserAmigo,
    getUserAmigos,
    deleteAmigos,
    createAmigos,
    acceptAmigos,

    getNotificaciones,
    readNotificaciones,
    createNotificacion,
    deleteNotificaciones
}
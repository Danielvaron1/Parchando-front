const usersPath="Usuarios";
const notifPath="Notificaciones";
const amigPath="Amigos";
const usersURL = process.env.REACT_APP_USER_API;


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

        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

async function getUsers(token) {
    const data = await fetch(usersURL+usersPath, {
        method: 'GET',
        headers: {Authorization: 'Bearer '+ token }
    });
    return data.json();
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

    return data.json();
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

        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}


export {
    getUsers,
    getUsersParams,
    postLogin,
    postUser
}
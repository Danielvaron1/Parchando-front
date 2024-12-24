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
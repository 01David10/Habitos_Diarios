const habitInput = document.getElementById('habit-name');
const frecuencyInput = document.getElementById('frecuency');
const btnCreateHabit = document.getElementById('btn-insert');

btnCreateHabit.addEventListener('click', async () => {
    const name = habitInput.value;
    const frecuency = frecuencyInput.value;

    try {
        const response = await fetch('http://localhost:3000/api/createHabit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, frecuency }),
        });

        if (response.ok) {
            alert('Habito creado correctamente!');
            location.reload();
        } else {
            const data = await response.json();
            alert(data.message || 'Error al crear el habito');
        }
    } catch (error) {
        console.error('Error al crear el habito:', error);
        alert('Hubo un problema al intentar crear el habito.');
    }
});


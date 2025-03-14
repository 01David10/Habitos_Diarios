// Elementos del DOM
const loginButton = document.querySelector(".login-button");
const registerButton = document.querySelector(".register-button");
const logoutButton = document.querySelector(".logout-button");

const habitInput = document.getElementById('habit-name');
const frecuencyInput = document.getElementById('frecuency');
const btnCreateHabit = document.getElementById('btn-insert');

// cambiar interfaz si hay sesion iniciada
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("http://localhost:3000/api/check-session", { credentials: "include" });
        const data = await response.json();

        if (data.authenticated) {
            loginButton.style.display = "none"; // Oculta el botón de login
            registerButton.style.display = "none"; // Oculta el botón de register
            logoutButton.style.display = "block"; // Muestra el botón de logout
        }
    } catch (error) {
        console.error("Error verificando sesión:", error);
    }
});

btnCreateHabit.addEventListener('click', async () => {
    category = 'espiritualidad';
    const name = habitInput.value;
    const frecuency = frecuencyInput.value;

    try {
        const response = await fetch('http://localhost:3000/api/createHabit', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category, name, frecuency }),
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

// visualizar habitos

const habitTable = document.getElementById('habit-table');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/api/habits/espiritualidad', {
            credentials: "include"
        })
        const habits = await response.json();

        habits.forEach(habit => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${habit.name}</td>
                <td>${habit.frecuency}</td>
            `;
            habitTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error al obtener los habitos:', error);
        alert('Hubo un problema al intentar obtener los habitos.');
    }
});

// Función para hacer logout
async function logout() {
    try {
        const response = await fetch("http://localhost:3000/api/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        });

        if (response.ok) {
            alert("¡Has cerrado sesión correctamente!");
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Eliminar el token
            location.reload(); // Recargar la página para que se actualicen los botones
        } else {
            const data = await response.json();
            alert(data.message || "Error al cerrar sesión");
        }
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        alert("Hubo un problema al intentar cerrar sesión.");
    }
}

// Añadir el evento de logout al botón "Salir"
if (logoutButton) {
    logoutButton.addEventListener("click", logout);
}
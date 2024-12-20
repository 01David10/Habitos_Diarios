// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
  let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

// Verificar si el token existe
const token = getCookie("token");

// Elementos del DOM
const loginButton = document.querySelector(".login-button");
const registerButton = document.querySelector(".register-button");
const logoutButton = document.querySelector(".logout-button");

const meditationCard = document.querySelector("#meditation-card");
const workoutCard = document.querySelector("#workout-card");
const studyCard = document.querySelector("#study-card");

// Mostrar/Ocultar botones dependiendo de si hay un token
if (token) {
  // Si hay un token, mostrar "Salir" y ocultar "Iniciar sesión" y "Registrarse"
  loginButton.style.display = "none";
  registerButton.style.display = "none";
  logoutButton.style.display = "block";
} else {
  // Si no hay un token, mostrar "Iniciar sesión" y "Registrarse"
  loginButton.style.display = "block";
  registerButton.style.display = "block";
  logoutButton.style.display = "none";
}

// Función para hacer logout
async function logout() {
  try {
    const response = await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

// eventos para las tarjetas
workoutCard.addEventListener("click", () => {
  window.location.href = "http://127.0.0.1:5500/frontend/src/proyecto/HTML/ejercicio.html";
});

meditationCard.addEventListener("click", () => {
  window.location.href = "http://127.0.0.1:5500/frontend/src/proyecto/HTML/meditacion.html";
});

studyCard.addEventListener("click", () => {
  window.location.href = "http://127.0.0.1:5500/frontend/src/proyecto/HTML/estudio.html";
});
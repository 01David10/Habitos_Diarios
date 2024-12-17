document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener los valores de los inputs
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Hacer la solicitud POST al backend para hacer login
    try {
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }), // Enviar el email y password
        });

        const data = await response.json();

        if (response.ok) {
            alert("¡Bienvenido, " + data.username + "!");
            window.location.href = "/frontend/src/proyecto/HTML/principal.html";
        } else {
            // Si hubo un error, mostrar el mensaje de error
            alert(data.message || "Error en el login");
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        alert("Hubo un problema al intentar iniciar sesión.");
    }
});

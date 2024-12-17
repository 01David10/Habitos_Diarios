document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita la recarga de la página

    // Capturar los valores del formulario
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    try {
        // Enviar los datos al backend
        const response = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("¡Usuario registrado correctamente!");
            console.log("Respuesta del servidor:", data);
            // Redirigir a otra página si lo deseas
            window.location.href = "/frontend/src/proyecto/HTML/login.html";
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Error en el registro:", error);
        alert("Error al conectar con el servidor.");
    }
});

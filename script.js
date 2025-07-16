document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('passwordInput');
    const loginButton = document.getElementById('loginButton');
    const errorMessage = document.getElementById('errorMessage');

    // --- Lógica de Login (para index.html) ---
    if (passwordInput && loginButton && errorMessage) {
        // Asumiendo que `validatePassword` está en auth.js
        // Puedes definir la contraseña aquí para desarrollo, pero MUEVELA a config.js o a un backend para producción
        const CORRECT_PASSWORD = 'miPasswordSecreto123'; // ¡CAMBIA ESTO Y MUEVELO A auth.js/config.js!

        const handleLogin = () => {
            const enteredPassword = passwordInput.value;

            // En un entorno real, esta validación se haría con una llamada AJAX a un servidor
            // Por ahora, lo hacemos directamente aquí o en auth.js
            if (enteredPassword === CORRECT_PASSWORD) {
                // Contraseña correcta, redirigir al menú
                window.location.href = 'menu.html';
            } else {
                // Contraseña incorrecta, mostrar mensaje de error
                errorMessage.textContent = 'Contraseña incorrecta. Inténtalo de nuevo.';
                errorMessage.classList.add('visible'); // Muestra el mensaje
                passwordInput.value = ''; // Limpia el campo
                setTimeout(() => {
                    errorMessage.classList.remove('visible'); // Oculta el mensaje después de 3 segundos
                }, 3000);
            }
        };

        loginButton.addEventListener('click', handleLogin);
        passwordInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                handleLogin();
            }
        });
    }

    // --- Lógica de Navegación del Menú (para menu.html) ---
    const menuItems = document.querySelectorAll('.menu-item');
    if (menuItems.length > 0) {
        menuItems.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault(); // Previene la navegación inmediata del enlace

                const itemId = item.id;
                let targetPage = '';

                // Define la página a la que irá cada opción (puedes usar config.js aquí)
                switch(itemId) {
                    case 'option1':
                        targetPage = 'apartado1.html'; // Ejemplo: 'notas.html'
                        break;
                    case 'option2':
                        targetPage = 'apartado2.html'; // Ejemplo: 'horarios.html'
                        break;
                    case 'option3':
                        targetPage = 'apartado3.html'; // Ejemplo: 'recursos.html'
                        break;
                    case 'option4':
                        targetPage = 'apartado4.html'; // Ejemplo: 'perfil.html'
                        break;
                    case 'option5':
                        targetPage = 'apartado5.html'; // Ejemplo: 'configuracion.html'
                        break;
                    default:
                        console.warn('Opción de menú no reconocida:', itemId);
                        return; // Salir si no hay página definida
                }

                // Aquí podrías añadir una animación de salida antes de la redirección
                window.location.href = targetPage;
            });
        });
    }
});

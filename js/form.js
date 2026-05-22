document.addEventListener('DOMContentLoaded', () => {
    const id = (str) => document.getElementById(str);

    const submitBtn = id('submitRegisterBtn');
    const formMessage = id('formMessage');
    const registerForm = id('registerForm');

    if (submitBtn) {
        submitBtn.addEventListener('click', async () => {
            const nombre = id('inputNombre').value.trim();
            const email = id('inputEmail').value.trim();
            const universidad = id('inputUniversidad').value.trim();
            const password = id('inputPassword').value;
            const tipoInput = document.querySelector('input[name="tipo"]:checked');
            const tipo = tipoInput ? tipoInput.value : '';

            if (!nombre || !email || !password) {
                showFormMessage('Completa los campos obligatorios: Nombre, Email y Contraseña.', 'error');
                return;
            }
            if (password.length < 6) {
                showFormMessage('La contraseña debe tener al menos 6 caracteres.', 'error');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = 'Registrando...';

            try {
                const { data: authData, error: authError } = await supabaseClient.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { nombre, universidad, tipo_participante: tipo }
                    }
                });

                if (authError) {
                    if (authError.message.includes('already registered')) {
                        throw new Error('Este email ya está registrado. Inicia sesión.');
                    }
                    throw authError;
                }

                const { error: insertError } = await supabaseClient
                    .from('registrations')
                    .insert({
                        user_id: authData.user.id,
                        nombre,
                        email,
                        universidad,
                        tipo_participante: tipo,
                        fecha_registro: new Date().toISOString(),
                        evento: 'III Seminario Internacional de Investigación Latinoamericano 2026'
                    });

                if (insertError) throw insertError;

                if (authData.session) {
                    showFormMessage('Registro completado. Bienvenido!', 'success');
                } else {
                    showFormMessage('Registro completado! Revisa tu email para confirmar tu cuenta. Luego inicia sesión.', 'success');
                }

                if (registerForm) registerForm.reset();
                submitBtn.textContent = 'Crear Cuenta y Registrarse';
                submitBtn.disabled = false;

            } catch (err) {
                showFormMessage(err.message || 'Error al registrar. Intenta de nuevo.', 'error');
                submitBtn.textContent = 'Crear Cuenta y Registrarse';
                submitBtn.disabled = false;
                console.error(err);
            }
        });
    }

    function showFormMessage(msg, type) {
        if (!formMessage) return;
        formMessage.textContent = msg;
        formMessage.style.display = 'block';
        formMessage.style.background = type === 'success' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)';
        formMessage.style.color = type === 'success' ? '#16a34a' : '#dc2626';
        formMessage.style.border = type === 'success' ? '1px solid #16a34a' : '1px solid #dc2626';
    }
});

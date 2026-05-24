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
            const tipoInput = document.querySelector('input[name="tipo"]:checked');
            const tipo = tipoInput ? tipoInput.value : '';

            if (!nombre || !email) {
                showFormMessage('Completa los campos obligatorios: Nombre y Email.', 'error');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = 'Registrando...';

            try {
                const { error: insertError } = await supabaseClient
                    .from('registrations')
                    .insert({
                        nombre,
                        email,
                        universidad,
                        tipo_participante: tipo,
                        fecha_registro: new Date().toISOString(),
                        evento: 'III Seminario Internacional de Investigación Latinoamericano 2026'
                    });

                if (insertError) throw insertError;

                showFormMessage('¡Inscripción completada con éxito! Te esperamos en el seminario.', 'success');
                if (registerForm) registerForm.reset();
                submitBtn.textContent = 'Inscribirse';
                submitBtn.disabled = false;

            } catch (err) {
                showFormMessage(err.message || 'Error al registrar. Intenta de nuevo.', 'error');
                submitBtn.textContent = 'Inscribirse';
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

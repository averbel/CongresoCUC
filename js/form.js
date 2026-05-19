document.addEventListener('DOMContentLoaded', () => {
    const id = (str) => document.getElementById(str);
    
    // WEBHOOK REGISTRO
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

            // Validaciones básicas
            if (!nombre || !email) {
                showFormMessage('Por favor completa los campos obligatorios (Nombre y Email).', 'error');
                return;
            }

            const payload = {
                nombre,
                email,
                universidad,
                tipo_participante: tipo,
                fecha_registro: new Date().toISOString(),
                evento: 'III Seminario Internacional de Investigación Latinoamericano 2026'
            };

            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            try {
                const response = await fetch('https://averbel1.app.n8n.cloud/webhook/92d04f58-86da-4b7c-b53d-f94c96280eaa', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    showFormMessage('✅ ¡Registro completado! Te contactaremos pronto.', 'success');
                    if (registerForm) registerForm.reset();
                    submitBtn.textContent = 'Completar Registro';
                    submitBtn.disabled = false;
                } else {
                    throw new Error('Error del servidor: ' + response.status);
                }
            } catch (err) {
                showFormMessage('❌ Hubo un error al enviar. Inténtalo de nuevo.', 'error');
                submitBtn.textContent = 'Completar Registro';
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

import { CONFIG } from '../config.js';
import { getById } from '../utils.js';
import { saveRegistration } from '../supabase.js';

function showMessage(element, message, type) {
  element.textContent = message;
  element.style.display = 'block';
  element.style.background = type === 'success'
    ? CONFIG.COLOR.SUCCESS_BACKGROUND
    : CONFIG.COLOR.ERROR_BACKGROUND;
  element.style.color = type === 'success'
    ? CONFIG.COLOR.SUCCESS
    : CONFIG.COLOR.ERROR;
}

function getFormData() {
  return {
    nombre: getById('inputNombre').value.trim(),
    email: getById('inputEmail').value.trim(),
    universidad: getById('inputUniversidad').value.trim(),
    tipoParticipante: (document.querySelector('input[name="tipo"]:checked') || {}).value || ''
  };
}

function validateForm({ nombre, email }) {
  if (!nombre) return 'El nombre es obligatorio.';
  if (!email) return 'El email es obligatorio.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'El email no es válido.';
  return null;
}

function initRadioToggle() {
  document.querySelectorAll('.radio-btn').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.radio-btn').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });
}

export function initRegistrationForm() {
  const submitButton = getById('submitRegisterBtn');
  const formMessage = getById('formMessage');
  const registerForm = getById('registerForm');

  if (!submitButton || !formMessage) return;

  initRadioToggle();

  submitButton.addEventListener('click', async () => {
    const formData = getFormData();
    const validationError = validateForm(formData);

    if (validationError) {
      showMessage(formMessage, validationError, 'error');
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Registrando...';

    try {
      await saveRegistration(formData);

      fetch('https://hook.us2.make.com/3jcbu4ihqb3bka5yv057fd7vfdx4gkrj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).catch(err => console.error('Make webhook error:', err));

      showMessage(formMessage, '¡Inscripción completada con éxito! Te esperamos en el seminario.', 'success');
      if (registerForm) registerForm.reset();

      document.querySelectorAll('.radio-btn').forEach((btn, index) => {
        btn.classList.toggle('active', index === 0);
      });
    } catch (error) {
      const message = error.message === 'Duplicate'
        ? 'Este email ya está registrado.'
        : error.message || 'Error al registrar. Intenta de nuevo.';
      showMessage(formMessage, message, 'error');
    } finally {
      submitButton.textContent = 'Inscribirse';
      submitButton.disabled = false;
    }
  });
}

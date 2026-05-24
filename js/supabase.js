import { CONFIG } from './config.js';

const supabaseClient = window.supabase.createClient(
  CONFIG.SUPABASE.URL,
  CONFIG.SUPABASE.ANON_KEY
);

export async function saveRegistration({ nombre, email, universidad, tipoParticipante }) {
  const { error } = await supabaseClient
    .from(CONFIG.SUPABASE.TABLE_REGISTRATIONS)
    .insert({
      nombre,
      email,
      universidad: universidad || null,
      tipo_participante: tipoParticipante,
      fecha_registro: new Date().toISOString(),
      evento: CONFIG.EVENT.NAME
    });

  if (error) {
    throw new Error(error.message);
  }
}

export default supabaseClient;

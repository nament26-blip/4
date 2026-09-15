// Инициализация Supabase-клиента
window.supabaseClient = window.supabase.createClient(
  window.SUPABASE_URL,
  window.SUPABASE_ANON_KEY
);

console.log('Supabase подключён');

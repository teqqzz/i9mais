import { API_URL } from '@/config'; // API_URL é "" (vazio) em produção, ou "http://localhost:10000" em dev

/**
 * Formata a URL da imagem vinda do banco para ser usada no frontend.
 * @param {string} urlFromDB A URL como ela vem do banco de dados.
 * @returns {string} A URL completa e correta para a tag <img src> ou background-image.
 */
export function formatImageUrl(urlFromDB) {
  
  if (!urlFromDB) {
    return '/images/default-placeholder.jpg'; // Caminho para sua imagem placeholder padrão
  }

  // Se a URL já é absoluta (começa com http), ela veio do Supabase.
  // Retorne-a diretamente.
  if (urlFromDB.startsWith('http')) {
    return urlFromDB;
  }

  // Se for um caminho local (começa com '/'), ela veio do SEED ou da pasta public/.
  // Nós precisamos prefixar a API_URL (para dev local) ou deixar como está (para produção).
  
  // Em Produção (Vercel): API_URL é "" -> retorna "/uploads/imagem.jpg" (Correto)
  // Em Dev (Local): API_URL é "http://localhost:10000" -> retorna "http://localhost:10000/uploads/imagem.jpg" (Correto)
  return `${API_URL}${urlFromDB}`;
}
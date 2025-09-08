import { API_URL } from "@/config";

// NOTA: Em produção (Vercel), API_URL deve ser = "" (string vazia)
// Em dev (local), API_URL deve ser = "http://localhost:10000"

/**
 * Formata a URL da imagem vinda do banco para ser usada no frontend.
 * @param {string} urlFromDB A URL como ela vem do banco de dados.
 * @returns {string} A URL completa e correta.
 */
export function formatImageUrl(urlFromDB) {
  // 1. Se a URL não existir, retorne o placeholder padrão.
  // (Certifique-se que você tem um placeholder em /public/images/default-placeholder.jpg)
  if (!urlFromDB) {
    return "/images/default-placeholder.jpg";
  }

  // 2. Se a URL já é absoluta (começa com http), ela veio do Supabase (uma nova postagem).
  // Retorne-a diretamente, sem fazer nada.
  if (urlFromDB.startsWith("http")) {
    return urlFromDB;
  }

  // 3. Se for um caminho local (ex: /uploads/img.jpg - do seu script de seed):
  // Em Produção (Vercel): API_URL é "" -> retorna "/uploads/img.jpg" (Correto)
  // Em Dev (Local): API_URL é "http://localhost:10000" -> retorna "http://localhost:10000/uploads/img.jpg" (Correto)
  return `${API_URL}${urlFromDB}`;
}

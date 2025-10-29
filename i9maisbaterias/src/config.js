// Pega a URL pública principal definida nas variáveis de ambiente da Vercel
const PUBLIC_PRODUCTION_URL = import.meta.env.VITE_PUBLIC_PRODUCTION_URL || ''; 

// Se estiver em DEV local, usa localhost. 
// Se estiver em PROD (Vercel), usa a URL pública definida.
// Se a URL pública não for definida na Vercel, usa caminho relativo como fallback.
export const API_URL = import.meta.env.VITE_API_URL /* localhost */ || PUBLIC_PRODUCTION_URL /* URL do domínio */ || ''; /* fallback relativo */
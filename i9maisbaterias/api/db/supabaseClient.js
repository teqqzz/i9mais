import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.warn('AVISO: Variáveis de ambiente SUPABASE_URL ou SUPABASE_SERVICE_KEY não definidas.');
}

// Criamos um cliente que usa a "service_role" key para ter permissão total de upload no backend.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
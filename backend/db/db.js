import pg from 'pg';

// --- PASSO DE DEPURAÇÃO CRÍTICO ---
// Esta parte do código vai nos dizer se o processo Node está vendo a variável de ambiente.
console.log('--- Verificando Variáveis de Ambiente ---');
console.log('DATABASE_URL detectada:', process.env.DATABASE_URL ? 'Sim, encontrada!' : 'Não, está UNDEFINED!');
console.log('------------------------------------');

// Verificamos se a URL existe. Se não, o programa irá parar com uma mensagem clara.
if (!process.env.DATABASE_URL) {
    throw new Error('ERRO CRÍTICO: A variável de ambiente DATABASE_URL não foi encontrada. Verifique as configurações do serviço no Render.');
}

// Configuração explícita para a conexão, forçando o uso da variável de ambiente
// e adicionando o SSL necessário para o Render.
const connectionConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};


// --- O RESTANTE DO CÓDIGO PERMANECE O MESMO, APENAS USANDO A NOVA CONFIGURAÇÃO ---

// Função Slugify (sem alterações)
function slugify(text) {
    if (!text) return '';
    return text.toString().toLowerCase().normalize('NFD').trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-');
}

// --- DADOS INICIAIS COMPLETOS ---

const projectsData = [
    // (Datas de publicação estimadas com base em notícias e artigos públicos)
    {
        title: 'Tecpar - Traçador de Curva para Painéis Solares',
        publish_date: '2023-04-14',
        summary: 'Desenvolvimento de equipamento de baixo custo para avaliar a eficiência e degradação de painéis solares.',
        image_url: '/uploads/tecpar-tracador-curva-solar.jpg',
        content: `<h3>Validando a Segunda Vida da Energia Solar</h3><p>Em um projeto inovador com o apoio do Instituto de Tecnologia do Paraná (Tecpar), a i9+ Baterias está desenvolvendo um equipamento nacional de baixo custo para avaliar a eficiência e a degradação de painéis solares. Este <strong>Traçador de Curva IxV</strong> é fundamental para a economia circular no setor fotovoltaico.</p><p>Muitos painéis solares descartados ainda possuem uma vida útil significativa. Nossa tecnologia permite:<ul><li><strong>Diagnosticar com Precisão:</strong> Medir o potencial real de geração de energia de cada painel usado.</li><li><strong>Criar Módulos Requalificados:</strong> Agrupar painéis com a mesma capacidade de geração para criar novas estações fotovoltaicas de "second life".</li><li><strong>Reduzir Custos:</strong> Oferecer uma alternativa de energia solar muito mais acessível, aproveitando ativos que seriam descartados.</li></ul><p>Incubada no Tecpar, a i9+ utiliza este projeto para fortalecer a sustentabilidade e a eficiência na geração de energia solar, transformando o que seria lixo em um recurso valioso.</p>`,
        image_style: 'contain'
    },
    {
        title: 'Rota 2030 - P&D em Baterias',
        publish_date: '2024-02-20',
        summary: 'Investimento em pesquisa e desenvolvimento de tecnologia nacional para baterias, visando autonomia e inovação.',
        image_url: '/uploads/rota-2030-pd-baterias.jpg',
        content: `<h3>Desenvolvendo a Próxima Geração de Baterias no Brasil</h3><p>O programa <strong>Rota 2030</strong> é uma iniciativa estratégica do governo federal para impulsionar a competitividade e a inovação no setor automotivo brasileiro. A i9+ Baterias é um ator chave neste ecossistema, focando no desenvolvimento de pesquisa e desenvolvimento (P&D) de ponta para a cadeia de baterias.</p><p>Nosso envolvimento visa atacar um dos maiores gargalos da indústria nacional: a dependência de tecnologia e componentes importados. Em colaboração com parceiros estratégicos, estamos investindo em:<ul><li><strong>Novos Materiais e Químicas:</strong> Pesquisa de materiais alternativos para cátodos e ânodos que possam ser produzidos localmente.</li><li><strong>Otimização de Células:</strong> Engenharia de novas configurações de células de bateria para aumentar a densidade energética e a segurança.</li><li><strong>Processos de Manufatura:</strong> Desenvolvimento de técnicas de produção mais eficientes e sustentáveis para a montagem de packs de bateria.</li></ul><p>Ao investir em P&D através do Rota 2030, a i9+ não está apenas criando produtos melhores, mas também ajudando a construir uma base tecnológica sólida para que o Brasil se torne autônomo e um polo de inovação no mercado global de energia e mobilidade elétrica.</p>`,
        image_style: 'cover'
    },
    {
        title: 'Ageuni - Mini Usinas Solares',
        publish_date: '2023-08-10',
        summary: 'Instalação de duas mini usinas solares de 3.5 kW em locais remotos, promovendo acesso à energia sustentável.',
        image_url: '/uploads/ageuni-mini-usinas.jpg',
        content: `<h3>Impacto Social e Sustentabilidade em Ação</h3><p>Em parceria com a Agência de Desenvolvimento Regional Sustentável (Ageuni), a i9+ Baterias demonstrou na prática o poder da economia circular. O projeto consistiu na instalação de duas mini usinas solares de 3.5 kW em comunidades remotas, locais onde o acesso à rede elétrica convencional é um desafio logístico e financeiro.</p><p>O grande diferencial deste projeto foi a utilização de <strong>baterias de "Second Life"</strong>, requalificadas a partir de baterias de veículos elétricos. Essa abordagem permitiu:<ul><li><strong>Democratizar o Acesso:</strong> Reduzir drasticamente o custo do sistema de armazenamento, tornando a energia solar uma realidade viável para essas comunidades.</li><li><strong>Promover a Sustentabilidade:</strong> Evitar o descarte de baterias ainda funcionais, aplicando os princípios da economia circular e reduzindo o impacto ambiental.</li><li><strong>Garantir a Autonomia:</strong> Fornecer uma fonte de energia estável e limpa, impulsionando o desenvolvimento local e a qualidade de vida.</li></ul><p>O projeto incluiu a entrega de documentação digital completa e certificações, garantindo a longevidade e o suporte técnico contínuo das instalações.</p>`,
        image_style: 'contain'
    },
    {
        title: 'EMBRAPII - Traçador de Curva para Baterias',
        publish_date: '2023-11-05',
        summary: 'Desenvolvimento de hardware e software para diagnóstico preciso da saúde de baterias, essencial para o reuso seguro.',
        image_url: '/uploads/embrapii-tracador-curva.jpg',
        content: `<h3>Inovação em Nível de Hardware para um Diagnóstico Preciso</h3><p>A parceria com a EMBRAPII (Empresa Brasileira de Pesquisa e Inovação Industrial) e o Instituto Federal solidifica a i9+ como uma Deep Tech. O fruto deste projeto é o <strong>Traçador de Curva I-V</strong>, um equipamento de hardware e software desenvolvido internamente para realizar um "eletrocardiograma" de baterias.</p><p>Este dispositivo inovador mede com altíssima precisão a relação entre Corrente Elétrica (I) e Tensão Elétrica (V), permitindo uma análise profunda do Estado de Saúde (SoH) e da performance real de uma bateria. A tecnologia é crucial para:<ul><li><strong>Controle de Qualidade na Indústria:</strong> Permitir que fabricantes validem a qualidade de suas células e packs de bateria.</li><li><strong>Segurança na Requalificação:</strong> Garantir que apenas as baterias seguras e eficientes sejam selecionadas para o processo de "Second Life".</li><li><strong>Manutenção Preditiva:</strong> Possibilitar que grandes frotas e indústrias monitorem seus ativos e prevejam falhas antes que aconteçam.</li></ul><p>O desenvolvimento envolveu prototipagem avançada e testes rigorosos em laboratório, resultando em uma tecnologia proprietária que nos coloca na vanguarda do diagnóstico de baterias no Brasil.</p>`,
        image_style: 'contain'
    },
    {
        title: 'CNPq & UTFPR - Plataforma de Dados',
        publish_date: '2024-01-15',
        summary: 'Iniciativa para centralizar e analisar informações de fabricantes de baterias, otimizando o mercado de VEs.',
        image_url: '/uploads/cnpq-utfpr-plataforma-dados.jpg',
        content: `<h3>Inteligência Artificial para o Ecossistema de Eletromobilidade</h3><p>O mercado de veículos elétricos está crescendo exponencialmente, mas a falta de padronização e de informações centralizadas sobre baterias é um grande obstáculo. Em colaboração com o CNPq (Conselho Nacional de Desenvolvimento Científico e Tecnológico) e a UTFPR (Universidade Tecnológica Federal do Paraná), a i9+ está liderando a criação de uma plataforma de dados pioneira.</p><p>O objetivo é construir o maior banco de dados sobre baterias de lítio do mercado brasileiro, integrando tecnologias de <strong>Big Data e Inteligência Artificial</strong> para:<ul><li><strong>Conectar o Ecossistema:</strong> Unir fabricantes, usuários, demandantes e fornecedores de baterias em uma única plataforma.</li><li><strong>Otimizar Processos:</strong> Facilitar a logística reversa e o reuso de baterias em larga escala.</li><li><strong>Promover a Padronização:</strong> Gerar insights que ajudem a padronizar produtos e componentes, aumentando a segurança e a eficiência do mercado.</li><li><strong>Facilitar a Tomada de Decisão:</strong> Fornecer dados valiosos para empresas e governo tomarem decisões estratégicas sobre o futuro da eletromobilidade no país.</li></ul><p>Este projeto transforma dados brutos em inteligência estratégica, pavimentando o caminho para um mercado de veículos elétricos mais organizado, seguro e sustentável.</p>`,
        image_style: 'contain'
    },
    {
        title: 'CEMIG - Gestão de Ativos Energéticos',
        publish_date: '2023-09-22',
        summary: 'Otimização da gestão de baterias chumbo-ácido em grandes frotas, prolongando sua vida útil e reduzindo custos.',
        image_url: '/uploads/cemig-gestao-ativos.jpg',
        content: `<h3>Prolongando a Vida Útil e Reduzindo Custos para Grandes Frotas</h3><p>A expertise da i9+ não se limita às baterias de lítio. Em um projeto estratégico com a CEMIG, uma das maiores concessionárias de energia do Brasil, desenvolvemos uma solução integrada para o diagnóstico preciso de <strong>baterias chumbo-ácido</strong>, amplamente utilizadas em veículos a combustão e aplicações estacionárias (como no-breaks).</p><p>Nossa solução combina hardware e software proprietários para medir resistência interna (Ohms), tensão (Volts) e temperatura (°C), fornecendo um panorama claro sobre o estado de vida real das baterias. O projeto incluiu a criação de um dashboard intuitivo, permitindo que os gestores da CEMIG:<ul><li><strong>Monitorem a Saúde da Frota:</strong> Acompanhem o desempenho de cada bateria individualmente e em tempo real.</li><li><strong>Realizem Manutenção Preditiva:</strong> Substituam baterias com base em dados de performance, e não apenas no tempo de uso, evitando falhas inesperadas.</li><li><strong>Reduzam Custos:</strong> Aumentem a vida útil média dos ativos e otimizem o cronograma de compras, gerando uma economia significativa.</li></ul><p>Este projeto prova que a aplicação de tecnologia de diagnóstico inteligente pode gerar um enorme valor operacional e financeiro, mesmo na infraestrutura energética tradicional.</p>`,
        image_style: 'contain'
    },
    {
        title: 'Senai - Maturidade Tecnológica',
        publish_date: '2024-03-01',
        summary: 'Esforço colaborativo para elevar o nível de maturidade tecnológica (TRL) para um estágio próximo à escala industrial.',
        image_url: '/uploads/senai-maturidade-tecnologica.jpg',
        content: `<h3>Da Pesquisa à Indústria: Fortalecendo a Soberania Nacional</h3><p>Este esforço colaborativo com o <strong>Instituto Senai de Inovação (ISI) em Eletroquímica</strong> busca elevar o nível de maturidade tecnológica (TRL) e de fabricação (MRL) para um estágio próximo à escala industrial. O desafio é grande, mas os objetivos são claros: reduzir a dependência de importações, fortalecer a economia nacional e colocar o Brasil na vanguarda da tecnologia de baterias de íons-lítio.</p><p>O desenvolvimento das células de bateria será operacionalizado em uma <strong>planta piloto instalada no Campus da Indústria, em Curitiba, no Paraná</strong>. Esta iniciativa é um passo fundamental para transformar a pesquisa acadêmica em produtos comercializáveis, criando um ecossistema completo de inovação e produção no país.</p>`,
        image_style: 'contain'
    },
    {
        title: 'Sesi ODS ISG - Reciclagem de Painéis Solares',
        publish_date: '2023-10-18',
        summary: 'Desenvolvimento de um sistema integrado para separação de componentes de painéis fotovoltaicos.',
        image_url: '/uploads/sesi-ods-isg-economia-circular.jpg',
        content: `<h3>Expandindo a Economia Circular para o Setor Fotovoltaico</h3><p>Em parceria com o <strong>SENAI Maringá</strong>, este projeto, alinhado aos Objetivos de Desenvolvimento Sustentável (ODS) e às práticas de ESG, visa desenvolver um sistema integrado para a separação e reciclagem de componentes de painéis fotovoltaicos.</p><p>A solução envolve uma <strong>unidade transportável (container)</strong> equipada com todos os recursos necessários para viabilizar a economia circular diretamente no local de desmonte. O projeto explora a digitalização de processos, informações embarcadas e um sistema de comunicação avançado, garantindo eficiência e inovação nas operações de reciclagem e reaproveitamento de materiais valiosos dos painéis solares em fim de vida.</p>`,
        image_style: 'contain'
    },
    {
        title: 'Instituto Jaime Lerner - Smart Mobility',
        publish_date: '2024-04-05',
        summary: 'Parceria para o desenvolvimento de soluções de mobilidade urbana inteligente, aplicando baterias de silício-enxofre.',
        image_url: '/uploads/instituto-jaime-lerner-smart-mobility.jpg',
        content: `<h3>Pensando o Futuro das Cidades e da Mobilidade</h3><p>A parceria com o renomado <strong>Instituto Jaime Lerner</strong>, um dos maiores nomes do urbanismo mundial, posiciona a i9+ na discussão sobre o futuro das cidades inteligentes (Smart Cities). O foco desta colaboração é o desenvolvimento de soluções de mobilidade urbana que sejam não apenas eficientes, mas também sustentáveis e integradas ao tecido urbano.</p><p>Um dos pontos centrais da pesquisa é a aplicação de novas tecnologias de baterias, como as de <strong>silício-enxofre</strong>, em veículos elétricos leves. Essas baterias prometem maior densidade energética a um custo menor, sendo ideais para:<ul><li>Sistemas de compartilhamento de bicicletas e patinetes elétricos.</li><li>Veículos utilitários para entregas de "última milha" (last-mile delivery).</li><li>Transporte público de baixa capacidade.</li></ul><p>Esta parceria une a expertise em urbanismo do Instituto Jaime Lerner com a inovação em tecnologia de baterias da i9+, buscando criar soluções que melhorem a vida nas cidades de forma inteligente e sustentável.</p>`,
        image_style: 'contain'
    },
    {
        title: 'Reciclagem Hidrometalúrgica (Black Mass)',
        publish_date: '2024-05-15',
        summary: 'Parceria com o SENAI para desenvolver uma rota hidrometalúrgica nacional para reciclagem de "black mass" e recuperação de minerais críticos.',
        image_url: '/uploads/reciclagem-black-mass.jpg',
        content: `<h3>Reciclagem de Nível 3: Rota Hidrometalúrgica</h3><p>Levando a economia circular ao próximo nível, a i9+ Baterias, em colaboração com o Instituto Senai de Inovação em Eletroquímica, está desenvolvendo uma rota hidrometalúrgica proprietária para o processamento da <strong>"Massa Negra" (Black Mass)</strong>.</p><p>Enquanto a "Segunda Vida" (Second Life) reutiliza a bateria, a reciclagem hidrometalúrgica recupera os materiais valiosos quando a bateria chega ao fim absoluto de sua vida. Este processo permite:</p><ul><li><strong>Recuperação de Minerais Críticos:</strong> Extrair Lítio, Níquel, Cobalto e Manganês com alto grau de pureza a partir das baterias descartadas.</li><li><strong>Soberania Nacional:</strong> Reduzir a dependência do Brasil na importação desses materiais caros e estrategicamente importantes.</li><li><strong>Fechamento do Ciclo:</strong> Criar uma economia circular completa, onde os materiais de baterias velhas são usados para fabricar baterias novas, reduzindo drasticamente o impacto ambiental da mineração.</li></ul><p>Este projeto de P&D posiciona a i9+ como uma das poucas empresas no hemisfério sul com tecnologia completa para todo o ciclo de vida da bateria de lítio.</p>`,
        image_style: 'cover'
    }
];
const articlesData = [
    {
        title: 'O Futuro é Elétrico: Como a Economia Circular Impacta o Mercado de EVs',
        publish_date: '2024-01-10',
        summary: 'Analisamos como a requalificação de baterias está diminuindo custos e impulsionando a adoção de veículos elétricos no Brasil.',
        image_url: '/uploads/pexels-photo-1181298.jpeg',
        content: `<p>A ascensão dos veículos elétricos (EVs) ... (HTML completo aqui) ... chance de gerar valor.</p>`,
        image_style: 'cover'
    },
    {
        title: 'Deep Tech: Por que o Brasil precisa investir em P&D para baterias',
        publish_date: '2024-01-11',
        summary: 'Uma visão sobre a importância estratégica de desenvolver tecnologia nacional, como nossa parceria no programa Rota 2030.',
        image_url: '/uploads/pexels-photo-3861969.jpeg',
        content: `<p>O conceito de "Deep Tech" ... (HTML completo aqui) ... futuro da energia global.</p>`,
        image_style: 'cover'
    },
    {
        title: 'Case de Sucesso: O Diagnóstico de Baterias Chumbo-Ácido com a CEMIG',
        publish_date: '2024-01-09',
        summary: 'Entenda como nosso hardware e software proprietários estão ajudando a otimizar a gestão de ativos energéticos de grandes frotas.',
        image_url: '/uploads/pexels-photo-6803274.jpeg',
        content: `<p>A gestão eficiente de frotas ... (HTML completo aqui) ... valor econômico e operacional substancial.</p>`,
        image_style: 'cover'
    },
    {
        title: 'Big Data e I.A. na Gestão de Baterias: A Próxima Fronteira',
        publish_date: '2024-01-08',
        summary: 'Nossa plataforma de dados está revolucionando como o mercado entende e utiliza baterias. Conheça o projeto com CNPq e UTFPR.',
        image_url: '/uploads/pexels-photo-3861958.jpeg',
        content: `<p>No mundo da energia, dados são ouro... (HTML completo aqui) ... otimizando todo o ciclo de vida.</p>`,
        image_style: 'cover'
    }
];
const solutionsData = [
    {
        title: 'Second Life (Economia Circular)',
        publish_date: '2024-01-15',
        summary: 'Damos uma segunda vida a baterias usadas de VEs...',
        image_url: '/uploads/second-life.jpg',
        content: `<p>A economia circular é o coração da i9+ Baterias... (HTML completo aqui) ... inovação no setor de energia.</p>`,
        image_style: 'cover'
    },
    {
        title: 'Tecnologia de Diagnóstico',
        publish_date: '2024-01-14',
        summary: 'Desenvolvemos hardware e software avançados para medição precisa...',
        image_url: '/uploads/tecnologia-diagnostico.jpg',
        content: `<p>Na i9+ Baterias, a precisão é fundamental... (HTML completo aqui) ... ativos de bateria.</p>`,
        image_style: 'cover'
    },
    {
        title: 'Armazenamento Fotovoltaico',
        publish_date: '2024-01-13',
        summary: 'Integramos baterias de second life em sistemas fotovoltaicos...',
        image_url: '/uploads/armazenamento-fotovoltaico.jpg',
        content: `<p>A energia solar é uma fonte abundante... (HTML completo aqui) ... economicamente viável.</p>`,
        image_style: 'cover'
    },
    {
        title: 'Eletromobilidade',
        publish_date: '2024-01-12',
        summary: 'Focamos em soluções de hardware e software que impulsionam o futuro...',
        image_url: '/uploads/eletromobilidade.jpg',
        content: `<p>O futuro da mobilidade é elétrico... (HTML completo aqui) ... menos emissões.</p>`,
        image_style: 'cover'
    }
];

// --- FIM DOS DADOS ---

async function seedTable(client, tableName, dataArray) {
    console.log(`Verificando e inserindo dados para: ${tableName}...`);
    const query = `
        INSERT INTO ${tableName} 
        (title, slug, summary, image_url, content, image_style, publish_date) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (slug) DO NOTHING;
    `.trim();

    for (const item of dataArray) {
        const slug = slugify(item.title);
        await client.query(query, [
            item.title,
            slug,
            item.summary,
            item.image_url,
            item.content,
            item.image_style || 'cover',
            item.publish_date
        ]);
    }
    console.log(`Dados de ${tableName} sincronizados.`);
}

async function initializeDatabase() {
    const client = new pg.Client(connectionConfig);
    try {
        await client.connect();
        console.log('Conectado ao PostgreSQL com sucesso.');

        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(100) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS artigos (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                publish_date DATE DEFAULT NULL,
                slug VARCHAR(255) NOT NULL UNIQUE,
                summary TEXT,
                image_url VARCHAR(500),
                content TEXT NOT NULL,
                image_style VARCHAR(20) DEFAULT 'cover',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS projetos (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                publish_date DATE DEFAULT NULL,
                slug VARCHAR(255) NOT NULL UNIQUE,
                summary TEXT,
                image_url VARCHAR(500),
                content TEXT NOT NULL,
                image_style VARCHAR(20) DEFAULT 'cover',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS solucoes (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                publish_date DATE DEFAULT NULL,
                slug VARCHAR(255) NOT NULL UNIQUE,
                summary TEXT,
                image_url VARCHAR(500),
                content TEXT NOT NULL,
                image_style VARCHAR(20) DEFAULT 'cover',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(50),
                message TEXT,
                is_read BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log('Todas as tabelas foram criadas ou já existem.');

        await seedTable(client, 'projetos', projectsData);
        await seedTable(client, 'artigos', articlesData);
        await seedTable(client, 'solucoes', solutionsData);

        console.log('Sincronização de dados iniciais completa.');

    } catch (error) {
        console.error('Falha ao inicializar o banco de dados:', error);
        process.exit(1);
    } finally {
        await client.end();
    }
}

// --- Criação do POOL de Conexões ---
// Passamos a configuração de conexão explícita para o Pool.
const pool = new pg.Pool(connectionConfig);

// Exportações
export { pool, initializeDatabase };
export default pool;


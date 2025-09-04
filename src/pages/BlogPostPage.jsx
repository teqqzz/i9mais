import React from 'react';
import { useParams, Link } from 'react-router-dom';

const postsData = {
    'futuro-eletrico-economia-circular': {
        title: 'O Futuro é Elétrico: Como a Economia Circular Impacta o Mercado de EVs',
        image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        content: `
            <p>A ascensão dos veículos elétricos (EVs) representa uma das maiores transformações na história da mobilidade. No entanto, com a euforia da eletrificação, surge uma questão crítica: o que fazer com as milhões de baterias que chegarão ao fim de sua vida útil automotiva? A resposta está na <strong>economia circular</strong>, um pilar fundamental da atuação da i9+ Baterias.</p>
            <p>Nosso processo de "Second Life" não é apenas reciclagem; é requalificação. Utilizando nossa tecnologia de diagnóstico avançada, avaliamos o Estado de Saúde (SoH) de cada bateria. As que mantêm mais de 70-80% de sua capacidade original são perfeitamente viáveis para aplicações menos exigentes, como sistemas de armazenamento de energia solar (BESS) e no-breaks industriais. Isso não apenas evita o descarte prematuro, mas também reduz drasticamente o custo de soluções de energia limpa, democratizando o acesso e impulsionando um ciclo verdadeiramente sustentável.</p>
            <h3>A Contribuição da i9+ para o Mercado de EVs</h3>
            <p>Na i9+, estamos na vanguarda dessa revolução. Nossas soluções permitem que fabricantes de veículos, frotistas e integradores de energia renovem e reutilizem baterias, contribuindo para:
                <ul>
                    <li><strong>Redução de Custos:</strong> Baterias de second life são significativamente mais baratas que novas, barateando o custo final de soluções de energia.</li>
                    <li><strong>Sustentabilidade:</strong> Minimizamos a pegada de carbono e o impacto ambiental da extração de novos materiais.</li>
                    <li><strong>Inovação Tecnológica:</strong> Nosso software e hardware proprietários garantem a segurança e eficiência das baterias requalificadas.</li>
                </ul>
            </p>
            <p>O futuro é elétrico e circular. A i9+ está construindo a infraestrutura e o conhecimento para que o Brasil lidere essa transformação, garantindo que cada bateria tenha uma segunda, e talvez até terceira, chance de gerar valor.</p>
        `
    },
    'deep-tech-investimento-pd': {
        title: 'Deep Tech: Por que o Brasil precisa investir em P&D para baterias',
        image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        content: `
            <p>O conceito de "Deep Tech" refere-se a empresas com tecnologias disruptivas baseadas em descobertas científicas e inovações de engenharia significativas. No setor de baterias, isso significa ir além da simples montagem, focando no desenvolvimento de materiais, processos e algoritmos que transformam fundamentalmente como a energia é armazenada e gerenciada.</p>
            <p>O Brasil, com seu vasto potencial em energia renovável e crescente demanda por eletrificação, tem uma oportunidade única de se posicionar como líder em Deep Tech de baterias. A i9+ é um exemplo concreto desse investimento, participando ativamente de programas como o <strong>Rota 2030</strong>.</p>
            <h3>Nosso Compromisso com P&D Nacional</h3>
            <p>Através de parcerias estratégicas com instituições como EMBRAPII, SENAI, UTFPR e CNPq, a i9+ desenvolve:
                <ul>
                    <li><strong>Traçadores de Curva I-V:</strong> Dispositivos que realizam diagnósticos de precisão em baterias.</li>
                    <li><strong>Software de Gestão Inteligente:</strong> Plataformas que usam Big Data e IA para prever a vida útil e otimizar o desempenho.</li>
                    <li><strong>Novos Modelos de Negócio:</strong> Fomentando a economia circular e a sustentabilidade no país.</li>
                </ul>
            </p>
            <p>Investir em P&D para baterias não é apenas uma questão de inovação, mas de soberania tecnológica. É garantir que o Brasil não apenas consuma, mas também produza e exporte o conhecimento e as soluções que moldarão o futuro da energia global.</p>
        `
    },
    'case-sucesso-diagnostico-cemig': {
        title: 'Case de Sucesso: O Diagnóstico de Baterias Chumbo-Ácido com a CEMIG',
        image: 'https://images.pexels.com/photos/6803274/pexels-photo-6803274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        content: `
            <p>A gestão eficiente de frotas, especialmente aquelas que dependem de baterias de grande porte como as de chumbo-ácido, é um desafio complexo. A <strong>CEMIG</strong>, uma das maiores empresas de energia do Brasil, enfrentava questões relacionadas à durabilidade e desempenho de suas baterias em sistemas de suporte e veículos utilitários.</p>
            <p>A i9+ Baterias foi contratada para implementar uma solução de diagnóstico e gestão baseada em nosso hardware e software proprietários, desenhados para trazer inteligência e otimização para a operação.</p>
            <h3>Resultados e Impacto</h3>
            <p>Com a nossa intervenção, a CEMIG conseguiu:
                <ul>
                    <li><strong>Aumentar a Vida Útil das Baterias:</strong> Diagnósticos precisos permitiram identificar problemas precocemente e realizar manutenções preventivas mais eficazes.</li>
                    <li><strong>Reduzir Custos Operacionais:</strong> Menos substituições de baterias e otimização de performance resultaram em economia significativa.</li>
                    <li><strong>Otimizar a Alocação de Ativos:</strong> Com dados claros sobre o Estado de Saúde (SoH) das baterias, a CEMIG pôde realocar e planejar o uso de seus recursos de forma mais inteligente.</li>
                </ul>
            </p>
            <p>Este case com a CEMIG demonstra o impacto real de nossa tecnologia em ambientes industriais, provando que a inovação em gestão de baterias gera valor econômico e operacional substancial.</p>
        `
    },
    'big-data-ia-gestao-baterias': {
        title: 'Big Data e I.A. na Gestão de Baterias: A Próxima Fronteira',
        image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        content: `
            <p>No mundo da energia, dados são ouro. A capacidade de coletar, analisar e interpretar grandes volumes de informações (Big Data) sobre o comportamento das baterias, aliada à inteligência artificial (IA), está abrindo novas fronteiras na gestão de energia.</p>
            <p>Na i9+ Baterias, desenvolvemos uma plataforma de dados robusta em parceria com o <strong>CNPq</strong> e a <strong>UTFPR</strong>. Esta plataforma é capaz de processar informações de milhares de baterias em tempo real, fornecendo insights preditivos e prescritivos sobre sua saúde e desempenho.</p>
            <h3>Como Nossa Plataforma Funciona:</h3>
            <ul>
                <li><strong>Coleta Inteligente:</strong> Sensores e diagnósticos coletam dados contínuos de baterias em operação.</li>
                <li><strong>Análise Preditiva com IA:</strong> Algoritmos de IA analisam padrões para prever falhas e otimizar ciclos de carga/descarga.</li>
                <li><strong>Otimização de Vida Útil:</strong> Recomendamos ações para prolongar a vida útil das baterias, maximizando o retorno sobre o investimento.</li>
                <li><strong>Decisão Baseada em Dados:</strong> Nossos clientes têm acesso a dashboards intuitivos com informações cruciais para a tomada de decisões estratégicas.</li>
            </ul>
            <p>Esta é a próxima geração da gestão de energia, onde a precisão dos dados e a inteligência da IA garantem que cada bateria seja utilizada em seu potencial máximo, minimizando desperdícios e otimizando todo o ciclo de vida.</p>
        `
    },
};

export function BlogPostPage() {
    const { slug } = useParams();
    const post = postsData[slug];

    if (!post) {
        return <div className="container page-content"><h2>Post não encontrado!</h2></div>;
    }

    return (
        <div className="page-container">
            <div className="page-header" style={{ backgroundImage: `url('${post.image}')` }}>
                <h1>{post.title}</h1>
            </div>
            <div className="container page-content">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                <Link to="/" className="cta-button back-button">Voltar para a Home</Link>
            </div>
        </div>
    );
}
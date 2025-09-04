import React from 'react';
import { useParams, Link } from 'react-router-dom';


const solutionsData = {
    'second-life': {
        title: 'Second Life (Economia Circular)',
        image: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-brasil-v1-0-5%2F725%2F1528725%2F01Y0yIm7%2F0c99d7a0379846a19e9da030eae2244d&methods=resize%2C600%2C5000',
        content: `
            <p>A economia circular é o coração da i9+ Baterias. O nosso processo de <strong>Second Life</strong> é uma abordagem de engenharia avançada para maximizar o valor de cada bateria. Em vez do descarte prematuro, aplicamos nossa tecnologia de diagnóstico para avaliar com precisão a capacidade remanescente e a segurança de baterias que não servem mais para aplicações automotivas.</p>
            <p>As células e módulos aprovados são reconfigurados e integrados em novos sistemas de armazenamento de energia (BESS), ideais para:
            <ul>
                <li>Armazenamento de energia de painéis solares.</li>
                <li>Sistemas de no-break para indústrias e comércios.</li>
                <li>Projetos de eletrificação em comunidades remotas.</li>
            </ul>
            Esta abordagem não apenas reduz o lixo eletrônico e a necessidade de mineração de novos materiais, mas também torna a energia sustentável mais acessível e economicamente viável. Nossa visão é transformar o resíduo em recurso, impulsionando a sustentabilidade e a inovação no setor de energia.</p>
        `
    },
    'tecnologia-diagnostico': {
        title: 'Tecnologia de Diagnóstico',
        image: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-brasil-v1-0-5%2F725%2F1528725%2F01Y0yIm7%2F46b86cd529504bc6a03ea8b3d00390e9&methods=crop%2C0%25%2C24.0006%25%2C100%25%2C47.9616%25%7Cresize%2C600%2C5000',
        content: `
            <p>Na i9+ Baterias, a precisão é fundamental. Desenvolvemos hardware (como o Traçador de Curva I-V) e software avançados para realizar diagnósticos completos em baterias. Nossa tecnologia permite medir com exatidão o <strong>Estado de Saúde (SoH)</strong> e a vida útil restante das baterias, desde células individuais até packs complexos.</p>
            <p>Nossas soluções B2B são desenhadas para:
            <ul>
                <li><strong>Fabricantes de Baterias:</strong> Otimizar processos de produção e controle de qualidade.</li>
                <li><strong>Grandes Frotas:</strong> Aumentar a eficiência e prolongar a vida útil das baterias em veículos e equipamentos.</li>
                <li><strong>Empresas de Energia:</strong> Gerenciar ativos energéticos de forma mais inteligente e preventiva.</li>
                <li><strong>Pesquisadores:</strong> Obter dados precisos para desenvolvimento e inovação.</li>
            </ul>
            Com a i9+, você tem a certeza de dados confiáveis para tomar decisões estratégicas, garantindo segurança, eficiência e um melhor retorno sobre o investimento em ativos de bateria.</p>
        `
    },
    'armazenamento-fotovoltaico': {
        title: 'Armazenamento Fotovoltaico',
        image: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-brasil-v1-0-5%2F725%2F1528725%2F01Y0yIm7%2F4c3ebbdd05c047cd9d84aab4d3e5e0b6&methods=crop%2C17.6867%25%2C17.4243%25%2C74.3494%25%2C55.7839%25%7Cresize%2C600%2C5000',
        content: `
            <p>A energia solar é uma fonte abundante, mas sua intermitência exige soluções de armazenamento eficientes. A i9+ Baterias integra suas baterias de <strong>Second Life</strong> em sistemas fotovoltaicos, oferecendo soluções de armazenamento de energia limpa e acessível.</p>
            <p>Nossos projetos sustentáveis são ideais para:
            <ul>
                <li><strong>Residências:</strong> Redução da dependência da rede elétrica e maior autonomia.</li>
                <li><strong>Empresas e Indústrias:</strong> Otimização do consumo, redução de picos de demanda e garantia de energia.</li>
                <li><strong>Comunidades Remotas:</strong> Acesso à energia elétrica em locais sem infraestrutura, promovendo desenvolvimento social e econômico.</li>
                <li><strong>Smart Grids:</strong> Contribuição para a estabilidade e eficiência de redes elétricas inteligentes.</li>
            </ul>
            Com o armazenamento fotovoltaico da i9+, você não apenas aproveita a energia do sol, mas também garante sua disponibilidade 24 horas por dia, de forma sustentável e economicamente viável.</p>
        `
    },
    'eletromobilidade': {
        title: 'Eletromobilidade',
        image: 'https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-brasil-v1-0-5%2F725%2F1528725%2F01Y0yIm7%2Fca0d9abfda7f4f4f902de283a7806877&methods=resize%2C600%2C5000',
        content: `
            <p>O futuro da mobilidade é elétrico, e a i9+ Baterias está na vanguarda dessa transformação. Focamos no desenvolvimento de soluções em hardware e software que otimizam a performance e a vida útil das baterias em veículos elétricos (VEs) e sistemas de eletromobilidade em geral.</p>
            <p>Nossas inovações na eletromobilidade incluem:
            <ul>
                <li><strong>Diagnóstico Avançado:</strong> Ferramentas precisas para monitorar a saúde das baterias de VEs.</li>
                <li><strong>Gestão Térmica Otimizada:</strong> Soluções para manter as baterias na temperatura ideal, prolongando sua vida e desempenho.</li>
                <li><strong>Sistemas de Carregamento Inteligente:</strong> Plataformas que otimizam o carregamento para maximizar a eficiência e a durabilidade.</li>
                <li><strong>Baterias de Second Life para VEs Leves:</strong> Desenvolvimento de soluções acessíveis para scooters, bicicletas elétricas e veículos de baixa velocidade.</li>
            </ul>
            Trabalhamos para tornar a mobilidade elétrica mais acessível, eficiente e sustentável, impulsionando a adoção de veículos elétricos e contribuindo para um futuro com menos emissões.</p>
        `
    },
};

export function SolutionPage() {
    const { slug } = useParams();
    const solution = solutionsData[slug];

    if (!solution) {
        return <div className="container page-content"><h2>Solução não encontrada!</h2></div>;
    }

    return (
        <div className="page-container">
            <div className="page-header" style={{ backgroundImage: `url('${solution.image}')` }}>
                <h1>{solution.title}</h1>
            </div>
            <div className="container page-content">
                <div dangerouslySetInnerHTML={{ __html: solution.content }} />
                <Link to="/" className="cta-button back-button">Voltar para a Home</Link>
            </div>
        </div>
    );
}
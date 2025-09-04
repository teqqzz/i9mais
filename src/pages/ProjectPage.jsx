import React from 'react';
import { useParams, Link } from 'react-router-dom';

const projectsData = {
    'ageuni-mini-usinas': {
        title: 'Ageuni - Mini Usinas Solares',
        image: 'https://images.pexels.com/photos/10323945/pexels-photo-10323945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        content: `
            <h3>Impacto Social e Sustentabilidade em Ação</h3>
            <p>Em parceria com a Agência de Desenvolvimento Regional Sustentável (Ageuni), a i9+ Baterias demonstrou na prática o poder da economia circular. O projeto consistiu na instalação de duas mini usinas solares de 3.5 kW em comunidades remotas, locais onde o acesso à rede elétrica convencional é um desafio logístico e financeiro.</p>
            <p>O grande diferencial deste projeto foi a utilização de <strong>baterias de "Second Life"</strong>, requalificadas a partir de baterias de veículos elétricos. Essa abordagem permitiu:
            <ul>
                <li><strong>Democratizar o Acesso:</strong> Reduzir drasticamente o custo do sistema de armazenamento, tornando a energia solar uma realidade viável para essas comunidades.</li>
                <li><strong>Promover a Sustentabilidade:</strong> Evitar o descarte de baterias ainda funcionais, aplicando os princípios da economia circular e reduzindo o impacto ambiental.</li>
                <li><strong>Garantir a Autonomia:</strong> Fornecer uma fonte de energia estável e limpa, impulsionando o desenvolvimento local e a qualidade de vida.</li>
            </ul>
            <p>O projeto incluiu a entrega de documentação digital completa e certificações, garantindo a longevidade e o suporte técnico contínuo das instalações.</p>
        `
    },
    'embrapii-tracador-curva': {
        title: 'EMBRAPII - Traçador de Curva I-V',
        image: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        content: `
            <h3>Inovação em Nível de Hardware para um Diagnóstico Preciso</h3>
            <p>A parceria com a EMBRAPII (Empresa Brasileira de Pesquisa e Inovação Industrial) e o Instituto Federal solidifica a i9+ como uma Deep Tech. O fruto deste projeto é o <strong>Traçador de Curva I-V</strong>, um equipamento de hardware e software desenvolvido internamente para realizar um "eletrocardiograma" de baterias.</p>
            <p>Este dispositivo inovador mede com altíssima precisão a relação entre Corrente Elétrica (I) e Tensão Elétrica (V), permitindo uma análise profunda do Estado de Saúde (SoH) e da performance real de uma bateria. A tecnologia é crucial para:
            <ul>
                <li><strong>Controle de Qualidade na Indústria:</strong> Permitir que fabricantes validem a qualidade de suas células e packs de bateria.</li>
                <li><strong>Segurança na Requalificação:</strong> Garantir que apenas as baterias seguras e eficientes sejam selecionadas para o processo de "Second Life".</li>
                <li><strong>Manutenção Preditiva:</strong> Possibilitar que grandes frotas e indústrias monitorem seus ativos e prevejam falhas antes que aconteçam.</li>
            </ul>
            <p>O desenvolvimento envolveu prototipagem avançada e testes rigorosos em laboratório, resultando em uma tecnologia proprietária que nos coloca na vanguarda do diagnóstico de baterias no Brasil.</p>
        `
    },
    'cnpq-utfpr-plataforma-dados': {
        title: 'CNPq & UTFPR - Plataforma de Dados',
        image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        content: `
            <h3>Inteligência Artificial para o Ecossistema de Eletromobilidade</h3>
            <p>O mercado de veículos elétricos está crescendo exponencialmente, mas a falta de padronização e de informações centralizadas sobre baterias é um grande obstáculo. Em colaboração com o CNPq (Conselho Nacional de Desenvolvimento Científico e Tecnológico) e a UTFPR (Universidade Tecnológica Federal do Paraná), a i9+ está liderando a criação de uma plataforma de dados pioneira.</p>
            <p>O objetivo é construir o maior banco de dados sobre baterias de lítio do mercado brasileiro, integrando tecnologias de <strong>Big Data e Inteligência Artificial</strong> para:
            <ul>
                <li><strong>Conectar o Ecossistema:</strong> Unir fabricantes, usuários, demandantes e fornecedores de baterias em uma única plataforma.</li>
                <li><strong>Otimizar Processos:</strong> Facilitar a logística reversa e o reuso de baterias em larga escala.</li>
                <li><strong>Promover a Padronização:</strong> Gerar insights que ajudem a padronizar produtos e componentes, aumentando a segurança e a eficiência do mercado.</li>
                <li><strong>Facilitar a Tomada de Decisão:</strong> Fornecer dados valiosos para empresas e governo tomarem decisões estratégicas sobre o futuro da eletromobilidade no país.</li>
            </ul>
            <p>Este projeto transforma dados brutos em inteligência estratégica, pavimentando o caminho para um mercado de veículos elétricos mais organizado, seguro e sustentável.</p>
        `
    },
    'cemig-gestao-ativos': {
        title: 'CEMIG - Gestão de Ativos Energéticos',
        image: 'https://images.pexels.com/photos/6803274/pexels-photo-6803274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        content: `
            <h3>Prolongando a Vida Útil e Reduzindo Custos para Grandes Frotas</h3>
            <p>A expertise da i9+ não se limita às baterias de lítio. Em um projeto estratégico com a CEMIG, uma das maiores concessionárias de energia do Brasil, desenvolvemos uma solução integrada para o diagnóstico preciso de <strong>baterias chumbo-ácido</strong>, amplamente utilizadas em veículos a combustão e aplicações estacionárias (como no-breaks).</p>
            <p>Nossa solução combina hardware e software proprietários para medir resistência interna (Ohms), tensão (Volts) e temperatura (°C), fornecendo um panorama claro sobre o estado de vida real das baterias. O projeto incluiu a criação de um dashboard intuitivo, permitindo que os gestores da CEMIG:
            <ul>
                <li><strong>Monitorem a Saúde da Frota:</strong> Acompanhem o desempenho de cada bateria individualmente e em tempo real.</li>
                <li><strong>Realizem Manutenção Preditiva:</strong> Substituam baterias com base em dados de performance, e não apenas no tempo de uso, evitando falhas inesperadas.</li>
                <li><strong>Reduzam Custos:</strong> Aumentem a vida útil média dos ativos e otimizem o cronograma de compras, gerando uma economia significativa.</li>
            </ul>
            <p>Este projeto prova que a aplicação de tecnologia de diagnóstico inteligente pode gerar um enorme valor operacional e financeiro, mesmo na infraestrutura energética tradicional.</p>
        `
    }
};


export function ProjectPage() {
    const { slug } = useParams();
    const project = projectsData[slug];

    if (!project) {
        return (
            <div className="container page-content">
                <h2>Projeto não encontrado!</h2>
                <Link to="/" className="cta-button back-button">Voltar para a Home</Link>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="page-header" style={{ backgroundImage: `url('${project.image}')` }}>
                <h1>{project.title}</h1>
            </div>
            <div className="container page-content">
                <div dangerouslySetInnerHTML={{ __html: project.content }} />
                <Link to="/#projetos" className="cta-button back-button">Ver outros projetos</Link>
            </div>
        </div>
    );
}
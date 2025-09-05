import React from 'react';
import { useParams, Link } from 'react-router-dom';

const projectsData = {
    'tecpar-tracador-curva-solar': {
        title: 'Tecpar - Traçador de Curva para Painéis Solares',
        image: '/src/images/tecpar-tracador-curva-solar.jpg',
        content: `
            <h3>Validando a Segunda Vida da Energia Solar</h3>
            <p>Em um projeto inovador com o apoio do Instituto de Tecnologia do Paraná (Tecpar), a i9+ Baterias está desenvolvendo um equipamento nacional de baixo custo para avaliar a eficiência e a degradação de painéis solares. Este <strong>Traçador de Curva IxV</strong> é fundamental para a economia circular no setor fotovoltaico.</p>
            <p>Muitos painéis solares descartados ainda possuem uma vida útil significativa. Nossa tecnologia permite:
            <ul>
                <li><strong>Diagnosticar com Precisão:</strong> Medir o potencial real de geração de energia de cada painel usado.</li>
                <li><strong>Criar Módulos Requalificados:</strong> Agrupar painéis com a mesma capacidade de geração para criar novas estações fotovoltaicas de "second life".</li>
                <li><strong>Reduzir Custos:</strong> Oferecer uma alternativa de energia solar muito mais acessível, aproveitando ativos que seriam descartados.</li>
            </ul>
            <p>Incubada no Tecpar, a i9+ utiliza este projeto para fortalecer a sustentabilidade e a eficiência na geração de energia solar, transformando o que seria lixo em um recurso valioso.</p>
        `
    },
    'ageuni-mini-usinas': {
        title: 'Ageuni - Mini Usinas Solares',
        image: '/src/images/ageuni-mini-usinas.jpg',
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
    'embrapii-tracador-curva-baterias': {
        title: 'EMBRAPII - Traçador de Curva para Baterias',
        image: '/src/images/embrapii-tracador-curva.jpg',
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
        image: '/src/images/cnpq-utfpr-plataforma-dados.jpg',
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
        image: '/src/images/cemig-gestao-ativos.jpg',
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
    },
    'rota-2030-pd-baterias': {
        title: 'Rota 2030 - P&D em Baterias',
        image: '/src/images/rota-2030-pd-baterias.jpg',
        content: `
            <h3>Desenvolvendo a Próxima Geração de Baterias no Brasil</h3>
            <p>O programa <strong>Rota 2030</strong> é uma iniciativa estratégica do governo federal para impulsionar a competitividade e a inovação no setor automotivo brasileiro. A i9+ Baterias é um ator chave neste ecossistema, focando no desenvolvimento de pesquisa e desenvolvimento (P&D) de ponta para a cadeia de baterias.</p>
            <p>Nosso envolvimento visa atacar um dos maiores gargalos da indústria nacional: a dependência de tecnologia e componentes importados. Em colaboração com parceiros estratégicos, estamos investindo em:
            <ul>
                <li><strong>Novos Materiais e Químicas:</strong> Pesquisa de materiais alternativos para cátodos e ânodos que possam ser produzidos localmente.</li>
                <li><strong>Otimização de Células:</strong> Engenharia de novas configurações de células de bateria para aumentar a densidade energética e a segurança.</li>
                <li><strong>Processos de Manufatura:</strong> Desenvolvimento de técnicas de produção mais eficientes e sustentáveis para a montagem de packs de bateria.</li>
            </ul>
            <p>Ao investir em P&D através do Rota 2030, a i9+ não está apenas criando produtos melhores, mas também ajudando a construir uma base tecnológica sólida para que o Brasil se torne autônomo e um polo de inovação no mercado global de energia e mobilidade elétrica.</p>
        `
    },
    'senai-maturidade-tecnologica': {
        title: 'Senai - Rumo à Produção Industrial',
        image: '/src/images/senai-maturidade-tecnologica.jpg',
        content: `
            <h3>Da Pesquisa à Indústria: Fortalecendo a Soberania Nacional</h3>
            <p>Este esforço colaborativo com o <strong>Instituto Senai de Inovação (ISI) em Eletroquímica</strong> busca elevar o nível de maturidade tecnológica (TRL) e de fabricação (MRL) para um estágio próximo à escala industrial. O desafio é grande, mas os objetivos são claros: reduzir a dependência de importações, fortalecer a economia nacional e colocar o Brasil na vanguarda da tecnologia de baterias de íons-lítio.</p>
            <p>O desenvolvimento das células de bateria será operacionalizado em uma <strong>planta piloto instalada no Campus da Indústria, em Curitiba, no Paraná</strong>. Esta iniciativa é um passo fundamental para transformar a pesquisa acadêmica em produtos comercializáveis, criando um ecossistema completo de inovação e produção no país.</p>
        `
    },
    'sesi-ods-isg-economia-circular': {
        title: 'Sesi ODS ISG - Reciclagem de Painéis Solares',
        image: '/src/images/sesi-ods-isg-economia-circular.jpg',
        content: `
            <h3>Expandindo a Economia Circular para o Setor Fotovoltaico</h3>
            <p>Em parceria com o <strong>SENAI Maringá</strong>, este projeto, alinhado aos Objetivos de Desenvolvimento Sustentável (ODS) e às práticas de ESG, visa desenvolver um sistema integrado para a separação e reciclagem de componentes de painéis fotovoltaicos.</p>
            <p>A solução envolve uma <strong>unidade transportável (container)</strong> equipada com todos os recursos necessários para viabilizar a economia circular diretamente no local de desmonte. O projeto explora a digitalização de processos, informações embarcadas e um sistema de comunicação avançado, garantindo eficiência e inovação nas operações de reciclagem e reaproveitamento de materiais valiosos dos painéis solares em fim de vida.</p>
        `
    },
    'instituto-jaime-lerner-smart-mobility': {
        title: 'Instituto Jaime Lerner - Smart Mobility',
        image: '/src/images/instituto-jaime-lerner-smart-mobility.jpg',
        content: `
            <h3>Pensando o Futuro das Cidades e da Mobilidade</h3>
            <p>A parceria com o renomado <strong>Instituto Jaime Lerner</strong>, um dos maiores nomes do urbanismo mundial, posiciona a i9+ na discussão sobre o futuro das cidades inteligentes (Smart Cities). O foco desta colaboração é o desenvolvimento de soluções de mobilidade urbana que sejam não apenas eficientes, mas também sustentáveis e integradas ao tecido urbano.</p>
            <p>Um dos pontos centrais da pesquisa é a aplicação de novas tecnologias de baterias, como as de <strong>silício-enxofre</strong>, em veículos elétricos leves. Essas baterias prometem maior densidade energética a um custo menor, sendo ideais para:
            <ul>
                <li>Sistemas de compartilhamento de bicicletas e patinetes elétricos.</li>
                <li>Veículos utilitários para entregas de "última milha" (last-mile delivery).</li>
                <li>Transporte público de baixa capacidade.</li>
            </ul>
            <p>Esta parceria une a expertise em urbanismo do Instituto Jaime Lerner com a inovação em tecnologia de baterias da i9+, buscando criar soluções que melhorem a vida nas cidades de forma inteligente e sustentável.</p>
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
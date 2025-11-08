import React, { useState, useEffect } from "react";
import { API_URL } from '@/config';
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Hero } from "../components/Hero";
import { SolutionsSection } from "../components/SolutionsSection";
import { ProjectCarousel } from "../components/ProjectCarousel";
import { BlogCarousel } from "../components/BlogCarousel";
import { ContactAndAbout } from "../components/ContactAndAbout";
import { UniqueApproachSection } from "../components/UniqueApproachSection";
import { ImpactDashboard } from "../components/ImpactDashboard";
import { RoiCalculator } from "../components/RoiCalculator";
import { SavingsCalculator } from "../components/SavingsCalculator";

// 1. Componente para o novo "Bloco de Texto Customizado"
function CustomTextBlock({ content }) {
    return (
        <section className="unique-approach-section" style={{ backgroundColor: 'var(--background-light)' }}>
            <div className="container">
                <h2 className="section-title">{content.title}</h2>
                <div 
                    className="page-content" 
                    style={{ maxWidth: '900px', padding: '0 20px' }}
                    dangerouslySetInnerHTML={{ __html: content.content }} 
                />
            </div>
        </section>
    );
}

// 2. Mapeia as chaves do banco para os componentes React
const componentMap = {
    hero: (content) => <Hero content={content} />,
    solutions: () => <SolutionsSection />,
    unique_approach: (content) => <UniqueApproachSection content={content} />,
    impact: () => <ImpactDashboard />,
    projects: () => <ProjectCarousel />,
    calculator: () => (
        <section id="calculadora" className="calculators-section">
            <div className="container">
                <div className="section-title text-center mb-12">
                    <h2>Calcule seu ROI e Sustentabilidade</h2>
                    <p className="max-w-3xl mx-auto">
                        Use nossas ferramentas para simular o potencial de economia.
                    </p>
                </div>
                <div className="calculators-grid">
                    <RoiCalculator />
                    <SavingsCalculator />
                </div>
            </div>
        </section>
    ),
    blog: () => <BlogCarousel />,
    contact: () => <ContactAndAbout />,
    custom_text: (content) => <CustomTextBlock content={content} />, // Mapeia o novo bloco
};

export function HomePage() {
    const [layout, setLayout] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${API_URL}/api/home-layout`)
            .then(res => res.json())
            .then(data => {
                setLayout(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Erro ao buscar layout da home:", err);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div style={{ height: '100vh' }}><LoadingSpinner /></div>;
    }

   return (
      <>
            {layout.map(section => {
                // Acha o componente correspondente no mapa
                const Component = componentMap[section.component_key];
                // Renderiza o componente, passando os dados de conteúdo para ele
                return Component ? Component(section.content_data) : null;
            })}
      </>
   );
}
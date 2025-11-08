import React from "react";
import { useHomeContent } from "../hooks/useHomeContent";
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

function CustomTextBlock({ content }) {
    if (!content) return null;
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

const componentMap = {
    hero: ({ content }) => <Hero content={content} />,
    solutions: () => <SolutionsSection />,
    unique_approach: ({ content }) => <UniqueApproachSection content={content} />,
    impact: ({ allData }) => <ImpactDashboard impactData={allData.impactData} />,
    projects: () => <ProjectCarousel />,
    calculator: ({ allData }) => (
        <section id="calculadora" className="calculators-section">
            <div className="container">
                <div className="section-title text-center mb-12">
                    <h2>Calcule seu ROI e Sustentabilidade</h2>
                    <p className="max-w-3xl mx-auto">
                        Use nossas ferramentas para simular o potencial de economia.
                    </p>
                </div>
                <div className="calculators-grid">
                    <RoiCalculator calculatorPrices={allData.calculatorPrices} />
                    <SavingsCalculator calculatorPrices={allData.calculatorPrices} />
                </div>
            </div>
        </section>
    ),
    blog: () => <BlogCarousel />,
    contact: ({ content }) => <ContactAndAbout content={content} />,
    custom_text: ({ content }) => <CustomTextBlock content={content} />,
};

export function HomePage() {
    const { layout, impactData, calculatorPrices, isLoading, error } = useHomeContent();

    if (isLoading) {
        return <div style={{ height: '100vh' }}><LoadingSpinner /></div>;
    }
    
    if (error) {
        return <div className="container page-content"><h2>Erro ao carregar o site: {error.message}</h2></div>;
    }

   return (
      <>
            {layout.map(section => {
                const Component = componentMap[section.component_key];
                const allData = { impactData, calculatorPrices };
                
                if (!Component) {
                    console.warn(`Componente não encontrado para a chave: ${section.component_key}`);
                    return null;
                }
                
                return <Component key={section.id} content={section.content_data} allData={allData} />;
            })}
      </>
   );
}
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

// 1. Mapeia as chaves do banco de dados para os componentes React
const componentMap = {
    hero: Hero,
    solutions: SolutionsSection,
    unique_approach: UniqueApproachSection,
    impact: ImpactDashboard,
    projects: ProjectCarousel,
    calculator: () => ( // Agrupa as duas calculadoras
        <section id="calculadora" className="calculators-section">
            <div className="container">
                <div className="section-title text-center mb-12">
                    <h2>Calcule seu ROI e Sustentabilidade</h2>
                    <p className="max-w-3xl mx-auto">
                        Use nossas ferramentas para simular o potencial de economia ao
                        optar pela tecnologia "Second Life" da i9+.
                    </p>
                </div>
                <div className="calculators-grid">
                    <RoiCalculator />
                    <SavingsCalculator />
                </div>
            </div>
        </section>
    ),
    blog: BlogCarousel,
    contact: ContactAndAbout,
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
        return <LoadingSpinner />;
    }

   return (
      <>
            {/* 2. Itera sobre o layout vindo da API e renderiza os componentes na ordem correta */}
            {layout.map(section => {
                const Component = componentMap[section.component_key];
                return Component ? <Component key={section.component_key} /> : null;
            })}
      </>
   );
}
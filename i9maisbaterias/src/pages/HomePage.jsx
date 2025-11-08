import React from "react";
import { Hero } from "../components/Hero";
import { SolutionsSection } from "../components/SolutionsSection";
import { ProjectCarousel } from "../components/ProjectCarousel";
import { BlogCarousel } from "../components/BlogCarousel";
import { ContactAndAbout } from "../components/ContactAndAbout";
import { UniqueApproachSection } from "../components/UniqueApproachSection";
import { ImpactDashboard } from "../components/ImpactDashboard";
import { RoiCalculator } from "../components/RoiCalculator";
import { SavingsCalculator } from "../components/SavingsCalculator";

export function HomePage() {
 return (
  <>
      {/* Não é necessário um <Helmet> aqui, usará o defaultTitle do App.jsx */}
   <Hero />
   <SolutionsSection />
   <UniqueApproachSection />
   <ImpactDashboard />
   <ProjectCarousel />
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
   <BlogCarousel />
   <ContactAndAbout />
  </>
 );
}
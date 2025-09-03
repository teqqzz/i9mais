import React from 'react';

// Importando todos os nossos componentes
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProblemsSection } from './components/ProblemsSection';
import { SolutionsSection } from './components/SolutionsSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BackToTopButton } from './components/BackToTopButton';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemsSection />
        <SolutionsSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTopButton />
    </>
  );
}

export default App;
import React from 'react';
import { Hero } from '../components/Hero';
import { SolutionsSection } from '../components/SolutionsSection';
import { ProjectCarousel } from '../components/ProjectCarousel';
import { BlogCarousel } from '../components/BlogCarousel';
import { ContactAndAbout } from '../components/ContactAndAbout';
import { UniqueApproachSection } from '../components/UniqueApproachSection';

// Componente da Página Home
export function HomePage() {
  return (
    <>
      <Hero />
      <UniqueApproachSection />
      <SolutionsSection />
      <ProjectCarousel />
      <BlogCarousel />
      <ContactAndAbout />
    </>
  );
}
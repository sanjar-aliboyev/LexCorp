'use client';

// Import components
import PracticeSlider from './components/PracticeSlider'; // 1. Hero
import StatsStrip from './components/StatsStrip';         // 2. NEW Stats Block
import ServicesSection from './components/ServicesSection'; // 3. Services
import TrustStrip from './components/TrustStrip';         // 4. Map/Global
import AboutSection from './components/AboutSection';
import NewsSection from './components/NewsSection';


export default function Home() {
  return (
    <main style={{ backgroundColor: 'var(--bg-body)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* 1. Hero Block */}
      <PracticeSlider />

      {/* 5. Team/About */}
      <AboutSection />

      {/* 2. Stats Block (INSERTED HERE) */}
      <StatsStrip />

      {/* 3. Services Grid */}
      <ServicesSection />

      {/* 4. Global Experience (Map) */}
      <TrustStrip />

      {/* 6. CTA/News */}
      <NewsSection />


      
    </main>
  );
}
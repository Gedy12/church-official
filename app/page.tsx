import Header from './components/Header';
import Hero from './components/Hero';
import Experience from './components/Experience';
import AnimatedAbout from './components/About';
import Services from './components/Services';
import MissionVision from './components/MissionVision';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Donate from './components/Donate';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Experience />
      <Services />
      <MissionVision />
      <AnimatedAbout />
      <Donate />
      <Contact />
      <Footer />
    </main>
  );
}
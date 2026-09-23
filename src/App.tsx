import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingCta from './components/FloatingCta';
import Hero from './sections/Hero';
import TrustBar from './sections/TrustBar';
import About from './sections/About';
import Services from './sections/Services';
import Pricing from './sections/Pricing';
import Why from './sections/Why';
import HowItWorks from './sections/HowItWorks';
import Testimonials from './sections/Testimonials';
import CtaBanner from './sections/CtaBanner';
import Faq from './sections/Faq';
import Contact from './sections/Contact';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Services />
        <Pricing />
        <Why />
        <HowItWorks />
        <Testimonials />
        <CtaBanner />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}

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
// The Testimonials section is hidden until the client supplies real reviews (the current
// ones are stand-ins). To bring it back, re-import it from './sections/Testimonials' and
// render it again straight after HowItWorks.
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
        <CtaBanner />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}

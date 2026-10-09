import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyBar from './components/StickyBar';
import { CentreLine } from './components/Signs';
import Hero from './sections/Hero';
import Instructor from './sections/Instructor';
import Lessons from './sections/Lessons';
import Pay from './sections/Pay';
import Areas from './sections/Areas';
import RoadToPass from './sections/RoadToPass';
import Questions from './sections/Questions';
import Book from './sections/Book';
import NotFound from './sections/NotFound';
import { useSigns } from './hooks/useSigns';

// The page runs in the order a learner decides: what is this and where, who teaches me, what lessons are there,
// how do I pay, do you come to me, what is the whole process, my worries, and how do I book.
// A reviews section is left out until the client supplies real reviews (see TESTIMONIALS in siteData.ts).
export default function App() {
  useSigns();
  const known = window.location.pathname === '/' || window.location.pathname === '/index.html';

  return (
    <>
      <Navbar />
      <main>
        {known ? (
          <>
            <Hero />
            <Instructor />
            <Lessons />
            <Pay />
            <Areas />
            <RoadToPass />
            <Questions />
            <CentreLine />
            <Book />
          </>
        ) : (
          <NotFound />
        )}
      </main>
      <Footer />
      {known && <StickyBar />}
    </>
  );
}

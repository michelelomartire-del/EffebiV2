import { MotionConfig } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Process } from "./components/Process";
import { Showcase } from "./components/Showcase";
import { Energy } from "./components/Energy";
import { Quota } from "./components/Quota";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { MobileCTA } from "./components/MobileCTA";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[6px] focus:bg-accent focus:px-4 focus:py-2.5 focus:text-white">
        Salta al contenuto
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Features />
        <Process />
        <Showcase />
        <Energy />
        <Quota />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
    </MotionConfig>
  );
}

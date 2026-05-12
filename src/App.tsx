import GridBackdrop from "./components/GridBackdrop";
import { PeachHalo, MagentaHalo } from "./components/Halos";
import Nav from "./sections/Nav";
import Hero from "./sections/Hero";
import Metrics from "./sections/Metrics";
import HowItWorks from "./sections/HowItWorks";
import FluxScore from "./sections/FluxScore";
import Solutions from "./sections/Solutions";
import CaseStudies from "./sections/CaseStudies";
import BigCTA from "./sections/BigCTA";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ground text-text">
      <GridBackdrop />
      <PeachHalo />
      <MagentaHalo />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <Metrics />
        <HowItWorks />
        <FluxScore />
        <Solutions />
        <CaseStudies />
        <BigCTA />
        <Footer />
      </div>
    </div>
  );
}

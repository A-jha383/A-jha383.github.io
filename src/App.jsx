import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import BackgroundField from "./components/BackgroundField";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import SideDock from "./components/SideDock";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import AIExpertise from "./components/AIExpertise";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Loader visible={loading} />
      <CustomCursor />
      <ScrollProgress />
      <BackgroundField />
      <div className="noise-overlay" />
      <SideDock />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <AIExpertise />
        <Projects />
        <Skills />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;

import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Preloader from "./components/Preloader";
import ThreeBackground from "./components/ThreeBackground";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {isLoading ? (
          <Preloader onComplete={handlePreloaderComplete} />
        ) : (
          <>
            <ThreeBackground />
            <Header />
            <main>
              <Hero />
              <About />
              <Experience />
              <Skills />
              <Projects />
              <Education />
              <Certifications />
              <Contact />
            </main>
            <Footer />
          </>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

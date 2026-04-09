import Hero from "@/components/sections/Hero";
import Problems from "@/components/sections/Problems";
import ClientLogos from "@/components/sections/ClientLogos";
import Metrics from "@/components/sections/Metrics";
import Process from "@/components/sections/Process";
import TechStack from "@/components/sections/TechStack";
import Services from "@/components/sections/Services";
import CaseStudies from "@/components/sections/CaseStudies";
import FreshworksProducts from "@/components/sections/FreshworksProducts";
import About from "@/components/sections/About";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problems />
      <ClientLogos />
      <Metrics />
      <Process />
      <TechStack />
      <Services />
      <CaseStudies />
      <FreshworksProducts />
      <About />
      <FAQ />
      <Contact />
    </>
  );
}

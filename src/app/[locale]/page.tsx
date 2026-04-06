import Hero from "@/components/sections/Hero";
import Problems from "@/components/sections/Problems";
import Metrics from "@/components/sections/Metrics";
import Services from "@/components/sections/Services";
import CaseStudies from "@/components/sections/CaseStudies";
import About from "@/components/sections/About";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problems />
      <Metrics />
      <Services />
      <CaseStudies />
      <About />
    </>
  );
}

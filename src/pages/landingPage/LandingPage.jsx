import React from "react";
import Hero from "./Hero";
import Header from "../components/Header";
import DotPattern from '@/components/ui/dot-pattern'
import { cn } from '@/lib/utils'
function LandingPage() {
  return (
    <div>
     
      <Header />
      <Hero />
    </div>
  );
}

export default LandingPage;

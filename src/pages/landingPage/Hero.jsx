import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarqueeDemo } from './MarqueeDemo';
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { OrbitingCirclesDemo } from "./OrbitingCirclesDemo";

function Hero() {
  return (
    <div className="flex flex-col">
      <DotPattern
        className={cn(
          "inset-0 z-0 [mask-image:radial-gradient(30vw_circle_at_center,white,transparent)]"
        )}
      />
      <div className="w-full min-h-screen flex items-center justify-center relative bg-background sm:flexflex-row">
        <div className="absolute inset-0 bg-dot-black/[0.2] dark:bg-dot-white/[0.2]">
          <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>

        <div className="container relative z-10 mx-auto max-w-[1200px] flex items-center justify-center">
          <div className="flex gap-8 py-12 lg:py-10 items-center justify-center flex-col text-center">
            <div className="flex gap-6 flex-col items-center">
              <h1 className="text-5xl md:text-7xl max-w-3xl tracking-tighter text-center font-regular">
                <span className="bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
                  Your Blogging Journey Begins Here
                </span>
              </h1>

              <p className="text-sm md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center mx-auto dark:text-gray-300">
                <span className="font-bold text-black italic dark:text-white">
                  BlogEV
                </span>{" "}
                gives you an environment where you can make Markdown fun.
              </p>
            </div>
          </div>
        </div>
       
          <OrbitingCirclesDemo />
        
      </div>

      <MarqueeDemo />
    </div>
  );
}

export default Hero;

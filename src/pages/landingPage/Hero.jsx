import { MoveRight, PhoneCall, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarqueeDemo } from "./MarqueeDemo";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { OrbitingCirclesDemo } from "./OrbitingCirclesDemo";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { useNavigate } from "react-router-dom";


function Hero() {
  const navigate=useNavigate();
  return (
    <div className="flex flex-col">
      <DotPattern
        className={cn(
          "inset-0 z-0 [mask-image:radial-gradient(30vw_circle_at_center,white,transparent)]"
        )}
      />
      <div className="w-full min-h-screen flex items-center justify-center relative bg-background sm:flexflex-row">
        

        <div className="container relative z-10 mx-auto max-w-[1200px] flex items-center justify-center">
          <div className="flex gap-8 py-12 lg:py-10 items-center justify-center flex-col text-center">
            <div className="flex gap-6 flex-col items-center">
              <h1 className="text-5xl md:text-7xl max-w-3xl tracking-tighter text-center font-regular">
                <span className="bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
                  Your Blogging Journey Begins Here
                </span>
              </h1>

              <p className="text-2xl md:text-2xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center mx-auto dark:text-white">
                <span className="font-bold italic text-[#8CCC4C]">BlogEV</span>{" "}
                where you can make Markdown fun.
              </p>
            </div>
            <div>
              <div
                className={cn(
                  "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                )}
                onClick={() => {
                  navigate("/myblogs");
                }}
              >
                <AnimatedShinyText className="text-1xl inline-flex items-center text-black justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <span>✨ Lets Go</span>
                  <MoveRight className="ml-2 h-4 w-4" />
                </AnimatedShinyText>
              </div>
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

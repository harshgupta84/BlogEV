import { MoveRight } from "lucide-react";
import { MarqueeDemo } from "./MarqueeDemo";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { OrbitingCirclesDemo } from "./OrbitingCirclesDemo";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <DotPattern
        className={cn(
          "inset-0 z-0 [mask-image:radial-gradient(30vw_circle_at_center,white,transparent)]"
        )}
      />
      <div className="sm:flex relative bg-background sm:flex-row">
        <div className="flex flex-col items-center justify-center px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col gap-6 py-24 lg:py-12 items-center justify-center text-center">
            {/* Header Section */}
            <h1 className="text-3xl sm:text-5xl md:text-7xl max-w-3xl tracking-tighter text-center font-regular leading-snug sm:leading-tight">
              <span className="bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
                Your Blogging Journey Begins Here
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-2xl leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center mx-auto dark:text-white">
              <span className="font-bold italic text-[#8CCC4C]">BlogEV</span>{" "}
              where you can make Markdown fun.
            </p>

            {/* Button Section */}
            <div
              className={cn(
                "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              )}
              onClick={() => {
                navigate("/blog/myfeed");
              }}
            >
              <AnimatedShinyText className="text-base sm:text-lg inline-flex items-center text-black justify-center px-4 sm:px-6 py-2 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span>✨ Let’s Go</span>
                <MoveRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
              </AnimatedShinyText>
            </div>
          </div>
        </div>

        {/* Orbiting Circles */}
        <div className="w-full">
          <OrbitingCirclesDemo />
        </div>
      </div>

      {/* Marquee */}
      <div className="w-full">
        <MarqueeDemo />
      </div>
    </div>
  );
}

export default Hero;

import "./App.css";
import { Button } from "./components/ui/button";
import { DotPattern } from "./components/ui/dot-pattern";
import { cn } from "./lib/utils";
import ThemeSwitcher from "./ThemeSwitcher";
function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button className=" rounded-lg">app</Button>
      <DotPattern
        className={cn(
          "absolute inset-0 z-0 [mask-image:radial-gradient(50vw_circle_at_center,white,transparent)]"
        )}
      />
      <ThemeSwitcher />
    </div>
  );
}

export default App;

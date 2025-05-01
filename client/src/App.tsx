import { Switch, Route } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import PaletteGenerator from "@/pages/PaletteGenerator";

function Router() {
  return (
    <Switch>
      <Route path="/" component={PaletteGenerator} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[hsl(var(--app-dark))]">
        <Router />
        <Toaster />
      </div>
    </TooltipProvider>
  );
}

export default App;

import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { PaletteIcon, HomeIcon } from "lucide-react";

export default function NotFound() {
  const [, navigate] = useLocation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[hsl(var(--app-dark))] to-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-20 top-1/3 w-64 h-64 bg-[hsl(var(--app-accent))] rounded-full filter blur-3xl opacity-10 animate-float"></div>
        <div className="absolute -right-20 top-2/3 w-80 h-80 bg-[hsl(var(--app-accent-alt))] rounded-full filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="text-center glass-card p-10 max-w-md z-10">
        <PaletteIcon className="w-16 h-16 mx-auto mb-6 text-[hsl(var(--app-accent))]" />
        <h1 className="text-6xl font-bold mb-2 gradient-text">404</h1>
        <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">Sorry, we couldn't find the page you're looking for.</p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-[hsl(var(--app-gradient-start))] to-[hsl(var(--app-gradient-end))] hover:opacity-90 text-white px-6 py-2.5 rounded-xl shadow-lg hover:shadow-glow transition-all duration-300"
        >
          <HomeIcon className="h-4 w-4 mr-2" />
          Back to Spectra
        </Button>
      </div>
    </div>
  );
}

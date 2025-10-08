import { Globe } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useLocation } from "wouter";

export function Header() {
  const [, setLocation] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <button 
          onClick={() => setLocation("/")} 
          className="flex items-center gap-2 hover-elevate rounded-lg px-3 py-2 active-elevate-2 cursor-pointer border-0 bg-transparent"
          data-testid="link-home"
        >
          <Globe className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl font-['Outfit']">옷차림 가이드</span>
        </button>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setLocation("/admin")}
            className="px-3 py-2 text-sm hover-elevate active-elevate-2 rounded-md cursor-pointer border-0 bg-transparent"
            data-testid="link-admin"
          >
            관리자
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

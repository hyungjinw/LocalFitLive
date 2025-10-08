import { Globe } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2 hover-elevate rounded-lg px-3 py-2 active-elevate-2" data-testid="link-home">
            <Globe className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl font-['Outfit']">옷차림 가이드</span>
          </a>
        </Link>
        
        <div className="flex items-center gap-2">
          <Link href="/admin">
            <Button variant="ghost" size="sm" data-testid="link-admin">
              관리자
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

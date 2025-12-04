"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import { EcoSweepLogo } from "./icons";

export function AppFooter() {
  return (
    <footer className="bg-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <EcoSweepLogo className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl font-headline text-primary">EcoSweep</span>
          </div>
          <div className="text-center text-sm text-foreground/70 mb-4 md:mb-0">
            © {new Date().getFullYear()} EcoSweep Solutions. All Rights Reserved.
            <br/>
            Promoting a cleaner, more sustainable future.
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
              <Github className="h-6 w-6" />
              <span className="sr-only">Github</span>
            </a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

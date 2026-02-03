import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  FileText, 
  Target, 
  Map, 
  BookOpen, 
  LayoutDashboard,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Home", icon: Briefcase },
  { path: "/resume", label: "Upload Resume", icon: FileText },
  { path: "/matching", label: "Job Matching", icon: Target },
  { path: "/simulator", label: "Career Path", icon: Map },
  { path: "/roadmap", label: "Skill Roadmap", icon: BookOpen },
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
              <Briefcase className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="hidden font-display text-lg font-bold text-foreground sm:block">
              CareerPath<span className="text-primary">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "gap-2 text-muted-foreground hover:text-foreground",
                      isActive && "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-border pb-4 lg:hidden">
            <div className="flex flex-col gap-1 pt-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-3 text-muted-foreground",
                        isActive && "bg-primary/10 text-primary"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

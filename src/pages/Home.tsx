import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  Target, 
  Map, 
  BookOpen, 
  LayoutDashboard,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  Sparkles
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Resume Analysis",
    description: "Upload your resume and let our AI extract and analyze your skills automatically.",
    color: "text-info",
    bg: "bg-info/10",
  },
  {
    icon: Target,
    title: "Smart Matching",
    description: "Get matched with job roles based on your skills with detailed compatibility scores.",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: Map,
    title: "Career Simulation",
    description: "Visualize multiple career paths and see how different choices lead to growth.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: BookOpen,
    title: "Skill Roadmaps",
    description: "Get personalized learning plans to bridge skill gaps and reach your goals.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

const stats = [
  { value: "10K+", label: "Students Guided" },
  { value: "95%", label: "Satisfaction Rate" },
  { value: "500+", label: "Career Paths" },
  { value: "1000+", label: "Skills Mapped" },
];

const problems = [
  "Uncertainty about which career path to choose",
  "Not knowing which skills to learn next",
  "Difficulty matching qualifications to job requirements",
  "Lack of visibility into career growth opportunities",
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4 py-20 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              AI-Powered Career Guidance
            </div>
            <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Navigate Your Career with{" "}
              <span className="text-gradient-primary">Intelligence</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Upload your resume, discover your strengths, find matching jobs, and simulate 
              your career path—all powered by intelligent analysis.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/resume">
                <Button variant="hero" size="xl">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/matching">
                <Button variant="outline" size="lg">
                  Explore Job Matches
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="border-b border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-3xl font-bold text-primary sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
              The Career Confusion Problem
            </h2>
            <p className="mb-12 text-lg text-muted-foreground">
              Students and job seekers face significant challenges when planning their careers.
            </p>
          </div>
          
          <div className="mx-auto max-w-2xl">
            <Card className="shadow-card">
              <CardContent className="p-8">
                <div className="space-y-4">
                  {problems.map((problem, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-4 rounded-lg bg-destructive/5 p-4"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-sm font-medium text-destructive">
                        {index + 1}
                      </div>
                      <p className="text-foreground">{problem}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 rounded-lg bg-success/10 p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 shrink-0 text-success" />
                    <div>
                      <h4 className="font-semibold text-foreground">Our Solution</h4>
                      <p className="mt-1 text-muted-foreground">
                        CareerPathAI uses intelligent algorithms to analyze your skills, 
                        match you with suitable roles, and provide clear roadmaps for career growth.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Four simple steps to transform your career planning experience.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden border-none bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <CardContent className="p-6">
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg}`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Step {index + 1}
                    </span>
                  </div>
                  <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Built For You
            </h2>
            <p className="mb-12 text-lg text-muted-foreground">
              Whether you're just starting out or looking for a career change.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {[
              { icon: Users, title: "Students", desc: "Explore careers before graduation" },
              { icon: TrendingUp, title: "Fresh Graduates", desc: "Find your first job match" },
              { icon: Target, title: "Job Seekers", desc: "Navigate career transitions" },
            ].map((user, index) => (
              <Card key={index} className="text-center shadow-card">
                <CardContent className="p-8">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <user.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                    {user.title}
                  </h3>
                  <p className="text-muted-foreground">{user.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
            Ready to Shape Your Future?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-primary-foreground/80">
            Join thousands of students and professionals who have transformed 
            their career planning with our intelligent simulator.
          </p>
          <Link to="/resume">
            <Button 
              variant="secondary" 
              size="xl"
              className="bg-card text-foreground hover:bg-card/90"
            >
              Start Your Journey
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <Target className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display font-semibold text-foreground">
                CareerPath<span className="text-primary">AI</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Academic Innovation Project • College Innovation Day 2024
            </p>
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

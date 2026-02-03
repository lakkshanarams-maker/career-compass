import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Map, 
  ChevronRight, 
  DollarSign,
  Clock,
  Star,
  CheckCircle
} from "lucide-react";
import { careerPaths, CareerPath } from "@/data/dummyData";
import { cn } from "@/lib/utils";

const levelColors: Record<string, { bg: string; text: string; border: string }> = {
  Entry: { bg: "bg-info/10", text: "text-info", border: "border-info/30" },
  Mid: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/30" },
  Senior: { bg: "bg-success/10", text: "text-success", border: "border-success/30" },
  Lead: { bg: "bg-warning/10", text: "text-warning", border: "border-warning/30" },
  Principal: { bg: "bg-accent/10", text: "text-accent", border: "border-accent/30" },
  Executive: { bg: "bg-destructive/10", text: "text-destructive", border: "border-destructive/30" },
};

export default function CareerSimulator() {
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(careerPaths[0]);
  const [activePath, setActivePath] = useState<string[]>(["1"]);

  const handlePathClick = (pathId: string) => {
    const path = careerPaths.find(p => p.id === pathId);
    if (path) {
      setSelectedPath(path);
      if (!activePath.includes(pathId)) {
        setActivePath([...activePath, pathId]);
      }
    }
  };

  const getPathById = (id: string) => careerPaths.find(p => p.id === id);

  const renderPathTree = () => {
    const levels = ["Entry", "Mid", "Senior", "Lead", "Principal", "Executive"];
    
    return (
      <div className="relative">
        {levels.map((level, levelIndex) => {
          const pathsAtLevel = careerPaths.filter(p => p.level === level);
          if (pathsAtLevel.length === 0) return null;

          return (
            <div key={level} className="relative mb-8">
              {/* Level Label */}
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="secondary" className={cn(levelColors[level].bg, levelColors[level].text)}>
                  {level}
                </Badge>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Paths at this level */}
              <div className="flex flex-wrap justify-center gap-4">
                {pathsAtLevel.map((path) => {
                  const isActive = activePath.includes(path.id);
                  const isSelected = selectedPath?.id === path.id;
                  const colors = levelColors[path.level];

                  return (
                    <Card
                      key={path.id}
                      className={cn(
                        "w-full max-w-[280px] cursor-pointer border-2 transition-all duration-300",
                        isActive ? colors.border : "border-transparent",
                        isSelected && "ring-2 ring-primary shadow-lg scale-[1.02]",
                        !isActive && "opacity-60 hover:opacity-80"
                      )}
                      onClick={() => handlePathClick(path.id)}
                    >
                      <CardContent className="p-4">
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <h4 className="font-display font-semibold text-foreground">
                            {path.role}
                          </h4>
                          {isActive && (
                            <CheckCircle className={cn("h-5 w-5 shrink-0", colors.text)} />
                          )}
                        </div>
                        <div className="mb-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {path.yearsExperience}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {path.salary}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {path.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Next roles indicator */}
                        {path.nextRoles.length > 0 && (
                          <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                            <ChevronRight className="h-3 w-3" />
                            <span>
                              {path.nextRoles.length} career progression{path.nextRoles.length > 1 ? "s" : ""}
                            </span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Career Path Simulator
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Explore different career trajectories and see how your skills can lead to various roles
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Path Visualization */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5 text-primary" />
                  Career Progression Map
                </CardTitle>
                <CardDescription>
                  Click on roles to explore different paths. Active paths are highlighted.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderPathTree()}
              </CardContent>
            </Card>
          </div>

          {/* Selected Path Details */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            {selectedPath ? (
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge className={cn(levelColors[selectedPath.level].bg, levelColors[selectedPath.level].text)}>
                      {selectedPath.level}
                    </Badge>
                  </div>
                  <CardTitle className="mt-2">{selectedPath.role}</CardTitle>
                  <CardDescription className="flex flex-wrap gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {selectedPath.yearsExperience}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {selectedPath.salary}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Required Skills */}
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Star className="h-4 w-4" />
                      Key Skills Required
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPath.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Next Roles */}
                  {selectedPath.nextRoles.length > 0 && (
                    <div>
                      <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <ChevronRight className="h-4 w-4" />
                        Career Progressions
                      </h4>
                      <div className="space-y-2">
                        {selectedPath.nextRoles.map((nextId) => {
                          const nextPath = getPathById(nextId);
                          if (!nextPath) return null;
                          const colors = levelColors[nextPath.level];
                          
                          return (
                            <Button
                              key={nextId}
                              variant="outline"
                              className="w-full justify-between"
                              onClick={() => handlePathClick(nextId)}
                            >
                              <span className="flex items-center gap-2">
                                <Badge className={cn("text-xs", colors.bg, colors.text)}>
                                  {nextPath.level}
                                </Badge>
                                {nextPath.role}
                              </span>
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Current Progress */}
                  <div className="rounded-lg bg-primary/5 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Your Progress
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Based on your current skills, you're on track for the{" "}
                      <strong className="text-foreground">Frontend Developer</strong> role.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-card">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                    <Map className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                    Select a Role
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Click on a career role to see detailed information
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Clock, 
  ExternalLink,
  CheckCircle,
  Circle,
  ChevronDown,
  ChevronUp,
  Play,
  GraduationCap,
  Target
} from "lucide-react";
import { learningResources, jobRoles, LearningResource } from "@/data/dummyData";
import { cn } from "@/lib/utils";

const difficultyColors = {
  Beginner: "bg-success/10 text-success",
  Intermediate: "bg-warning/10 text-warning",
  Advanced: "bg-destructive/10 text-destructive",
};

// Get unique missing skills from all jobs
const allMissingSkills = [...new Set(jobRoles.flatMap(j => j.missingSkills))];

interface SkillRoadmap {
  skill: string;
  resources: LearningResource[];
  progress: number;
  status: "not-started" | "in-progress" | "completed";
}

export default function SkillRoadmap() {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(allMissingSkills[0] || null);
  const [completedResources, setCompletedResources] = useState<string[]>([]);

  // Build roadmap data
  const roadmaps: SkillRoadmap[] = allMissingSkills.map(skill => {
    const resources = learningResources.filter(r => r.skill === skill);
    const completed = resources.filter(r => completedResources.includes(r.id)).length;
    const progress = resources.length > 0 ? (completed / resources.length) * 100 : 0;
    
    return {
      skill,
      resources,
      progress,
      status: progress === 100 ? "completed" : progress > 0 ? "in-progress" : "not-started",
    };
  });

  const toggleResource = (resourceId: string) => {
    setCompletedResources(prev => 
      prev.includes(resourceId) 
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const totalProgress = roadmaps.reduce((acc, r) => acc + r.progress, 0) / roadmaps.length;

  return (
    <div className="min-h-screen bg-gradient-hero py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Skill Roadmap
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A personalized learning path to bridge your skill gaps and reach your career goals
          </p>
        </div>

        {/* Overall Progress */}
        <Card className="mx-auto mb-10 max-w-2xl shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Overall Learning Progress
                </h3>
                <p className="text-sm text-muted-foreground">
                  {roadmaps.filter(r => r.status === "completed").length} of {roadmaps.length} skill roadmaps completed
                </p>
              </div>
              <div className="text-right">
                <div className="font-display text-3xl font-bold text-primary">
                  {Math.round(totalProgress)}%
                </div>
              </div>
            </div>
            <Progress value={totalProgress} className="mt-4 h-3" />
          </CardContent>
        </Card>

        {/* Skills Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Skills to Learn */}
          <div>
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold text-foreground">
              <Target className="h-5 w-5 text-primary" />
              Skills to Learn ({allMissingSkills.length})
            </h2>
            <div className="space-y-4">
              {roadmaps.map((roadmap) => (
                <Card 
                  key={roadmap.skill} 
                  className={cn(
                    "shadow-card transition-all duration-200",
                    expandedSkill === roadmap.skill && "ring-2 ring-primary"
                  )}
                >
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => setExpandedSkill(
                      expandedSkill === roadmap.skill ? null : roadmap.skill
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg",
                          roadmap.status === "completed" 
                            ? "bg-success/10" 
                            : roadmap.status === "in-progress" 
                              ? "bg-warning/10" 
                              : "bg-muted"
                        )}>
                          {roadmap.status === "completed" ? (
                            <CheckCircle className="h-5 w-5 text-success" />
                          ) : roadmap.status === "in-progress" ? (
                            <Play className="h-5 w-5 text-warning" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{roadmap.skill}</CardTitle>
                          <CardDescription>
                            {roadmap.resources.length} learning resources
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm font-semibold text-foreground">
                            {Math.round(roadmap.progress)}%
                          </div>
                          <Progress 
                            value={roadmap.progress} 
                            className="h-1.5 w-20"
                          />
                        </div>
                        {expandedSkill === roadmap.skill ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  {expandedSkill === roadmap.skill && roadmap.resources.length > 0 && (
                    <CardContent className="border-t pt-4">
                      <div className="space-y-3">
                        {roadmap.resources.map((resource, index) => {
                          const isCompleted = completedResources.includes(resource.id);
                          
                          return (
                            <div
                              key={resource.id}
                              className={cn(
                                "flex items-start gap-4 rounded-lg border p-4 transition-all",
                                isCompleted 
                                  ? "border-success/30 bg-success/5" 
                                  : "border-border hover:bg-muted/30"
                              )}
                            >
                              <button
                                className="mt-0.5 shrink-0"
                                onClick={() => toggleResource(resource.id)}
                              >
                                {isCompleted ? (
                                  <CheckCircle className="h-5 w-5 text-success" />
                                ) : (
                                  <Circle className="h-5 w-5 text-muted-foreground hover:text-primary" />
                                )}
                              </button>
                              <div className="flex-1">
                                <div className="mb-1 flex items-start justify-between gap-2">
                                  <h4 className={cn(
                                    "font-medium",
                                    isCompleted && "text-muted-foreground line-through"
                                  )}>
                                    {resource.title}
                                  </h4>
                                  <Badge className={difficultyColors[resource.difficulty]}>
                                    {resource.difficulty}
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <GraduationCap className="h-3.5 w-3.5" />
                                    {resource.platform}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    {resource.duration}
                                  </span>
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="shrink-0"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  )}

                  {expandedSkill === roadmap.skill && roadmap.resources.length === 0 && (
                    <CardContent className="border-t pt-4">
                      <p className="text-center text-muted-foreground">
                        No learning resources available yet for this skill.
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Timeline View */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold text-foreground">
              <BookOpen className="h-5 w-5 text-primary" />
              Learning Timeline
            </h2>
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="relative space-y-6">
                  {/* Timeline line */}
                  <div className="absolute left-4 top-0 h-full w-px bg-border" />
                  
                  {roadmaps.map((roadmap, index) => (
                    <div key={roadmap.skill} className="relative flex gap-4">
                      <div className={cn(
                        "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
                        roadmap.status === "completed" 
                          ? "border-success bg-success text-success-foreground" 
                          : roadmap.status === "in-progress" 
                            ? "border-warning bg-warning text-warning-foreground" 
                            : "border-border bg-card text-muted-foreground"
                      )}>
                        {roadmap.status === "completed" ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <span className="text-xs font-semibold">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-foreground">{roadmap.skill}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {roadmap.resources.length} courses
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {roadmap.status === "completed" 
                            ? "Completed!" 
                            : roadmap.status === "in-progress"
                              ? `${Math.round(roadmap.progress)}% complete`
                              : "Not started yet"
                          }
                        </p>
                        <Progress 
                          value={roadmap.progress} 
                          className="mt-2 h-1.5"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Estimated Completion */}
                <div className="mt-8 rounded-lg bg-primary/5 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    Estimated Completion
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    ~{Math.ceil(roadmaps.reduce((acc, r) => acc + r.resources.length * 10, 0) / 7)} weeks 
                    at 10 hours/week
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

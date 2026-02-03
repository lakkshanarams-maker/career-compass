import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  CheckCircle, 
  XCircle, 
  Building2, 
  DollarSign,
  Clock,
  ArrowRight,
  Filter,
  TrendingUp
} from "lucide-react";
import { jobRoles, JobRole } from "@/data/dummyData";
import { cn } from "@/lib/utils";

export default function JobMatching() {
  const [selectedJob, setSelectedJob] = useState<JobRole | null>(null);
  const [filter, setFilter] = useState<"all" | "high" | "medium">("all");

  const filteredJobs = jobRoles.filter(job => {
    if (filter === "high") return job.matchPercentage >= 80;
    if (filter === "medium") return job.matchPercentage >= 60 && job.matchPercentage < 80;
    return true;
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-destructive";
  };

  const getMatchBg = (percentage: number) => {
    if (percentage >= 80) return "bg-success/10";
    if (percentage >= 60) return "bg-warning/10";
    return "bg-destructive/10";
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Job Role Matching
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover roles that match your skills and identify gaps to improve
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {[
            { key: "all", label: "All Matches", count: jobRoles.length },
            { key: "high", label: "High Match (80%+)", count: jobRoles.filter(j => j.matchPercentage >= 80).length },
            { key: "medium", label: "Medium Match (60-79%)", count: jobRoles.filter(j => j.matchPercentage >= 60 && j.matchPercentage < 80).length },
          ].map((f) => (
            <Button
              key={f.key}
              variant={filter === f.key ? "default" : "secondary"}
              size="sm"
              onClick={() => setFilter(f.key as typeof filter)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              {f.label}
              <Badge variant="secondary" className="ml-1 bg-background/50">
                {f.count}
              </Badge>
            </Button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Job List */}
          <div className="space-y-4 lg:col-span-2">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                className={cn(
                  "cursor-pointer shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover",
                  selectedJob?.id === job.id && "ring-2 ring-primary"
                )}
                onClick={() => setSelectedJob(job)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h3 className="font-display text-xl font-semibold text-foreground">
                          {job.title}
                        </h3>
                        {job.matchPercentage >= 90 && (
                          <Badge className="bg-success text-success-foreground">
                            Top Match
                          </Badge>
                        )}
                      </div>
                      <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {job.salary}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.type}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{job.description}</p>
                    </div>
                    
                    {/* Match Score */}
                    <div className={cn("flex flex-col items-center rounded-xl p-4", getMatchBg(job.matchPercentage))}>
                      <div className={cn("font-display text-3xl font-bold", getMatchColor(job.matchPercentage))}>
                        {job.matchPercentage}%
                      </div>
                      <span className="text-xs text-muted-foreground">Match</span>
                    </div>
                  </div>

                  {/* Skills Preview */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.matchedSkills.slice(0, 4).map((skill) => (
                      <Badge key={skill} variant="secondary" className="gap-1 bg-success/10 text-success">
                        <CheckCircle className="h-3 w-3" />
                        {skill}
                      </Badge>
                    ))}
                    {job.missingSkills.slice(0, 2).map((skill) => (
                      <Badge key={skill} variant="secondary" className="gap-1 bg-destructive/10 text-destructive">
                        <XCircle className="h-3 w-3" />
                        {skill}
                      </Badge>
                    ))}
                    {(job.matchedSkills.length + job.missingSkills.length > 6) && (
                      <Badge variant="secondary">
                        +{job.matchedSkills.length + job.missingSkills.length - 6} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Details Panel */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            {selectedJob ? (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    {selectedJob.title}
                  </CardTitle>
                  <CardDescription>{selectedJob.company}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Match Score */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Match Score</span>
                      <span className={cn("font-bold", getMatchColor(selectedJob.matchPercentage))}>
                        {selectedJob.matchPercentage}%
                      </span>
                    </div>
                    <Progress 
                      value={selectedJob.matchPercentage} 
                      className={cn(
                        "h-3",
                        selectedJob.matchPercentage >= 80 && "[&>div]:bg-success",
                        selectedJob.matchPercentage >= 60 && selectedJob.matchPercentage < 80 && "[&>div]:bg-warning"
                      )}
                    />
                  </div>

                  {/* Matched Skills */}
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 font-medium text-foreground">
                      <CheckCircle className="h-4 w-4 text-success" />
                      Matched Skills ({selectedJob.matchedSkills.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.matchedSkills.map((skill) => (
                        <Badge key={skill} className="bg-success/10 text-success hover:bg-success/20">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Missing Skills */}
                  {selectedJob.missingSkills.length > 0 && (
                    <div>
                      <h4 className="mb-3 flex items-center gap-2 font-medium text-foreground">
                        <XCircle className="h-4 w-4 text-destructive" />
                        Skills to Learn ({selectedJob.missingSkills.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.missingSkills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="bg-destructive/10 text-destructive">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="space-y-2 pt-4">
                    <Link to="/roadmap" className="block">
                      <Button className="w-full gap-2">
                        <TrendingUp className="h-4 w-4" />
                        View Skill Roadmap
                      </Button>
                    </Link>
                    <Link to="/simulator" className="block">
                      <Button variant="outline" className="w-full gap-2">
                        Explore Career Path
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-card">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                    <Target className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                    Select a Job Role
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Click on a job card to see detailed matching analysis
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

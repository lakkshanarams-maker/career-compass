import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Plus, 
  X, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { userSkills, Skill } from "@/data/dummyData";

const suggestedSkills = [
  "Python", "JavaScript", "React", "Node.js", "SQL", "AWS", "Docker",
  "Machine Learning", "Data Analysis", "Java", "TypeScript", "Git",
  "Communication", "Leadership", "Problem Solving", "Agile"
];

export default function ResumeUpload() {
  const navigate = useNavigate();
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "analyzing" | "complete">("idle");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileUpload();
  };

  const handleFileUpload = () => {
    setUploadState("uploading");
    setTimeout(() => {
      setUploadState("analyzing");
      setTimeout(() => {
        setSkills(userSkills);
        setUploadState("complete");
      }, 2000);
    }, 1500);
  };

  const addSkill = (skillName: string) => {
    if (skillName && !skills.find(s => s.name.toLowerCase() === skillName.toLowerCase())) {
      setSkills([...skills, { name: skillName, level: 50, category: "Custom" }]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillName: string) => {
    setSkills(skills.filter(s => s.name !== skillName));
  };

  const updateSkillLevel = (skillName: string, level: number) => {
    setSkills(skills.map(s => s.name === skillName ? { ...s, level } : s));
  };

  const handleProceed = () => {
    navigate("/matching");
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="mb-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Upload Your Resume
            </h1>
            <p className="text-lg text-muted-foreground">
              Let our AI extract your skills or add them manually
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Upload Section */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Resume Upload
                </CardTitle>
                <CardDescription>
                  Upload your resume for automatic skill extraction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={cn(
                    "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all duration-200",
                    dragActive
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/30",
                    uploadState === "complete" && "border-success bg-success/5"
                  )}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {uploadState === "idle" && (
                    <>
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                        <FileText className="h-8 w-8 text-primary" />
                      </div>
                      <p className="mb-2 text-center font-medium text-foreground">
                        Drag and drop your resume here
                      </p>
                      <p className="mb-4 text-center text-sm text-muted-foreground">
                        or click to browse (PDF, DOC, DOCX)
                      </p>
                      <Button onClick={handleFileUpload}>
                        Choose File
                      </Button>
                    </>
                  )}

                  {uploadState === "uploading" && (
                    <div className="text-center">
                      <div className="mb-4 flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl bg-primary/10">
                        <Upload className="h-8 w-8 text-primary" />
                      </div>
                      <p className="font-medium text-foreground">Uploading...</p>
                      <Progress value={65} className="mt-4 w-48" />
                    </div>
                  )}

                  {uploadState === "analyzing" && (
                    <div className="text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                        <Sparkles className="h-8 w-8 animate-pulse text-primary" />
                      </div>
                      <p className="font-medium text-foreground">Analyzing your resume...</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Extracting skills and experience
                      </p>
                    </div>
                  )}

                  {uploadState === "complete" && (
                    <div className="text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-success/10">
                        <CheckCircle className="h-8 w-8 text-success" />
                      </div>
                      <p className="font-medium text-foreground">Analysis Complete!</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {skills.length} skills extracted from your resume
                      </p>
                    </div>
                  )}
                </div>

                {/* Demo Note */}
                <div className="mt-4 flex items-start gap-3 rounded-lg bg-info/10 p-4">
                  <AlertCircle className="h-5 w-5 shrink-0 text-info" />
                  <p className="text-sm text-muted-foreground">
                    <strong>Demo Mode:</strong> Click "Choose File" to simulate resume upload 
                    with sample data.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Manual Skills Section */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary" />
                  Add Skills Manually
                </CardTitle>
                <CardDescription>
                  Type your skills or select from suggestions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex gap-2">
                  <Input
                    placeholder="Enter a skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addSkill(newSkill)}
                  />
                  <Button onClick={() => addSkill(newSkill)} disabled={!newSkill}>
                    Add
                  </Button>
                </div>

                <div className="mb-4">
                  <p className="mb-2 text-sm font-medium text-muted-foreground">
                    Quick Add:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedSkills.slice(0, 8).map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className={cn(
                          "cursor-pointer transition-all hover:bg-primary hover:text-primary-foreground",
                          skills.find(s => s.name === skill) && "bg-primary text-primary-foreground"
                        )}
                        onClick={() => addSkill(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skills Display */}
          {skills.length > 0 && (
            <Card className="mt-8 shadow-card">
              <CardHeader>
                <CardTitle>Your Skills ({skills.length})</CardTitle>
                <CardDescription>
                  Adjust proficiency levels for more accurate matching
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="rounded-lg border border-border bg-card p-4 transition-all hover:shadow-sm"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{skill.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {skill.category}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          onClick={() => removeSkill(skill.name)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={skill.level} className="flex-1" />
                        <span className="w-12 text-right text-sm font-medium text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={skill.level}
                        onChange={(e) => updateSkillLevel(skill.name, parseInt(e.target.value))}
                        className="mt-2 w-full accent-primary"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <Button variant="hero" size="lg" onClick={handleProceed}>
                    Find Matching Jobs
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  LayoutDashboard, 
  Target, 
  BookOpen, 
  TrendingUp,
  CheckCircle,
  Clock,
  FileText,
  Award
} from "lucide-react";
import { dashboardStats, userSkills } from "@/data/dummyData";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend
} from "recharts";
import { cn } from "@/lib/utils";

const activityIcons = {
  course: BookOpen,
  assessment: Target,
  resume: FileText,
};

export default function Dashboard() {
  const chartData = dashboardStats.skillProgress.map(skill => ({
    name: skill.skill,
    current: skill.current,
    target: skill.target,
  }));

  const readinessData = [
    {
      name: "Readiness",
      value: dashboardStats.overallReadiness,
      fill: "hsl(var(--primary))",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Your Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your progress and career readiness
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Career Readiness",
              value: `${dashboardStats.overallReadiness}%`,
              icon: Award,
              color: "text-primary",
              bg: "bg-primary/10",
            },
            {
              label: "Skills Assessed",
              value: dashboardStats.skillsAssessed,
              icon: Target,
              color: "text-success",
              bg: "bg-success/10",
            },
            {
              label: "Courses Completed",
              value: dashboardStats.coursesCompleted,
              icon: BookOpen,
              color: "text-info",
              bg: "bg-info/10",
            },
            {
              label: "Target Role",
              value: dashboardStats.targetRole,
              icon: TrendingUp,
              color: "text-accent",
              bg: "bg-accent/10",
              isText: true,
            },
          ].map((stat, index) => (
            <Card key={index} className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className={cn(
                      "mt-1 font-display font-bold",
                      stat.isText ? "text-xl" : "text-3xl",
                      "text-foreground"
                    )}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", stat.bg)}>
                    <stat.icon className={cn("h-6 w-6", stat.color)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Skill Progress Chart */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Skill Progress
                </CardTitle>
                <CardDescription>
                  Current level vs target for key skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="name" width={80} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '0.5rem'
                        }}
                      />
                      <Bar 
                        dataKey="current" 
                        fill="hsl(var(--primary))" 
                        radius={[0, 4, 4, 0]} 
                        name="Current"
                      />
                      <Bar 
                        dataKey="target" 
                        fill="hsl(var(--muted))" 
                        radius={[0, 4, 4, 0]}
                        name="Target"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Activity */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Weekly Learning Activity
                </CardTitle>
                <CardDescription>
                  Hours spent learning this week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dashboardStats.weeklyProgress}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '0.5rem'
                        }}
                      />
                      <Bar 
                        dataKey="hours" 
                        fill="hsl(var(--info))" 
                        radius={[4, 4, 0, 0]}
                        name="Hours"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Total: {dashboardStats.weeklyProgress.reduce((a, b) => a + b.hours, 0)} hours this week
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Readiness Gauge */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Career Readiness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="relative h-[180px] w-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart 
                        innerRadius="70%" 
                        outerRadius="100%" 
                        data={readinessData}
                        startAngle={180}
                        endAngle={0}
                      >
                        <RadialBar
                          background
                          dataKey="value"
                          cornerRadius={10}
                        />
                      </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display text-4xl font-bold text-foreground">
                        {dashboardStats.overallReadiness}%
                      </span>
                      <span className="text-sm text-muted-foreground">Ready</span>
                    </div>
                  </div>
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    You're <strong className="text-foreground">{dashboardStats.overallReadiness}%</strong> ready 
                    for your target role as a <strong className="text-foreground">{dashboardStats.targetRole}</strong>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Current Skills */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Your Skills
                </CardTitle>
                <CardDescription>
                  Based on your resume analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userSkills.slice(0, 5).map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LayoutDashboard className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardStats.recentActivity.map((activity, index) => {
                    const Icon = activityIcons[activity.type as keyof typeof activityIcons] || CheckCircle;
                    
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {activity.action}
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

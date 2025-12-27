import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '@/contexts/AppContext';
import { ArrowLeft, Star, Flame, Trophy, BookOpen, Award, Mic } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const confidenceData = [
  { day: 'Mon', points: 50 },
  { day: 'Tue', points: 100 },
  { day: 'Wed', points: 100 },
  { day: 'Thu', points: 150 },
  { day: 'Fri', points: 200 },
  { day: 'Sat', points: 250 },
  { day: 'Sun', points: 250 },
];

const recentActivity = [
  { action: "Completed 'Famous People Who Stutter'", time: '2 hours ago', points: 50 },
  { action: 'Earned Brave Speaker badge', time: 'Yesterday', points: 0, badge: true },
  { action: "Completed 'Why Voices Are Different'", time: '2 days ago', points: 50 },
];

const lessons = [
  { id: 1, title: 'Why Voices Are Different', status: 'completed', points: 50 },
  { id: 2, title: 'Famous People Who Stutter', status: 'completed', points: 50 },
  { id: 3, title: 'Brave Speaking Practice', status: 'in-progress', points: 100, premium: true },
  { id: 4, title: 'Breathing Techniques', status: 'locked', points: 75, premium: true },
  { id: 5, title: 'Confident Conversations', status: 'locked', points: 100, premium: true },
];

const badges = [
  { id: 'voice-explorer', name: 'Voice Explorer', emoji: '🎨', earned: true, date: '2 days ago' },
  { id: 'inspiration-seeker', name: 'Inspiration Seeker', emoji: '⭐', earned: true, date: 'Yesterday' },
  { id: 'brave-speaker', name: 'Brave Speaker', emoji: '🎤', earned: false },
  { id: 'streak-master', name: 'Streak Master', emoji: '🔥', earned: false, description: 'Complete 7 days in a row' },
  { id: 'confidence-builder', name: 'Confidence Builder', emoji: '💎', earned: false, description: 'Earn 500 points' },
  { id: 'practice-champion', name: 'Practice Champion', emoji: '🏆', earned: false, description: 'Complete 10 exercises' },
];

export default function KidProgress() {
  const { kidId } = useParams();
  const navigate = useNavigate();
  const { kids, isParentLoggedIn, setIsParentLoggedIn, setCurrentParent } = useApp();

  // Demo: auto-login for preview
  if (!isParentLoggedIn) {
    setIsParentLoggedIn(true);
    setCurrentParent({ id: '1', name: 'Sarah Johnson', email: 'sarah@example.com' });
  }

  const kid = kids.find(k => k.id === kidId) || kids[0];

  if (!kid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Kid not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/parent/dashboard')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">
                {kid.avatar}
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{kid.name}</h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-warning fill-warning" />
                    {kid.points} points
                  </span>
                  {kid.streak > 0 && (
                    <span className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-destructive" />
                      {kid.streak} day streak
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="progress" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-12">
            <TabsTrigger value="progress" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Progress
            </TabsTrigger>
            <TabsTrigger value="lessons" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Lessons
            </TabsTrigger>
            <TabsTrigger value="badges" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Badges
            </TabsTrigger>
            <TabsTrigger value="recordings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Recordings
            </TabsTrigger>
          </TabsList>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            {/* Confidence Chart */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Confidence Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={confidenceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="points" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="border-2">
                <CardContent className="p-4 text-center">
                  <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{kid.lessonsCompleted}</p>
                  <p className="text-sm text-muted-foreground">Total lessons</p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-4 text-center">
                  <Award className="w-8 h-8 text-warning mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{kid.badges.length}</p>
                  <p className="text-sm text-muted-foreground">Badges earned</p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-4 text-center">
                  <Flame className="w-8 h-8 text-destructive mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{kid.streak} days 🔥</p>
                  <p className="text-sm text-muted-foreground">Current streak</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          activity.badge ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'
                        }`}>
                          {activity.badge ? <Award className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                      {activity.points > 0 && (
                        <span className="text-sm font-semibold text-primary">+{activity.points} pts</span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lessons Tab */}
          <TabsContent value="lessons" className="space-y-4">
            {lessons.map((lesson) => (
              <Card key={lesson.id} className={`border-2 ${lesson.status === 'locked' ? 'opacity-60' : ''}`}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      lesson.status === 'completed' ? 'bg-success/10 text-success' :
                      lesson.status === 'in-progress' ? 'bg-primary/10 text-primary' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {lesson.status === 'completed' ? '✓' :
                       lesson.status === 'locked' ? '🔒' : 
                       <BookOpen className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{lesson.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {lesson.status === 'completed' ? 'Completed' :
                         lesson.status === 'in-progress' ? 'In Progress' : 
                         lesson.premium ? 'Premium' : 'Locked'}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    {lesson.status === 'completed' ? `+${lesson.points}` : `${lesson.points} pts`}
                  </span>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {badges.map((badge) => (
                <Card key={badge.id} className={`border-2 ${!badge.earned ? 'opacity-50 grayscale' : ''}`}>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-2">{badge.earned ? badge.emoji : '❓'}</div>
                    <p className="font-bold text-foreground">{badge.name}</p>
                    {badge.earned ? (
                      <p className="text-sm text-muted-foreground">Earned {badge.date}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">{badge.description || 'Locked'}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center mt-6 text-muted-foreground">
              {badges.filter(b => b.earned).length} of {badges.length} badges earned
            </p>
          </TabsContent>

          {/* Recordings Tab */}
          <TabsContent value="recordings">
            <Card className="border-2">
              <CardContent className="p-8 text-center">
                <Mic className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-semibold text-foreground mb-2">No recordings yet</p>
                <p className="text-muted-foreground mb-4">
                  {kid.name} hasn't completed any voice exercises yet.
                </p>
                <Button variant="outline">View Practice Lessons</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

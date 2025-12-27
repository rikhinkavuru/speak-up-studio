import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { Home, BookOpen, Award, User, Star, Flame, Lock } from 'lucide-react';

const lessons = [
  {
    id: 1,
    title: 'Why Voices Are Different',
    description: 'Learn why every voice is special!',
    icon: '🎨',
    color: 'bg-primary/10 border-primary/30',
    iconBg: 'bg-primary',
    points: 50,
    status: 'available',
    route: '/kid/lesson/voices',
  },
  {
    id: 2,
    title: 'Famous People Who Stutter',
    description: 'Meet inspiring role models!',
    icon: '⭐',
    color: 'bg-warning/10 border-warning/30',
    iconBg: 'bg-warning',
    points: 50,
    status: 'completed',
    route: '/kid/lesson/famous-people',
  },
  {
    id: 3,
    title: 'Brave Speaking Practice',
    description: 'Practice with your voice!',
    icon: '🎤',
    color: 'bg-accent/10 border-accent/30',
    iconBg: 'bg-accent',
    points: 100,
    status: 'locked',
    premium: true,
    route: '/kid/lesson/brave-speaking',
  },
];

export default function KidDashboard() {
  const navigate = useNavigate();
  const { currentKid, kids, loginAsKid, isKidLoggedIn } = useApp();

  // Demo: auto-login first kid for preview
  if (!isKidLoggedIn && kids.length > 0) {
    loginAsKid(kids[0]);
  }

  const kid = currentKid || kids[0];

  if (!kid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Please log in first</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl">
              {kid.avatar}
            </div>
            <span className="font-bold text-foreground">{kid.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-warning/10 text-warning font-bold">
              <Star className="w-4 h-4 fill-warning" />
              {kid.points}
            </div>
            {kid.streak > 0 && (
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-destructive/10 text-destructive font-bold">
                <Flame className="w-4 h-4" />
                {kid.streak}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-3xl mx-auto px-4 py-6">
        {/* Welcome */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-foreground mb-2">
            Hi {kid.name}! 👋
          </h1>
          <p className="text-lg text-muted-foreground">Ready to learn today?</p>
        </div>

        {/* Lessons Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Available Lessons</h2>
          
          <div className="grid gap-4">
            {lessons.map((lesson) => (
              <Card 
                key={lesson.id}
                className={`border-2 ${lesson.color} ${
                  lesson.status === 'locked' ? 'opacity-60' : 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
                } transition-all duration-200`}
                onClick={() => lesson.status !== 'locked' && navigate(lesson.route)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl ${lesson.iconBg} flex items-center justify-center text-3xl text-primary-foreground shadow-lg`}>
                    {lesson.status === 'locked' ? <Lock className="w-8 h-8" /> : lesson.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-foreground">{lesson.title}</h3>
                      {lesson.status === 'completed' && (
                        <span className="text-success text-lg">✓</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{lesson.description}</p>
                    <div className="flex items-center gap-2">
                      {lesson.premium && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-semibold">
                          Premium
                        </span>
                      )}
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                        +{lesson.points} points
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-8">
          <Card className="border-2 gradient-hero">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-2">Your progress</p>
              <div className="flex items-center justify-center gap-8">
                <div>
                  <p className="text-3xl font-extrabold text-foreground">{kid.lessonsCompleted}</p>
                  <p className="text-sm text-muted-foreground">Lessons</p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div>
                  <p className="text-3xl font-extrabold text-foreground">{kid.badges.length}</p>
                  <p className="text-sm text-muted-foreground">Badges</p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div>
                  <p className="text-3xl font-extrabold text-foreground">{kid.points}</p>
                  <p className="text-sm text-muted-foreground">Points</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-2 z-50">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <Link to="/kid/home" className="flex flex-col items-center gap-1 px-4 py-2 text-primary">
            <Home className="w-6 h-6" />
            <span className="text-xs font-semibold">Home</span>
          </Link>
          <Link to="/kid/home" className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
            <BookOpen className="w-6 h-6" />
            <span className="text-xs font-semibold">Lessons</span>
          </Link>
          <Link to="/kid/badges" className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors relative">
            <Award className="w-6 h-6" />
            <span className="text-xs font-semibold">Badges</span>
            <span className="absolute top-0 right-2 w-2 h-2 bg-destructive rounded-full" />
          </Link>
          <Link to="/kid/profile" className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
            <User className="w-6 h-6" />
            <span className="text-xs font-semibold">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

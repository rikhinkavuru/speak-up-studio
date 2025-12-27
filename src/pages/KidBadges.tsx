import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { Home, BookOpen, Award, User, ArrowLeft } from 'lucide-react';

const allBadges = [
  { id: 'voice-explorer', name: 'Voice Explorer', emoji: '🎨', description: 'Complete "Why Voices Are Different"' },
  { id: 'inspiration-seeker', name: 'Inspiration Seeker', emoji: '⭐', description: 'Meet famous role models' },
  { id: 'brave-speaker', name: 'Brave Speaker', emoji: '🎤', description: 'Complete a voice exercise' },
  { id: 'streak-master', name: 'Streak Master', emoji: '🔥', description: 'Complete 7 days in a row' },
  { id: 'confidence-builder', name: 'Confidence Builder', emoji: '💎', description: 'Earn 500 points' },
  { id: 'practice-champion', name: 'Practice Champion', emoji: '🏆', description: 'Complete 10 exercises' },
];

export default function KidBadges() {
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

  const earnedCount = allBadges.filter(b => kid.badges.includes(b.id)).length;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border p-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/kid/home')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Your Badge Collection</h1>
            <p className="text-sm text-muted-foreground">Earn badges by completing lessons!</p>
          </div>
        </div>
      </header>

      {/* Badges Grid */}
      <main className="container max-w-3xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {allBadges.map((badge) => {
            const isEarned = kid.badges.includes(badge.id);
            return (
              <Card 
                key={badge.id} 
                className={`border-2 ${isEarned ? 'border-primary/30' : 'opacity-50 grayscale'}`}
              >
                <CardContent className="p-4 text-center">
                  <div className={`text-5xl mb-2 ${isEarned ? '' : ''}`}>
                    {isEarned ? badge.emoji : '❓'}
                  </div>
                  <p className="font-bold text-foreground text-sm">{badge.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {isEarned ? 'Earned!' : badge.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Progress */}
        <div className="text-center">
          <p className="text-lg text-foreground mb-2">
            <span className="font-bold text-primary">{earnedCount}</span> of{' '}
            <span className="font-bold">{allBadges.length}</span> badges earned
          </p>
          <div className="h-4 bg-muted rounded-full overflow-hidden max-w-xs mx-auto">
            <div 
              className="h-full gradient-primary rounded-full transition-all duration-500"
              style={{ width: `${(earnedCount / allBadges.length) * 100}%` }}
            />
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-2 z-50">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <Link to="/kid/home" className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
            <Home className="w-6 h-6" />
            <span className="text-xs font-semibold">Home</span>
          </Link>
          <Link to="/kid/home" className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
            <BookOpen className="w-6 h-6" />
            <span className="text-xs font-semibold">Lessons</span>
          </Link>
          <Link to="/kid/badges" className="flex flex-col items-center gap-1 px-4 py-2 text-primary">
            <Award className="w-6 h-6" />
            <span className="text-xs font-semibold">Badges</span>
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

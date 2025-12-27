import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useApp } from '@/contexts/AppContext';
import { Home, BookOpen, Award, User, ArrowLeft, Star, Flame, Trophy, LogOut } from 'lucide-react';
import { useState } from 'react';

const avatars = ['🦁', '🐼', '🦊', '🐨', '🐯', '🐸', '🦉', '🐻'];

export default function KidProfile() {
  const navigate = useNavigate();
  const { currentKid, kids, loginAsKid, isKidLoggedIn, logout, updateKid } = useApp();
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [dailyReminder, setDailyReminder] = useState(true);
  const [celebrateAchievements, setCelebrateAchievements] = useState(true);

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

  const handleAvatarChange = (avatar: string) => {
    updateKid(kid.id, { avatar });
    setShowAvatarPicker(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border p-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/kid/home')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">My Profile</h1>
        </div>
      </header>

      {/* Content */}
      <main className="container max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Avatar & Name */}
        <div className="text-center">
          <button 
            onClick={() => setShowAvatarPicker(!showAvatarPicker)}
            className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center text-5xl mx-auto mb-4 hover:scale-105 transition-transform"
          >
            {kid.avatar}
          </button>
          <h2 className="text-2xl font-bold text-foreground">{kid.name}</h2>
          <p className="text-muted-foreground">{kid.age} years old</p>
          
          {showAvatarPicker && (
            <Card className="mt-4 border-2">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-3">Choose a new avatar:</p>
                <div className="grid grid-cols-4 gap-2">
                  {avatars.map((avatar) => (
                    <button
                      key={avatar}
                      onClick={() => handleAvatarChange(avatar)}
                      className={`aspect-square rounded-xl text-3xl flex items-center justify-center transition-all ${
                        kid.avatar === avatar 
                          ? 'bg-primary/20 border-2 border-primary' 
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Stats */}
        <Card className="border-2">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-xl">
                <Star className="w-6 h-6 text-warning mx-auto mb-1 fill-warning" />
                <p className="text-2xl font-bold text-foreground">{kid.points}</p>
                <p className="text-xs text-muted-foreground">Total Points</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-xl">
                <Trophy className="w-6 h-6 text-accent mx-auto mb-1" />
                <p className="text-2xl font-bold text-foreground">Confident Speaker</p>
                <p className="text-xs text-muted-foreground">Current Level</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-xl">
                <BookOpen className="w-6 h-6 text-primary mx-auto mb-1" />
                <p className="text-2xl font-bold text-foreground">{kid.lessonsCompleted}</p>
                <p className="text-xs text-muted-foreground">Lessons Done</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-xl">
                <Award className="w-6 h-6 text-secondary mx-auto mb-1" />
                <p className="text-2xl font-bold text-foreground">{kid.badges.length}</p>
                <p className="text-xs text-muted-foreground">Badges Earned</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border flex justify-around">
              <div className="text-center">
                <div className="flex items-center gap-1 text-destructive">
                  <Flame className="w-5 h-5" />
                  <span className="text-xl font-bold">{kid.streak} days</span>
                </div>
                <p className="text-xs text-muted-foreground">Current Streak</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-warning">
                  <Flame className="w-5 h-5" />
                  <span className="text-xl font-bold">5 days</span>
                </div>
                <p className="text-xs text-muted-foreground">Longest Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="border-2">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-bold text-foreground">Settings</h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="daily-reminder" className="cursor-pointer">
                <div className="font-medium">Daily Reminder</div>
                <div className="text-sm text-muted-foreground">Get reminded to practice</div>
              </Label>
              <Switch 
                id="daily-reminder" 
                checked={dailyReminder}
                onCheckedChange={setDailyReminder}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="celebrate" className="cursor-pointer">
                <div className="font-medium">Celebrate Achievements</div>
                <div className="text-sm text-muted-foreground">Show celebrations for badges</div>
              </Label>
              <Switch 
                id="celebrate" 
                checked={celebrateAchievements}
                onCheckedChange={setCelebrateAchievements}
              />
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button 
          variant="outline" 
          className="w-full gap-2" 
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Log out
        </Button>
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
          <Link to="/kid/badges" className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
            <Award className="w-6 h-6" />
            <span className="text-xs font-semibold">Badges</span>
          </Link>
          <Link to="/kid/profile" className="flex flex-col items-center gap-1 px-4 py-2 text-primary">
            <User className="w-6 h-6" />
            <span className="text-xs font-semibold">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

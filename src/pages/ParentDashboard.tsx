import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { LayoutDashboard, Users, CreditCard, Settings, Plus, Clock, Star, Flame, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ParentDashboard() {
  const navigate = useNavigate();
  const { currentParent, kids, logout, isParentLoggedIn } = useApp();

  // Demo: auto-login for preview
  const { setIsParentLoggedIn, setCurrentParent } = useApp();
  if (!isParentLoggedIn) {
    setIsParentLoggedIn(true);
    setCurrentParent({ id: '1', name: 'Sarah Johnson', email: 'sarah@example.com' });
  }

  const totalPoints = kids.reduce((acc, kid) => acc + kid.points, 0);
  const activeThisWeek = kids.filter(kid => kid.lastActive.includes('hour') || kid.lastActive === 'Just now').length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🗣️</span>
            <span className="text-lg font-bold text-foreground">FluentVoice</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/parent/dashboard" className="flex items-center gap-2 text-primary font-semibold">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Link to="/parent/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Users className="w-4 h-4" />
              My Kids
            </Link>
            <Link to="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <CreditCard className="w-4 h-4" />
              Subscription
            </Link>
            <Link to="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Settings className="w-4 h-4" />
              Settings
            </Link>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {currentParent?.name?.[0] || 'S'}
                </div>
                <span className="hidden sm:inline">{currentParent?.name || 'Sarah Johnson'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {currentParent?.name?.split(' ')[0] || 'Sarah'}! 👋
          </h1>
          <p className="text-muted-foreground">Here's how your kids are doing this week.</p>
        </div>

        {/* Overview Cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Kids</p>
                  <p className="text-2xl font-bold text-foreground">{kids.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Star className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Confidence Points</p>
                  <p className="text-2xl font-bold text-foreground">{totalPoints}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active This Week</p>
                  <p className="text-2xl font-bold text-foreground">{activeThisWeek}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kid Progress Cards */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Kid Progress</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {kids.map((kid) => (
              <Card key={kid.id} className="border-2 hover:border-primary/30 transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
                        {kid.avatar}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{kid.name}</h3>
                        <p className="text-sm text-muted-foreground">{kid.age} years old</p>
                      </div>
                    </div>
                    {kid.streak > 0 && (
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-semibold">
                        <Flame className="w-4 h-4" />
                        {kid.streak} day streak
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-muted/50 rounded-xl p-3">
                      <p className="text-xs text-muted-foreground mb-1">Lessons completed</p>
                      <p className="text-lg font-bold text-foreground">{kid.lessonsCompleted}/{kid.totalLessons}</p>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-3">
                      <p className="text-xs text-muted-foreground mb-1">Confidence points</p>
                      <p className="text-lg font-bold text-foreground flex items-center gap-1">
                        {kid.points} <Star className="w-4 h-4 text-warning fill-warning" />
                      </p>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-3">
                      <p className="text-xs text-muted-foreground mb-1">Time this week</p>
                      <p className="text-lg font-bold text-foreground">{kid.lessonsCompleted * 15} min</p>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-3">
                      <p className="text-xs text-muted-foreground mb-1">Last active</p>
                      <p className="text-lg font-bold text-foreground flex items-center gap-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        {kid.lastActive}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold text-foreground">{Math.round((kid.lessonsCompleted / kid.totalLessons) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full gradient-primary rounded-full transition-all duration-500"
                        style={{ width: `${(kid.lessonsCompleted / kid.totalLessons) * 100}%` }}
                      />
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => navigate(`/parent/kid/${kid.id}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Add Another Child */}
        <Button 
          variant="outline" 
          className="w-full max-w-md mx-auto flex items-center gap-2"
          onClick={() => navigate('/parent/create-kid')}
        >
          <Plus className="w-5 h-5" />
          Add another child
        </Button>
      </main>
    </div>
  );
}

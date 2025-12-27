import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/contexts/AppContext';
import { Eye, EyeOff } from 'lucide-react';

export default function ParentLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setIsParentLoggedIn, setCurrentParent } = useApp();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCurrentParent({
      id: '1',
      name: 'Sarah Johnson',
      email,
    });
    setIsParentLoggedIn(true);
    
    toast({
      title: 'Welcome back!',
      description: 'You\'re now logged in.',
    });
    
    navigate('/parent/dashboard');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <span className="text-3xl">🗣️</span>
            <span className="text-xl font-bold text-foreground">FluentVoice</span>
          </Link>
        </div>

        <Card className="border-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Log in to monitor your child's progress</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log In'}
              </Button>
            </form>

            <p className="text-center mt-6 text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/parent/signup" className="text-primary font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

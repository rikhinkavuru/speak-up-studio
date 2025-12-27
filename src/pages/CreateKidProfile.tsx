import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/contexts/AppContext';

const avatars = [
  { emoji: '🦁', name: 'Lion' },
  { emoji: '🐼', name: 'Panda' },
  { emoji: '🦊', name: 'Fox' },
  { emoji: '🐨', name: 'Koala' },
  { emoji: '🐯', name: 'Tiger' },
  { emoji: '🐸', name: 'Frog' },
  { emoji: '🦉', name: 'Owl' },
  { emoji: '🐻', name: 'Bear' },
];

const goals = [
  { id: 'confidence', label: 'Building confidence' },
  { id: 'understanding', label: 'Understanding their voice' },
  { id: 'practice', label: 'Speaking practice' },
  { id: 'role-models', label: 'Learning from role models' },
];

export default function CreateKidProfile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addKid } = useApp();
  
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((id) => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAvatar) {
      toast({
        title: 'Choose an avatar',
        description: 'Please select an avatar for your child.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newKid = {
      id: Date.now().toString(),
      name,
      age: parseInt(age),
      avatar: selectedAvatar,
      points: 0,
      lessonsCompleted: 0,
      totalLessons: 10,
      streak: 0,
      lastActive: 'Just now',
      badges: [],
      goals: selectedGoals.map((id) => goals.find((g) => g.id === id)?.label || ''),
    };
    
    addKid(newKid);
    
    toast({
      title: `${name}'s profile created!`,
      description: 'Your child can now start their learning journey.',
    });
    
    navigate('/parent/dashboard');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <span className="text-3xl">🗣️</span>
            <span className="text-xl font-bold text-foreground">FluentVoice</span>
          </Link>
        </div>

        <Card className="border-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Let's create a profile for your child</CardTitle>
            <CardDescription>This helps personalize their learning experience</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Child's name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your child's name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Select value={age} onValueChange={setAge} required>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select age" />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 6, 7, 8, 9, 10, 11, 12].map((a) => (
                      <SelectItem key={a} value={a.toString()}>
                        {a} years old
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Choose an avatar</Label>
                <div className="grid grid-cols-4 gap-3">
                  {avatars.map((avatar) => (
                    <button
                      key={avatar.emoji}
                      type="button"
                      onClick={() => setSelectedAvatar(avatar.emoji)}
                      className={`aspect-square rounded-2xl text-4xl flex items-center justify-center transition-all duration-200 border-2 ${
                        selectedAvatar === avatar.emoji
                          ? 'border-primary bg-primary/10 scale-105 shadow-md'
                          : 'border-border bg-card hover:border-primary/50 hover:bg-muted'
                      }`}
                    >
                      {avatar.emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>What would {name || 'your child'} like to work on?</Label>
                <div className="space-y-2">
                  {goals.map((goal) => (
                    <div
                      key={goal.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedGoals.includes(goal.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleGoalToggle(goal.id)}
                    >
                      <Checkbox
                        id={goal.id}
                        checked={selectedGoals.includes(goal.id)}
                        onCheckedChange={() => handleGoalToggle(goal.id)}
                      />
                      <Label htmlFor={goal.id} className="cursor-pointer flex-1 font-normal">
                        {goal.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating Profile...' : 'Create Profile'}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                <Link to="/parent/dashboard" className="text-primary hover:underline">
                  Add another child later
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

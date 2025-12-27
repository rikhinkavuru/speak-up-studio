import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Heart, Star } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

const famousPeople = [
  {
    name: 'Joe Biden',
    title: 'President of the United States',
    fact: 'Did you know Joe Biden stutters? He worked hard and became President!',
    quote: '"Don\'t let it define you."',
    emoji: '🇺🇸',
  },
  {
    name: 'Emily Blunt',
    title: 'Award-Winning Actor',
    fact: 'Emily Blunt overcame her stutter to become one of the most famous actors in the world!',
    quote: '"Acting gave me my voice."',
    emoji: '🎬',
  },
  {
    name: 'Ed Sheeran',
    title: 'Grammy-Winning Musician',
    fact: 'Ed Sheeran used music to help with his stutter. Now millions sing along to his songs!',
    quote: '"Music saved me."',
    emoji: '🎵',
  },
  {
    name: 'Samuel L. Jackson',
    title: 'Legendary Actor',
    fact: 'Samuel L. Jackson is one of the most successful actors ever, and he stutters!',
    quote: '"My stutter made me strong."',
    emoji: '🎭',
  },
  {
    name: 'James Earl Jones',
    title: 'Voice of Darth Vader',
    fact: 'The voice of Darth Vader and Mufasa grew up with a stutter. Now his voice is world famous!',
    quote: '"I found my voice through acting."',
    emoji: '⭐',
  },
];

export default function LessonFamousPeople() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentKid, updateKid } = useApp();
  const [currentCard, setCurrentCard] = useState(0);
  const [inspired, setInspired] = useState<number[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);

  const person = famousPeople[currentCard];
  const isLastCard = currentCard === famousPeople.length - 1;

  const handleNext = () => {
    if (currentCard < famousPeople.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      // Complete the lesson
      if (currentKid) {
        updateKid(currentKid.id, {
          points: currentKid.points + 50,
          lessonsCompleted: Math.max(currentKid.lessonsCompleted, 2),
          badges: currentKid.badges.includes('inspiration-seeker') 
            ? currentKid.badges 
            : [...currentKid.badges, 'inspiration-seeker'],
        });
      }
      setShowCompletion(true);
    }
  };

  const handlePrev = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  const handleInspire = () => {
    if (!inspired.includes(currentCard)) {
      setInspired([...inspired, currentCard]);
      toast({
        title: '❤️ Inspiring!',
        description: `${person.name} inspires you!`,
      });
    }
  };

  if (showCompletion) {
    return (
      <div className="min-h-screen gradient-hero flex flex-col items-center justify-center p-6 text-center">
        <div className="animate-celebrate">
          <div className="text-8xl mb-6">🌟</div>
          <h1 className="text-3xl font-extrabold text-foreground mb-4">Amazing Work!</h1>
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-primary mb-4 animate-points">
            <Star className="w-8 h-8 fill-warning text-warning" />
            +50 points!
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-lg mb-6">
            <p className="text-lg text-muted-foreground mb-2">Badge Unlocked:</p>
            <div className="text-5xl mb-2">⭐</div>
            <p className="text-xl font-bold text-foreground">Inspiration Seeker</p>
          </div>
          <p className="text-muted-foreground mb-6">
            You found {inspired.length} inspiring role models!
          </p>
          <div className="flex flex-col gap-3">
            <Button variant="kid" size="kid" onClick={() => navigate('/kid/home')}>
              Back to lessons
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => navigate('/kid/home')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-foreground">Meet Inspiring People</h1>
        <span className="text-sm font-semibold text-muted-foreground">
          {currentCard + 1} of {famousPeople.length}
        </span>
      </header>

      {/* Card */}
      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md border-2 shadow-xl">
          <CardContent className="p-6 text-center">
            <div className="text-6xl mb-4">{person.emoji}</div>
            <h2 className="text-2xl font-bold text-foreground mb-1">{person.name}</h2>
            <p className="text-sm text-muted-foreground mb-4">{person.title}</p>
            
            <div className="bg-muted/50 rounded-xl p-4 mb-4">
              <p className="text-foreground text-lg">{person.fact}</p>
            </div>
            
            <p className="text-primary italic text-lg font-semibold mb-6">{person.quote}</p>
            
            <Button
              variant={inspired.includes(currentCard) ? 'default' : 'outline'}
              className="gap-2"
              onClick={handleInspire}
              disabled={inspired.includes(currentCard)}
            >
              <Heart className={`w-5 h-5 ${inspired.includes(currentCard) ? 'fill-current' : ''}`} />
              {inspired.includes(currentCard) ? 'This inspires me!' : 'This inspires me!'}
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 py-4">
        {famousPeople.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentCard ? 'bg-primary scale-110' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Navigation */}
      <footer className="p-6 flex justify-between items-center gap-4">
        <Button
          variant="ghost"
          size="lg"
          onClick={handlePrev}
          disabled={currentCard === 0}
          className="min-w-[120px]"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Previous
        </Button>
        <Button
          variant="kid"
          size="lg"
          onClick={handleNext}
          className="min-w-[120px]"
        >
          {isLastCard ? 'Complete!' : 'Next'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </footer>
    </div>
  );
}

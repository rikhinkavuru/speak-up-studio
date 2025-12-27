import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

const slides = [
  {
    illustration: '👧👦🧒',
    text: 'Did you know? Every person\'s voice is unique and special!',
  },
  {
    illustration: '🐕🐈🐦',
    text: 'Just like animals make different sounds, people have different voices too!',
  },
  {
    illustration: '👆',
    text: 'Your voice is like a fingerprint - it belongs only to you!',
  },
  {
    illustration: '🗣️✨',
    text: 'Some voices are fast, some are slow. Some are high, some are low. All are perfect!',
  },
  {
    illustration: '💪😊',
    text: 'Your voice doesn\'t have to sound like anyone else\'s. It\'s yours!',
  },
  {
    illustration: '🎉',
    text: 'Your voice is part of what makes you YOU!',
    isLast: true,
  },
];

const quizOptions = [
  { emoji: '😊', text: "It's mine!" },
  { emoji: '✨', text: "It's unique!" },
  { emoji: '🌟', text: "It's awesome!" },
];

export default function LessonVoices() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentKid, updateKid } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const progress = ((currentSlide + 1) / slides.length) * 100;
  const slide = slides[currentSlide];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (!showQuiz) {
      setShowQuiz(true);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleQuizAnswer = (index: number) => {
    setSelectedAnswer(index);
    setQuizComplete(true);
    
    // Award points
    if (currentKid) {
      updateKid(currentKid.id, {
        points: currentKid.points + 50,
        lessonsCompleted: currentKid.lessonsCompleted + 1,
        badges: [...currentKid.badges, 'voice-explorer'],
      });
    }

    toast({
      title: '🎉 Amazing!',
      description: 'You earned 50 points and the Voice Explorer badge!',
    });
  };

  if (quizComplete) {
    return (
      <div className="min-h-screen gradient-hero flex flex-col items-center justify-center p-6 text-center">
        <div className="animate-celebrate">
          <div className="text-8xl mb-6">🎉</div>
          <h1 className="text-3xl font-extrabold text-foreground mb-4">You Did It!</h1>
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-primary mb-4 animate-points">
            <Star className="w-8 h-8 fill-warning text-warning" />
            +50 points!
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-lg mb-6">
            <p className="text-lg text-muted-foreground mb-2">Badge Unlocked:</p>
            <div className="text-5xl mb-2">🎨</div>
            <p className="text-xl font-bold text-foreground">Voice Explorer</p>
          </div>
          <div className="flex flex-col gap-3">
            <Button variant="kid" size="kid" onClick={() => navigate('/kid/lesson/famous-people')}>
              Continue to next lesson
            </Button>
            <Button variant="ghost" onClick={() => navigate('/kid/home')}>
              Back to home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="p-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setShowQuiz(false)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <Progress value={100} className="h-3" />
          </div>
          <span className="text-sm font-semibold text-muted-foreground">Quiz!</span>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="text-6xl mb-6">🤔</div>
          <h2 className="text-2xl font-bold text-foreground mb-8">
            What makes your voice special?
          </h2>
          <div className="space-y-4 w-full max-w-sm">
            {quizOptions.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                size="kid"
                className="w-full text-xl justify-start gap-4 h-16"
                onClick={() => handleQuizAnswer(index)}
              >
                <span className="text-3xl">{option.emoji}</span>
                {option.text}
              </Button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with Progress */}
      <header className="p-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/kid/home')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <Progress value={progress} className="h-3" />
        </div>
        <span className="text-sm font-semibold text-muted-foreground">
          {currentSlide + 1} of {slides.length}
        </span>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="text-8xl mb-8 animate-float">{slide.illustration}</div>
        <p className="text-2xl font-bold text-foreground max-w-md leading-relaxed">
          {slide.text}
        </p>
      </main>

      {/* Navigation */}
      <footer className="p-6 flex justify-between items-center gap-4">
        <Button
          variant="ghost"
          size="lg"
          onClick={handlePrev}
          disabled={currentSlide === 0}
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
          {slide.isLast ? 'Take Quiz!' : 'Next'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </footer>
    </div>
  );
}

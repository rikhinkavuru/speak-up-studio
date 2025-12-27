import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Mic, Play, Trash2, Star, Lock } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

const encouragements = [
  "Amazing! You spoke so bravely! 🌟",
  "Great job! Your voice is wonderful! 💪",
  "You did it! That takes courage! ❤️",
  "Fantastic! Keep using that amazing voice! ✨",
  "Wow! You're a brave speaker! 🎤",
];

export default function LessonBraveSpeaking() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentKid, updateKid } = useApp();
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [isPremium] = useState(false); // Would check subscription status

  // Simulate recording (in real app, would use MediaRecorder API)
  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    
    const interval = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= 5) {
          clearInterval(interval);
          setIsRecording(false);
          setHasRecording(true);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setHasRecording(true);
  };

  const deleteRecording = () => {
    setHasRecording(false);
    setRecordingTime(0);
  };

  const submitRecording = () => {
    const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
    
    if (currentKid) {
      updateKid(currentKid.id, {
        points: currentKid.points + 100,
        lessonsCompleted: Math.max(currentKid.lessonsCompleted, 3),
        badges: currentKid.badges.includes('brave-speaker') 
          ? currentKid.badges 
          : [...currentKid.badges, 'brave-speaker'],
      });
    }

    toast({
      title: randomEncouragement,
      description: '+100 points!',
    });

    setShowCompletion(true);
  };

  if (!isPremium && !currentKid?.badges.includes('brave-speaker')) {
    // Show premium gate (for demo, we'll allow access)
  }

  if (showCompletion) {
    return (
      <div className="min-h-screen gradient-hero flex flex-col items-center justify-center p-6 text-center">
        <div className="animate-celebrate">
          <div className="text-8xl mb-6">🎤</div>
          <h1 className="text-3xl font-extrabold text-foreground mb-4">You're a Brave Speaker!</h1>
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-primary mb-4 animate-points">
            <Star className="w-8 h-8 fill-warning text-warning" />
            +100 points!
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-lg mb-6">
            <p className="text-lg text-muted-foreground mb-2">Badge Unlocked:</p>
            <div className="text-5xl mb-2">🎤</div>
            <p className="text-xl font-bold text-foreground">Brave Speaker</p>
          </div>
          <div className="flex flex-col gap-3">
            <Button variant="kid" size="kid" onClick={() => {
              setShowCompletion(false);
              setHasRecording(false);
              setRecordingTime(0);
            }}>
              Do another exercise
            </Button>
            <Button variant="ghost" onClick={() => navigate('/kid/home')}>
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
      <header className="p-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/kid/home')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold text-foreground flex-1">Brave Speaking Practice</h1>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl text-muted-foreground mb-4">Say this sentence out loud:</h2>
        
        <Card className="w-full max-w-md border-2 mb-8">
          <CardContent className="p-6">
            <p className="text-3xl font-bold text-foreground leading-relaxed">
              "I like my voice"
            </p>
          </CardContent>
        </Card>

        {!hasRecording ? (
          <div className="space-y-4">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-32 h-32 rounded-full flex items-center justify-center text-primary-foreground shadow-xl transition-all duration-300 ${
                isRecording 
                  ? 'bg-destructive animate-pulse scale-110' 
                  : 'gradient-primary hover:scale-105'
              }`}
            >
              <Mic className="w-12 h-12" />
            </button>
            <p className="text-lg text-muted-foreground">
              {isRecording ? `Recording... ${recordingTime}s` : 'Tap to Record'}
            </p>
          </div>
        ) : (
          <div className="space-y-6 w-full max-w-md">
            {/* Waveform visualization placeholder */}
            <Card className="border-2">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Play className="w-5 h-5" />
                  </Button>
                  <div className="flex-1 h-12 bg-muted rounded-lg overflow-hidden flex items-center justify-center gap-1 px-2">
                    {/* Fake waveform */}
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-primary rounded-full"
                        style={{ 
                          height: `${Math.random() * 100}%`,
                          opacity: 0.5 + Math.random() * 0.5,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{recordingTime}s</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                variant="outline"
                size="lg"
                className="flex-1 gap-2"
                onClick={deleteRecording}
              >
                <Trash2 className="w-5 h-5" />
                Try again
              </Button>
              <Button
                variant="kid"
                size="lg"
                className="flex-1"
                onClick={submitRecording}
              >
                I'm done!
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

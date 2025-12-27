import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';

export default function KidLogin() {
  const navigate = useNavigate();
  const { kids, loginAsKid } = useApp();

  const handleKidSelect = (kid: typeof kids[0]) => {
    loginAsKid(kid);
    navigate('/kid/home');
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <span className="text-5xl mb-4 block">🗣️</span>
        <h1 className="text-4xl font-extrabold text-foreground mb-2">Who's learning today?</h1>
        <p className="text-lg text-muted-foreground">Tap your avatar to start!</p>
      </div>

      <div className="grid grid-cols-2 gap-6 max-w-lg w-full mb-8">
        {kids.map((kid) => (
          <button
            key={kid.id}
            onClick={() => handleKidSelect(kid)}
            className="kid-card p-6 flex flex-col items-center gap-4 hover:scale-105 active:scale-95 transition-transform"
          >
            <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center text-5xl animate-float">
              {kid.avatar}
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">{kid.name}</p>
              <p className="text-sm text-muted-foreground">Tap to start!</p>
            </div>
          </button>
        ))}
      </div>

      <Button variant="ghost" onClick={() => navigate('/')} className="text-muted-foreground">
        ← Back to home
      </Button>
    </div>
  );
}

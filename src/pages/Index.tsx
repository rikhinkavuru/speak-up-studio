import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Gamepad2, BarChart3, Users, BookOpen, TrendingUp, CheckCircle, Star, ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-kids.png';

const features = [
  {
    icon: Heart,
    title: 'Build Confidence',
    description: 'Our acceptance-first approach helps children embrace their unique voice and build lasting self-confidence.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Gamepad2,
    title: 'Learn Through Play',
    description: 'Gamified lessons with points, badges, and streaks keep kids engaged and excited to practice.',
    color: 'bg-secondary/10 text-secondary',
  },
  {
    icon: BarChart3,
    title: 'Track Progress',
    description: 'Parents get detailed insights into their child\'s journey with easy-to-understand progress reports.',
    color: 'bg-accent/10 text-accent',
  },
];

const steps = [
  { number: 1, title: 'Parent creates account', description: 'Sign up in less than a minute' },
  { number: 2, title: 'Add your child\'s profile', description: 'Personalize their learning experience' },
  { number: 3, title: 'Child completes fun lessons', description: 'Interactive stories and exercises' },
  { number: 4, title: 'Track confidence growth', description: 'See real progress over time' },
];

const testimonials = [
  {
    quote: "Emma used to be so self-conscious about her speech. Now she actually looks forward to practice time! The game-like format makes all the difference.",
    name: 'Sarah M.',
    kidAge: 8,
    rating: 5,
  },
  {
    quote: "As a parent, I love being able to see Jake's progress without hovering over him. The parent dashboard gives me peace of mind.",
    name: 'Michael T.',
    kidAge: 10,
    rating: 5,
  },
  {
    quote: "The famous people who stutter lesson was a game-changer for my daughter. She finally understood she's not alone.",
    name: 'Jennifer L.',
    kidAge: 7,
    rating: 5,
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-3xl">🗣️</span>
            <span className="text-xl font-bold text-foreground">FluentVoice</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/parent/login">Log In</Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/parent/signup">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground">
                Help Your Child{' '}
                <span className="text-primary">Embrace</span> Their{' '}
                <span className="text-secondary">Unique Voice</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                A confidence-first approach to speech wellness for kids ages 5-12. 
                Fun, engaging, and backed by speech therapy best practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="xl" variant="hero" asChild>
                  <Link to="/parent/signup">
                    Start Free Trial <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button size="xl" variant="outline" asChild>
                  <Link to="/kid/login">
                    <Users className="w-5 h-5" /> Kid Login
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-success" />
                  No credit card required
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-success" />
                  2 free lessons included
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-2xl animate-pulse-slow" />
              <img
                src={heroImage}
                alt="Diverse happy children speaking confidently together"
                className="relative rounded-2xl shadow-2xl w-full animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Parents Love FluentVoice
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine the best of speech therapy research with engaging, kid-friendly technology.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mx-auto`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting started is easy. Your child can be learning within minutes.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-border" />
                )}
                <div className="relative bg-card rounded-2xl p-6 border-2 border-border/50 hover:border-primary/30 transition-all hover:shadow-lg text-center">
                  <div className="w-12 h-12 rounded-full gradient-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Loved by Parents Everywhere
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what families are saying about their FluentVoice journey.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 border-border/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-foreground italic">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">Parent of {testimonial.kidAge}-year-old</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Help Your Child Thrive?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of families who are building confidence, one lesson at a time.
          </p>
          <Button size="xl" variant="outline" className="border-2 border-primary-foreground bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
            <Link to="/parent/signup">
              Start Free Trial Today <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🗣️</span>
                <span className="text-lg font-bold">FluentVoice</span>
              </div>
              <p className="text-background/70 text-sm">
                Empowering children who stutter to embrace their unique voice.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#features" className="hover:text-background transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-background transition-colors">For Schools</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-background transition-colors">COPPA Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/60">
            © {new Date().getFullYear()} FluentVoice. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

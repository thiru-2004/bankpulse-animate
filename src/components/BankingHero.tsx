import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Smartphone, TrendingUp, Users, ChevronRight, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import heroImage from "@/assets/banking-hero.jpg";
import securityIcon from "@/assets/security-icon.jpg";
import mobileBankingIcon from "@/assets/mobile-banking-icon.jpg";

interface BankingHeroProps {
  onLoginSuccess: (userType: 'customer' | 'admin') => void;
}

export function BankingHero({ onLoginSuccess }: BankingHeroProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginType, setLoginType] = useState<'customer' | 'admin'>('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    accountNumber: '',
    password: '',
    captcha: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login success
    onLoginSuccess(loginType);
    setIsLoginOpen(false);
  };

  const features = [
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Advanced encryption and multi-factor authentication",
      image: securityIcon
    },
    {
      icon: Smartphone,
      title: "Mobile Banking",
      description: "Access your account anywhere, anytime",
      image: mobileBankingIcon
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description: "Track spending patterns and financial insights"
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Round-the-clock customer service"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl floating" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl floating" style={{ animationDelay: '1s' }} />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-12">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-banking rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">SecureBank</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10"
            onClick={() => {
              setLoginType('customer');
              setIsLoginOpen(true);
            }}
          >
            Customer Login
          </Button>
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10"
            onClick={() => {
              setLoginType('admin');
              setIsLoginOpen(true);
            }}
          >
            Admin Login
          </Button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="text-white space-y-8 slide-in-left">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Banking
              <span className="block bg-gradient-to-r from-accent to-secondary-light bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/80 leading-relaxed">
              Experience the future of banking with our secure, intuitive platform. 
              Manage your finances with confidence and ease.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="btn-banking text-lg px-8 py-4"
                onClick={() => {
                  setLoginType('customer');
                  setIsLoginOpen(true);
                }}
              >
                Get Started
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                className="text-white border-white/30 hover:bg-white/10 text-lg px-8 py-4"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">1M+</div>
                <div className="text-white/60">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-light">₹50K Cr</div>
                <div className="text-white/60">Assets</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">99.9%</div>
                <div className="text-white/60">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="slide-in-right">
            <img 
              src={heroImage} 
              alt="Banking Hero" 
              className="w-full h-auto rounded-3xl shadow-banking"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md border-t border-white/20">
        <div className="container mx-auto px-6 lg:px-12 py-20">
          <div className="text-center mb-16 slide-in-up">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose SecureBank?</h2>
            <p className="text-xl text-white/80">Experience banking with cutting-edge technology and unmatched security</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="banking-card p-6 text-center hover:scale-105 transition-transform duration-300 slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-banking rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="banking-card w-full max-w-md p-8 scale-in">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">
                {loginType === 'admin' ? 'Admin Login' : 'Customer Login'}
              </h3>
              <p className="text-muted-foreground">
                Access your {loginType} dashboard securely
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email ID</Label>
                <Input
                  id="email"
                  type="email"
                  className="banking-input"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  required
                />
              </div>

              {loginType === 'customer' && (
                <div>
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    type="text"
                    className="banking-input"
                    value={loginForm.accountNumber}
                    onChange={(e) => setLoginForm({...loginForm, accountNumber: e.target.value})}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="banking-input pr-10"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="captcha">CAPTCHA: 5 + 3 = ?</Label>
                <Input
                  id="captcha"
                  type="text"
                  className="banking-input"
                  value={loginForm.captcha}
                  onChange={(e) => setLoginForm({...loginForm, captcha: e.target.value})}
                  placeholder="Enter the answer"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="btn-banking flex-1">
                  Login
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsLoginOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { authSchema } from '@/lib/validators';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast({
        title: 'Chyba validace',
        description: firstError.message,
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);

    const { error } = await signIn(validation.data.email, validation.data.password);
    
    if (error) {
      toast({
        title: 'Chyba přihlášení',
        description: error.message === 'Invalid login credentials' 
          ? 'Neplatné přihlašovací údaje' 
          : error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Úspěch',
        description: 'Úspěšně přihlášeno',
      });
      navigate('/');
    }
    
    setLoading(false);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#00D954' }}
    >
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle 
            className="text-3xl font-black tracking-tight"
            style={{ fontStyle: 'italic', color: '#212121' }}
          >
            ZICHOVEC
          </CardTitle>
          <CardDescription>
            Newsletter Editor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signin-email">Email</Label>
              <Input
                id="signin-email"
                type="email"
                placeholder="vas@email.cz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signin-password">Heslo</Label>
              <Input
                id="signin-password"
                type="password"
                placeholder="Zadejte heslo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              style={{ backgroundColor: '#00D954', color: '#212121' }}
              disabled={loading}
            >
              {loading ? 'Přihlašování...' : 'Přihlásit se'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;

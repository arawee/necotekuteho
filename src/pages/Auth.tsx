import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { authSchema } from '@/lib/validators';

const ZichovecLogo = () => (
  <svg width="200" height="23" viewBox="0 0 1258 143" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1177.26 143C1225.76 143 1255.72 119.372 1257.97 81.8424L1220.08 79.8804C1217.99 98.4351 1203.22 109.394 1177.26 109.394C1149.78 109.394 1133.5 94.9316 1133.5 71.5C1133.5 48.0684 1149.78 33.6058 1177.26 33.6058C1203.03 33.6058 1217.82 44.5368 1220.08 63.1196L1257.97 60.7652C1254.93 23.6558 1225.19 0 1177.26 0C1126.67 0 1095.22 27.7479 1095.22 71.5C1095.22 115.252 1126.67 143 1177.26 143ZM945.709 3.13916V139.889H1081.96V106.283H983.984V87.1397H1071.71V55.2997H983.984V36.745H1081.96V3.13916H945.709ZM937.2 3.13916H894.766L846.269 106.283L796.223 3.13916H752.647L818.406 139.889H872.801L937.2 3.13916ZM674.003 109.394C645.759 109.394 627.573 94.9316 627.573 71.5C627.573 48.0684 645.759 33.6058 674.003 33.6058C702.248 33.6058 720.434 48.0684 720.434 71.5C720.434 94.9316 702.248 109.394 674.003 109.394ZM674.003 143C725.354 143 758.709 115.252 758.709 71.5C758.709 27.7479 725.354 0 674.003 0C622.653 0 589.298 27.7479 589.298 71.5C589.298 115.252 622.653 143 674.003 143ZM411.187 3.13916V139.889H449.462V88.3169H532.075V139.889H570.35V3.13916H532.075V54.7111H449.462V3.13916H411.187ZM311.503 143C359.999 143 389.956 119.372 392.213 81.8424L354.318 79.8804C352.225 98.4351 337.464 109.394 311.503 109.394C284.02 109.394 267.737 94.9316 267.737 71.5C267.737 48.0684 284.02 33.6058 311.503 33.6058C337.274 33.6058 352.062 44.5368 354.318 63.1196L392.213 60.7652C389.168 23.6558 359.429 0 311.503 0C260.913 0 229.461 27.7479 229.461 71.5C229.461 115.252 260.913 143 311.503 143ZM172.239 3.13916V139.889H210.514V3.13916H172.239ZM0 111.16V139.889H155.194V106.283H64.0458L152.53 31.8401V3.13916H1.90289V36.745H89.0552L0 111.16Z" fill="black"/>
  </svg>
);

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
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: '#00C322' }}
    >
      <Card className="w-full max-w-md border-0 shadow-none bg-white">
        <CardHeader className="space-y-4 text-center pb-2">
          <div className="flex justify-center">
            <ZichovecLogo />
          </div>
          <CardDescription className="text-muted-foreground font-mono">
            Newsletter Editor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signin-email" className="font-mono">Email</Label>
              <Input
                id="signin-email"
                type="email"
                placeholder="vas@email.cz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-mono"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signin-password" className="font-mono">Heslo</Label>
              <Input
                id="signin-password"
                type="password"
                placeholder="Zadejte heslo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="font-mono"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full font-mono font-bold"
              style={{ backgroundColor: '#00C322', color: '#000000' }}
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

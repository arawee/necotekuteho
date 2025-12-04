import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { NewsletterBlock } from '@/types/newsletter';
import { newsletterSchema } from '@/lib/validators';

interface Newsletter {
  id: string;
  name: string;
  blocks: NewsletterBlock[];
  created_at: string;
  updated_at: string;
}

export const useNewsletter = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [currentNewsletter, setCurrentNewsletter] = useState<Newsletter | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Load newsletters from database
  const loadNewsletters = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('newsletters')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const formattedNewsletters = (data || []).map((newsletter: any) => ({
        ...newsletter,
        blocks: typeof newsletter.blocks === 'string' ? JSON.parse(newsletter.blocks) : newsletter.blocks
      }));

      setNewsletters(formattedNewsletters);
    } catch (error: any) {
      console.error('Error loading newsletters:', error);
      toast({
        title: "Nepodařilo se načíst newslettery",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Save newsletter to database
  const saveNewsletter = async (name: string, blocks: NewsletterBlock[]): Promise<Newsletter | null> => {
    try {
      // Validate inputs
      const validation = newsletterSchema.safeParse({ name, blocks });
      if (!validation.success) {
        const firstError = validation.error.errors[0];
        toast({
          title: 'Chyba validace',
          description: firstError.message,
          variant: 'destructive',
        });
        return null;
      }
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Musíte být přihlášeni');
      }

      const newsletterData = {
        name: validation.data.name,
        blocks: JSON.stringify(validation.data.blocks),
        user_id: user.id
      };

      const { data, error } = await supabase
        .from('newsletters')
        .insert(newsletterData)
        .select()
        .single();

      if (error) throw error;

      const newNewsletter: Newsletter = {
        ...(data as any),
        blocks: typeof data?.blocks === 'string' ? JSON.parse(data.blocks as string) : data?.blocks
      };

      setNewsletters(prev => [newNewsletter, ...prev]);
      setCurrentNewsletter(newNewsletter);

      toast({
        title: "Newsletter uložen",
        description: `"${name}" byl úspěšně uložen.`,
      });

      return newNewsletter;
    } catch (error: any) {
      console.error('Error saving newsletter:', error);
      toast({
        title: "Nepodařilo se uložit newsletter",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  // Update existing newsletter
  const updateNewsletter = async (id: string, name: string, blocks: NewsletterBlock[]): Promise<Newsletter | null> => {
    try {
      // Validate inputs
      const validation = newsletterSchema.safeParse({ name, blocks });
      if (!validation.success) {
        const firstError = validation.error.errors[0];
        toast({
          title: 'Chyba validace',
          description: firstError.message,
          variant: 'destructive',
        });
        return null;
      }
      
      const { data, error } = await supabase
        .from('newsletters')
        .update({
          name: validation.data.name,
          blocks: JSON.stringify(validation.data.blocks),
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const updatedNewsletter: Newsletter = {
        ...(data as any),
        blocks: typeof data?.blocks === 'string' ? JSON.parse(data.blocks as string) : data?.blocks
      };

      setNewsletters(prev => 
        prev.map(newsletter => 
          newsletter.id === id ? updatedNewsletter : newsletter
        )
      );

      setCurrentNewsletter(updatedNewsletter);

      toast({
        title: "Newsletter aktualizován",
        description: `"${name}" byl úspěšně aktualizován.`,
      });

      return updatedNewsletter;
    } catch (error: any) {
      console.error('Error updating newsletter:', error);
      toast({
        title: "Nepodařilo se aktualizovat newsletter",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  // Delete newsletter
  const deleteNewsletter = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('newsletters')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setNewsletters(prev => prev.filter(newsletter => newsletter.id !== id));
      
      if (currentNewsletter?.id === id) {
        setCurrentNewsletter(null);
      }

      toast({
        title: "Newsletter smazán",
        description: "Newsletter byl úspěšně smazán.",
      });

      return true;
    } catch (error: any) {
      console.error('Error deleting newsletter:', error);
      toast({
        title: "Nepodařilo se smazat newsletter",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  // Load a specific newsletter
  const loadNewsletter = async (id: string): Promise<Newsletter | null> => {
    try {
      const { data, error } = await supabase
        .from('newsletters')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      const newsletter: Newsletter = {
        ...(data as any),
        blocks: typeof data?.blocks === 'string' ? JSON.parse(data.blocks as string) : data?.blocks
      };

      setCurrentNewsletter(newsletter);
      return newsletter;
    } catch (error: any) {
      console.error('Error loading newsletter:', error);
      toast({
        title: "Nepodařilo se načíst newsletter",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  useEffect(() => {
    loadNewsletters();
  }, []);

  return {
    newsletters,
    currentNewsletter,
    loading,
    saveNewsletter,
    updateNewsletter,
    deleteNewsletter,
    loadNewsletter,
    loadNewsletters,
    setCurrentNewsletter
  };
};
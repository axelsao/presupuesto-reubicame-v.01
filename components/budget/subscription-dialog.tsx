'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Mail } from 'lucide-react';

interface SubscriptionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SubscriptionDialog({ isOpen, onOpenChange }: SubscriptionDialogProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    setIsSubmitted(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">
            {isSubmitted ? '¡Gracias por tu interés!' : 'Estamos trabajando en este feature'}
          </DialogTitle>
          <DialogDescription className="text-base">
            {isSubmitted 
              ? 'Te notificaremos cuando el servicio esté disponible.'
              : 'Por favor regístrate para obtener noticias una vez que esté disponible.'}
          </DialogDescription>
        </DialogHeader>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Notificarme
            </Button>
          </form>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground">
              Hemos registrado tu email. Te contactaremos pronto.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
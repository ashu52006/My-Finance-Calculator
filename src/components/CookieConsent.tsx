import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasConsented = localStorage.getItem('cookie_consent');
    if (!hasConsented) {
      // Show consent banner after a short delay
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-300">
      <Card className="max-w-4xl mx-auto shadow-lg border-2">
        <div className="p-6 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleDecline}
            aria-label="Close cookie consent"
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="bg-primary/10 p-3 rounded-lg shrink-0">
              <Cookie className="h-6 w-6 text-primary" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">We use cookies</h3>
              <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                We use cookies to enhance your browsing experience, serve personalized ads or content, 
                and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. 
                Read our{' '}
                <Link to="/policy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>{' '}
                to learn more.
              </p>
            </div>

            <div className="flex gap-3 shrink-0 w-full md:w-auto">
              <Button
                variant="outline"
                onClick={handleDecline}
                className="flex-1 md:flex-none"
              >
                Decline
              </Button>
              <Button
                onClick={handleAccept}
                className="flex-1 md:flex-none bg-gradient-primary"
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieConsent;

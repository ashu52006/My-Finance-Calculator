import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { trackAffiliateClick } from '@/utils/affiliate';
import { AffiliatePlacement } from '@/types/affiliate';

interface AffiliateButtonProps {
  id: string;
  ctaText: string;
  referralLink: string;
  placement: AffiliatePlacement;
  partnerName?: string;
}

const AffiliateButton = ({ id, ctaText, referralLink, placement, partnerName }: AffiliateButtonProps) => {
  const handleClick = () => {
    trackAffiliateClick(id);
    window.open(referralLink, '_blank', 'noopener,noreferrer');
  };

  if (placement === 'primary-button') {
    return (
      <Button
        onClick={handleClick}
        className="w-full gap-2 bg-gradient-to-r from-accent to-success text-white font-semibold shadow-cta hover:shadow-[0_12px_48px_hsl(142_76%_36%_/_0.6)] hover:scale-105 transition-all duration-300 animate-pulse [animation-duration:3s]"
        size="lg"
      >
        {ctaText}
        <ExternalLink className="h-5 w-5 animate-bounce" />
      </Button>
    );
  }

  if (placement === 'secondary-button') {
    return (
      <Button
        onClick={handleClick}
        variant="outline"
        className="w-full gap-2 border-2 border-accent text-accent hover:bg-accent hover:text-white font-semibold hover:scale-105 hover:shadow-cta transition-all duration-300"
        size="lg"
      >
        {ctaText}
        <ExternalLink className="h-5 w-5" />
      </Button>
    );
  }

  if (placement === 'tertiary-card' || placement === 'secondary-card') {
    return (
      <Card className="p-6 bg-gradient-to-br from-card via-card to-accent/10 border-2 border-accent/30 hover:border-accent hover:shadow-[0_8px_40px_hsl(142_76%_36%_/_0.5)] hover:scale-105 transition-all duration-300 cursor-pointer group" onClick={handleClick}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-bold text-base text-accent uppercase tracking-wide">{partnerName}</p>
            <span className="bg-accent/20 text-accent text-xs font-semibold px-2 py-1 rounded-full">Featured</span>
          </div>
          <p className="font-semibold text-lg text-foreground">{ctaText}</p>
          <div className="flex items-center text-accent font-semibold group-hover:gap-3 gap-2 transition-all">
            <span>Learn More</span>
            <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Card>
    );
  }

  if (placement === 'content-link') {
    return (
      <button
        onClick={handleClick}
        className="text-primary hover:underline inline-flex items-center gap-1"
      >
        {ctaText}
        <ExternalLink className="h-3 w-3" />
      </button>
    );
  }

  if (placement === 'banner') {
    return (
      <Card className="p-8 bg-gradient-to-r from-accent via-success to-accent cursor-pointer hover:shadow-[0_12px_64px_hsl(142_76%_36%_/_0.6)] hover:scale-[1.02] transition-all duration-300 border-2 border-accent/50 group relative overflow-hidden" onClick={handleClick}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        <div className="flex items-center justify-between relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">⭐ SPECIAL OFFER</span>
            </div>
            <p className="font-bold text-xl text-white">{partnerName}</p>
            <p className="text-white/95 mt-2 text-lg font-medium">{ctaText}</p>
          </div>
          <div className="bg-white/20 p-4 rounded-full group-hover:rotate-12 transition-transform">
            <ExternalLink className="h-8 w-8 text-white" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      className="gap-2"
    >
      {ctaText}
      <ExternalLink className="h-4 w-4" />
    </Button>
  );
};

export default AffiliateButton;

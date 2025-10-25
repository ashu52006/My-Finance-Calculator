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
        className="w-full gap-2 bg-gradient-primary hover:opacity-90 transition-opacity"
        size="lg"
      >
        {ctaText}
        <ExternalLink className="h-4 w-4" />
      </Button>
    );
  }

  if (placement === 'secondary-button') {
    return (
      <Button
        onClick={handleClick}
        variant="outline"
        className="w-full gap-2 border-primary/50 hover:bg-primary/10"
        size="lg"
      >
        {ctaText}
        <ExternalLink className="h-4 w-4" />
      </Button>
    );
  }

  if (placement === 'tertiary-card' || placement === 'secondary-card') {
    return (
      <Card className="p-4 bg-gradient-card hover:shadow-glow transition-all cursor-pointer" onClick={handleClick}>
        <div className="space-y-2">
          <p className="font-semibold text-sm text-muted-foreground">{partnerName}</p>
          <p className="font-medium">{ctaText}</p>
          <div className="flex items-center text-primary text-sm">
            <span>Learn More</span>
            <ExternalLink className="h-3 w-3 ml-1" />
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
      <Card className="p-6 bg-gradient-primary cursor-pointer hover:opacity-90 transition-opacity" onClick={handleClick}>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-primary-foreground">{partnerName}</p>
            <p className="text-primary-foreground/90 mt-1">{ctaText}</p>
          </div>
          <ExternalLink className="h-6 w-6 text-primary-foreground" />
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

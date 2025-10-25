import { Card } from '@/components/ui/card';

interface AdSenseSlotProps {
  slot: 'header' | 'sidebar' | 'footer' | 'inline';
  className?: string;
}

const AdSenseSlot = ({ slot, className = '' }: AdSenseSlotProps) => {
  // Placeholder for AdSense - will be replaced with actual AdSense code later
  const heights = {
    header: 'h-24',
    sidebar: 'h-96',
    footer: 'h-32',
    inline: 'h-48'
  };

  return (
    <Card className={`${heights[slot]} ${className} bg-muted/50 border-dashed flex items-center justify-center`}>
      <p className="text-muted-foreground text-sm">AdSense Slot - {slot.toUpperCase()}</p>
    </Card>
  );
};

export default AdSenseSlot;

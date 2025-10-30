import { useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface AdSenseSlotProps {
  slot: 'header' | 'sidebar' | 'footer' | 'inline';
  className?: string;
}

const AdSenseSlot = ({ slot, className = '' }: AdSenseSlotProps) => {
  const heights = {
    header: 'h-24',
    sidebar: 'h-96',
    footer: 'h-32',
    inline: 'h-48',
  };

  useEffect(() => {
    // Load AdSense script dynamically if not already loaded
    if (!document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src =
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4018627787030136';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    // Defer ad initialization to next frame to prevent forced reflow
    const timeoutId = setTimeout(() => {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Card
      className={`${heights[slot]} ${className} bg-muted/50 border-dashed flex items-center justify-center`}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client="ca-pub-4018627787030136"
        data-ad-slot="8128554457"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </Card>
  );
};

export default AdSenseSlot;

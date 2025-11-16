import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

interface AdSenseSlotProps {
  slot: 'header' | 'sidebar' | 'footer' | 'inline';
  className?: string;
  adSlot?: string;
}

const AdSenseSlot = ({ slot, className = '' }: AdSenseSlotProps) => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  const heights = {
    header: 'h-24',
    sidebar: 'h-96',
    footer: 'h-32',
    inline: 'h-48',
  };

  useEffect(() => {
    // Load Adsterra script dynamically
    const scriptId = 'adsterra-invoke-script';
    
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'text/javascript';
      script.src = '//www.highperformanceformat.com/f9fc60fed9d81020328f7605ecf0ed88/invoke.js';
      script.async = true;
      
      if (adContainerRef.current) {
        adContainerRef.current.appendChild(script);
      }
    }
  }, []);

  return (
    <Card
      className={`${heights[slot]} ${className} bg-muted/50 border-dashed flex items-center justify-center`}
    >
      <div ref={adContainerRef}>
        <script type="text/javascript">
          {`
            atOptions = {
              'key' : 'f9fc60fed9d81020328f7605ecf0ed88',
              'format' : 'iframe',
              'height' : 250,
              'width' : 300,
              'params' : {}
            };
          `}
        </script>
      </div>
    </Card>
  );
};

export default AdSenseSlot;

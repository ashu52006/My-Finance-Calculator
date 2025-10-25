import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Crown } from 'lucide-react';
import { isPremiumUser } from '@/utils/subscription';

interface PremiumGateProps {
  children?: ReactNode;
  feature?: string;
}

const PremiumGate = ({ children, feature = 'This feature' }: PremiumGateProps) => {
  const isPremium = isPremiumUser();

  if (isPremium && children) {
    return <>{children}</>;
  }

  return (
    <Card className="p-8 bg-gradient-card text-center space-y-4">
      <div className="flex justify-center">
        <div className="p-4 bg-primary/10 rounded-full">
          <Lock className="h-12 w-12 text-primary" />
        </div>
      </div>
      <h3 className="text-xl font-semibold">{feature} is Premium Only</h3>
      <p className="text-muted-foreground">
        Upgrade to a premium plan to unlock advanced features, detailed charts, and comprehensive reports.
      </p>
      <Link to="/subscription">
        <Button className="gap-2 bg-gradient-primary">
          <Crown className="h-4 w-4" />
          Upgrade to Premium
        </Button>
      </Link>
    </Card>
  );
};

export default PremiumGate;

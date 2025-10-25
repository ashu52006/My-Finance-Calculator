import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Crown, Sparkles } from 'lucide-react';
import { SUBSCRIPTION_TIERS } from '@/types/subscription';
import { getUserSubscription, activateSubscription } from '@/utils/subscription';
import { toast } from 'sonner';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Subscription = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const currentSubscription = getUserSubscription();

  const handleSubscribe = async (planId: string, price: number, duration: string) => {
    setLoading(planId);
    
    // Parse duration to get months
    const months = duration.includes('1 Month') ? 1 : 
                   duration.includes('3 Month') ? 3 : 
                   duration.includes('6 Month') ? 6 : 12;

    // ============================================
    // 🔧 RAZORPAY CONFIGURATION SLOT - START
    // ============================================
    // TODO: Replace with your Razorpay Key ID
    const RAZORPAY_KEY_ID = 'rzp_test_RXQ64OLeXMTt1B';
    
    // TODO: In production, call your backend API to create Razorpay order
    // const orderResponse = await fetch('/api/create-razorpay-order', {
    //   method: 'POST',
    //   body: JSON.stringify({ amount: price * 100, planId, months })
    // });
    // const orderData = await orderResponse.json();

    // Razorpay Checkout Options
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: price * 100, // Amount in paise (₹1 = 100 paise)
      currency: 'INR',
      name: 'My Finance Calculator',
      description: `${planId.toUpperCase()} Plan - ${duration}`,
      // order_id: orderData.orderId, // Use order ID from backend
      handler: function (response: any) {
        // Payment successful
        console.log('Payment Success:', response);
        // TODO: Verify payment on backend
        // Then activate subscription
        activateSubscription(planId as any, months);
        toast.success('Subscription activated successfully!');
        setLoading(null);
        window.location.reload();
      },
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      theme: {
        color: '#3b82f6'
      },
      modal: {
        ondismiss: function() {
          setLoading(null);
          toast.error('Payment cancelled');
        }
      }
    };

    // For demo purposes (remove this in production)
    if (RAZORPAY_KEY_ID === 'YOUR_RAZORPAY_KEY_ID_HERE') {
      toast.info('Demo mode: Subscription activated without payment');
      setTimeout(() => {
        activateSubscription(planId as any, months);
        toast.success('Subscription activated successfully!');
        setLoading(null);
        window.location.reload();
      }, 1500);
      return;
    }

    // Initialize Razorpay
    const razorpay = new window.Razorpay(options);
    razorpay.open();
    // ============================================
    // 🔧 RAZORPAY CONFIGURATION SLOT - END
    // ============================================
  };

  const isCurrentPlan = (planId: string) => {
    return currentSubscription.plan === planId && currentSubscription.isActive;
  };

  return (
    <Layout>
      <Helmet>
        <title>Premium Plans - My Finance Calculator</title>
        <meta name="description" content="Upgrade to premium for advanced features, charts, PDF reports, and priority support. Choose from flexible subscription plans." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="bg-gradient-primary p-4 rounded-2xl inline-block mb-4">
            <Crown className="h-12 w-12 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Unlock premium features including ad-free experience, advanced charts, downloadable reports, and priority support
          </p>
        </div>

        {currentSubscription.isActive && (
          <Card className="max-w-2xl mx-auto p-6 bg-gradient-success mb-8">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-white" />
              <div>
                <h3 className="font-semibold text-white">Current Plan: {currentSubscription.plan.toUpperCase()}</h3>
                <p className="text-white/90 text-sm">
                  Active until {currentSubscription.expiryDate ? new Date(currentSubscription.expiryDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {SUBSCRIPTION_TIERS.map((tier) => (
            <Card 
              key={tier.id}
              className={`p-6 relative ${tier.recommended ? 'border-primary border-2 shadow-glow' : 'bg-gradient-card'}`}
            >
              {tier.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary px-4 py-1 rounded-full text-sm font-semibold">
                  Recommended
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold">₹{tier.price}</span>
                </div>
                <p className="text-muted-foreground text-sm">{tier.duration}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleSubscribe(tier.id, tier.price, tier.duration)}
                disabled={loading === tier.id || isCurrentPlan(tier.id)}
                className={`w-full ${tier.recommended ? 'bg-gradient-primary' : ''}`}
              >
                {loading === tier.id ? 'Processing...' : 
                 isCurrentPlan(tier.id) ? 'Current Plan' : 
                 'Subscribe Now'}
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-card">
            <h2 className="text-2xl font-bold mb-6 text-center">Premium Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Check className="h-5 w-5 text-success" />
                  Ad-Free Experience
                </h3>
                <p className="text-sm text-muted-foreground">
                  Enjoy uninterrupted calculations without any advertisements
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Check className="h-5 w-5 text-success" />
                  Visual Charts
                </h3>
                <p className="text-sm text-muted-foreground">
                  Interactive charts and graphs to visualize your financial data
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Check className="h-5 w-5 text-success" />
                  PDF Reports
                </h3>
                <p className="text-sm text-muted-foreground">
                  Download detailed calculation reports as PDF documents
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Check className="h-5 w-5 text-success" />
                  Priority Support
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get faster response times with dedicated support
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Secure payments powered by Razorpay</p>
          <p className="mt-2">All calculators are free to use. Premium unlocks additional features only.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Subscription;

export type SubscriptionPlan = 'free' | 'basic' | 'standard' | 'premium' | 'ultimate';

export interface SubscriptionTier {
  id: SubscriptionPlan;
  name: string;
  price: number;
  duration: string;
  features: string[];
  recommended?: boolean;
}

export interface UserSubscription {
  plan: SubscriptionPlan;
  expiryDate: string | null;
  isActive: boolean;
}

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 199,
    duration: '1 Month',
    features: [
      'Ad-free experience',
      'Basic charts & visualizations',
      'Email support',
      'All calculators access'
    ]
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 499,
    duration: '3 Months',
    features: [
      'Everything in Basic',
      'Advanced charts',
      'Downloadable PDF reports',
      'Priority email support',
      'Investment recommendations'
    ],
    recommended: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 999,
    duration: '6 Months',
    features: [
      'Everything in Standard',
      'Detailed analytics dashboard',
      'Custom calculations',
      'Priority support (24/7)',
      'Exclusive financial insights'
    ]
  },
  {
    id: 'ultimate',
    name: 'Ultimate',
    price: 1799,
    duration: '12 Months',
    features: [
      'Everything in Premium',
      'Personal finance consultation',
      'Tax planning guidance',
      'Portfolio analysis',
      'Lifetime updates',
      'VIP support'
    ]
  }
];

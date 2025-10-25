import { UserSubscription, SubscriptionPlan } from '@/types/subscription';

const STORAGE_KEY = 'user_subscription';

export const getUserSubscription = (): UserSubscription => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    plan: 'free',
    expiryDate: null,
    isActive: false
  };
};

export const setUserSubscription = (subscription: UserSubscription): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(subscription));
};

export const activateSubscription = (plan: SubscriptionPlan, months: number): void => {
  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + months);
  
  const subscription: UserSubscription = {
    plan,
    expiryDate: expiryDate.toISOString(),
    isActive: true
  };
  
  setUserSubscription(subscription);
};

export const isPremiumUser = (): boolean => {
  const subscription = getUserSubscription();
  if (!subscription.isActive || !subscription.expiryDate) {
    return false;
  }
  
  const now = new Date();
  const expiry = new Date(subscription.expiryDate);
  return now < expiry;
};

export const clearSubscription = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

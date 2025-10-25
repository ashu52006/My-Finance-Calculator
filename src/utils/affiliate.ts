import { AffiliateLink, DEFAULT_AFFILIATE_LINKS } from '@/types/affiliate';

const STORAGE_KEY = 'affiliate_links';
const CLICKS_KEY = 'affiliate_clicks';

export const getAffiliateLinks = (): AffiliateLink[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_AFFILIATE_LINKS));
  return DEFAULT_AFFILIATE_LINKS;
};

export const saveAffiliateLinks = (links: AffiliateLink[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
};

export const trackAffiliateClick = (linkId: string): void => {
  const clicks = getAffiliateClicks();
  clicks[linkId] = (clicks[linkId] || 0) + 1;
  localStorage.setItem(CLICKS_KEY, JSON.stringify(clicks));
};

export const getAffiliateClicks = (): Record<string, number> => {
  const stored = localStorage.getItem(CLICKS_KEY);
  return stored ? JSON.parse(stored) : {};
};

export const getTotalClicks = (): number => {
  const clicks = getAffiliateClicks();
  return Object.values(clicks).reduce((sum, count) => sum + count, 0);
};

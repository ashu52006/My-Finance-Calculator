export type AffiliatePlacement = 
  | 'primary-button'
  | 'secondary-button'
  | 'tertiary-card'
  | 'secondary-card'
  | 'content-link'
  | 'banner'
  | 'sidebar'
  | 'footer';

export type CalculatorPage = 'emi' | 'sip' | 'fd' | 'rd' | 'general';

export interface AffiliateLink {
  id: string;
  calculatorPage: CalculatorPage;
  partnerName: string;
  ctaText: string;
  placement: AffiliatePlacement;
  referralLink: string;
  status: 'active' | 'inactive';
  priority: number;
}

export const DEFAULT_AFFILIATE_LINKS: AffiliateLink[] = [
  // EMI Calculator Links
  {
    id: '1',
    calculatorPage: 'emi',
    partnerName: 'Kotak Bank (Credit Card)',
    ctaText: 'Compare Top Loan Rates Now',
    placement: 'primary-button',
    referralLink: 'https://mdeal.in/c_XGUC5jXY',
    status: 'active',
    priority: 1
  },
  {
    id: '2',
    calculatorPage: 'emi',
    partnerName: 'SBI Card (Credit Card)',
    ctaText: 'Get Exclusive Credit Card Offers',
    placement: 'secondary-button',
    referralLink: 'https://mdeal.in/c_di5Rm6Qm',
    status: 'active',
    priority: 2
  },
  {
    id: '3',
    calculatorPage: 'emi',
    partnerName: 'IndusInd Bank (Credit Card)',
    ctaText: 'Check Instant Loan Eligibility',
    placement: 'tertiary-card',
    referralLink: 'https://mdeal.in/c_vYTSNxU3',
    status: 'active',
    priority: 3
  },
  {
    id: '4',
    calculatorPage: 'emi',
    partnerName: 'HDFC Bank (Credit Card)',
    ctaText: 'Apply for HDFC Bank Credit Card',
    placement: 'secondary-card',
    referralLink: 'https://mdeal.in/c_USvdoY78',
    status: 'active',
    priority: 4
  },
  // SIP/RD/FD Links
  {
    id: '5',
    calculatorPage: 'sip',
    partnerName: 'Stable Money',
    ctaText: 'Open High-Interest FD A/C Now',
    placement: 'primary-button',
    referralLink: 'https://mdeal.in/c_NM2IBuOv',
    status: 'active',
    priority: 1
  },
  {
    id: '6',
    calculatorPage: 'fd',
    partnerName: 'Stable Money',
    ctaText: 'Open High-Interest FD A/C Now',
    placement: 'primary-button',
    referralLink: 'https://mdeal.in/c_NM2IBuOv',
    status: 'active',
    priority: 1
  },
  {
    id: '7',
    calculatorPage: 'rd',
    partnerName: 'Stable Money',
    ctaText: 'Open High-Interest FD A/C Now',
    placement: 'primary-button',
    referralLink: 'https://mdeal.in/c_NM2IBuOv',
    status: 'active',
    priority: 1
  },
  // General Links
  {
    id: '8',
    calculatorPage: 'general',
    partnerName: 'Kotak (General Bank)',
    ctaText: 'Explore Kotak Bank Savings Offers',
    placement: 'content-link',
    referralLink: 'https://mdeal.in/c_kgQeKTGV',
    status: 'active',
    priority: 5
  },
  {
    id: '9',
    calculatorPage: 'general',
    partnerName: 'Swiggy HDFC Bank',
    ctaText: 'Get Cashback on Food Delivery Card',
    placement: 'banner',
    referralLink: 'https://mdeal.in/c_DlRs6zXy',
    status: 'active',
    priority: 6
  },
  {
    id: '10',
    calculatorPage: 'general',
    partnerName: 'Airtel Broadband',
    ctaText: 'Check Best Broadband Plans',
    placement: 'sidebar',
    referralLink: 'https://mdeal.in/c_G1aJtvQG',
    status: 'active',
    priority: 7
  },
  // Footer Links
  {
    id: '11',
    calculatorPage: 'general',
    partnerName: 'Flipkart',
    ctaText: 'Shop Electronics on EMI via Flipkart',
    placement: 'footer',
    referralLink: 'https://mdeal.in/c_ZXBeRsyD',
    status: 'active',
    priority: 8
  },
  {
    id: '12',
    calculatorPage: 'general',
    partnerName: 'Acer',
    ctaText: 'Buy Acer Laptops on EMI',
    placement: 'footer',
    referralLink: 'https://mdeal.in/c_MUkksm5h',
    status: 'active',
    priority: 9
  },
  {
    id: '13',
    calculatorPage: 'general',
    partnerName: 'Dell',
    ctaText: 'Latest Dell Offers for Students',
    placement: 'footer',
    referralLink: 'https://mdeal.in/c_XhfEI1LK',
    status: 'active',
    priority: 10
  }
];

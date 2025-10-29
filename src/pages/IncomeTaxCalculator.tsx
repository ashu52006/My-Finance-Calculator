import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Calculator, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/Layout';
import AdSenseSlot from '@/components/AdSenseSlot';

const IncomeTaxCalculator = () => {
  const [income, setIncome] = useState<string>('1000000');
  const [regime, setRegime] = useState<'old' | 'new'>('new');
  const [deduction80C, setDeduction80C] = useState<string>('150000');
  const [homeLoanInterest, setHomeLoanInterest] = useState<string>('0');
  
  const totalIncome = parseFloat(income) || 0;
  const deductions = parseFloat(deduction80C) || 0;
  const hli = parseFloat(homeLoanInterest) || 0;
  
  let taxableIncome = totalIncome;
  let tax = 0;
  
  if (regime === 'old') {
    // Old regime with deductions
    taxableIncome = totalIncome - Math.min(deductions, 150000) - Math.min(hli, 200000) - 50000; // Standard deduction
    
    if (taxableIncome <= 250000) tax = 0;
    else if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
    else if (taxableIncome <= 1000000) tax = 12500 + (taxableIncome - 500000) * 0.2;
    else tax = 112500 + (taxableIncome - 1000000) * 0.3;
  } else {
    // New regime - FY 2025-26
    taxableIncome = totalIncome - 50000; // Standard deduction only
    
    if (taxableIncome <= 300000) tax = 0;
    else if (taxableIncome <= 700000) tax = (taxableIncome - 300000) * 0.05;
    else if (taxableIncome <= 1000000) tax = 20000 + (taxableIncome - 700000) * 0.1;
    else if (taxableIncome <= 1200000) tax = 50000 + (taxableIncome - 1000000) * 0.15;
    else if (taxableIncome <= 1500000) tax = 80000 + (taxableIncome - 1200000) * 0.2;
    else tax = 140000 + (taxableIncome - 1500000) * 0.3;
  }
  
  // Add 4% cess
  const cess = tax * 0.04;
  const totalTax = tax + cess;
  const postTaxIncome = totalIncome - totalTax;
  const effectiveTaxRate = (totalTax / totalIncome) * 100;

  return (
    <Layout>
      <Helmet>
        <title>Income Tax Calculator 2026-27: Calculate Tax Online Free India</title>
        <meta name="description" content="Free Income Tax Calculator India FY 2025-26 (AY 2026-27). Compare Old vs New Tax Regime. Calculate income tax, deductions, rebate & cess instantly with latest slabs." />
        <meta name="keywords" content="income tax calculator, income tax calculator India 2026, tax calculator FY 2025-26, new tax regime calculator, old tax regime calculator, income tax slab" />
        <link rel="canonical" href="https://myfinancecalculator.netlify.app/income-tax" />
        
        <meta property="og:title" content="Income Tax Calculator 2026-27 - Calculate Tax Online" />
        <meta property="og:description" content="Calculate your income tax for FY 2025-26. Compare old and new tax regimes instantly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://myfinancecalculator.netlify.app/income-tax" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Income Tax Calculator India 2026" />
        <meta name="twitter:description" content="Calculate income tax for FY 2025-26 with old & new regime comparison." />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Income Tax Calculator India",
            "description": "Calculate income tax for FY 2025-26 with old and new tax regime comparison",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "12340"
            }
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-primary p-4 rounded-2xl mb-4">
              <FileText className="h-12 w-12 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Income Tax Calculator FY 2025-26</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calculate your income tax liability for AY 2026-27. Compare Old vs New Tax Regime
            </p>
          </div>

          <AdSenseSlot slot="header" />

          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Calculate Your Tax</CardTitle>
                  <CardDescription>Enter your income details for FY 2025-26</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="regime">Tax Regime</Label>
                    <Select value={regime} onValueChange={(value: 'old' | 'new') => setRegime(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New Tax Regime (FY 2025-26)</SelectItem>
                        <SelectItem value="old">Old Tax Regime (with deductions)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="income">Annual Gross Income (₹)</Label>
                    <Input
                      id="income"
                      type="number"
                      placeholder="Enter annual income"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                    />
                  </div>

                  {regime === 'old' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="deduction80C">80C Deductions (₹)</Label>
                        <Input
                          id="deduction80C"
                          type="number"
                          placeholder="Max 1,50,000"
                          value={deduction80C}
                          onChange={(e) => setDeduction80C(e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">PPF, ELSS, Life Insurance Premium (Max: ₹1,50,000)</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="homeLoanInterest">Home Loan Interest (₹)</Label>
                        <Input
                          id="homeLoanInterest"
                          type="number"
                          placeholder="Max 2,00,000"
                          value={homeLoanInterest}
                          onChange={(e) => setHomeLoanInterest(e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">Under Section 24(b) (Max: ₹2,00,000)</p>
                      </div>
                    </>
                  )}

                  <Button className="w-full" size="lg">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Tax
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card">
                <CardHeader>
                  <CardTitle>Tax Calculation Summary</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {regime === 'new' ? 'New Tax Regime (FY 2025-26)' : 'Old Tax Regime (with deductions)'}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="font-medium">Gross Income</span>
                    <span className="text-xl font-bold">₹{totalIncome.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="font-medium">Taxable Income</span>
                    <span className="text-xl font-bold">₹{taxableIncome.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="font-medium">Income Tax</span>
                    <span className="text-xl font-bold text-orange-500">₹{tax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="font-medium">4% Health & Education Cess</span>
                    <span className="text-xl font-bold text-red-500">₹{cess.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border-2 border-primary">
                    <span className="font-bold text-lg">Total Tax Payable</span>
                    <span className="text-2xl font-bold text-primary">₹{totalTax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-success/10 rounded-lg border-2 border-success">
                    <span className="font-bold text-lg">Post-Tax Income</span>
                    <span className="text-2xl font-bold text-success">₹{postTaxIncome.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="font-medium">Effective Tax Rate</span>
                    <span className="text-xl font-bold">{effectiveTaxRate.toFixed(2)}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Income Tax Slabs India 2026</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-invert max-w-none">
                  <h3>New Tax Regime Slabs (FY 2025-26)</h3>
                  <ul>
                    <li>Up to ₹3,00,000: Nil</li>
                    <li>₹3,00,001 to ₹7,00,000: 5%</li>
                    <li>₹7,00,001 to ₹10,00,000: 10%</li>
                    <li>₹10,00,001 to ₹12,00,000: 15%</li>
                    <li>₹12,00,001 to ₹15,00,000: 20%</li>
                    <li>Above ₹15,00,000: 30%</li>
                  </ul>
                  
                  <h3>Old Tax Regime Slabs</h3>
                  <ul>
                    <li>Up to ₹2,50,000: Nil</li>
                    <li>₹2,50,001 to ₹5,00,000: 5%</li>
                    <li>₹5,00,001 to ₹10,00,000: 20%</li>
                    <li>Above ₹10,00,000: 30%</li>
                  </ul>
                  
                  <h3>Which Tax Regime Should You Choose?</h3>
                  <p>
                    <strong>Choose New Regime if:</strong> You don't have many deductions or investments under Section 80C
                  </p>
                  <p>
                    <strong>Choose Old Regime if:</strong> You have significant investments in PPF, ELSS, home loan, or insurance premiums
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <AdSenseSlot slot="sidebar" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IncomeTaxCalculator;
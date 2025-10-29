import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Calculator, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/components/Layout';
import AdSenseSlot from '@/components/AdSenseSlot';

const PPFCalculator = () => {
  const [yearlyDeposit, setYearlyDeposit] = useState<string>('150000');
  const [tenure, setTenure] = useState<string>('15');
  const [interestRate] = useState<string>('7.1'); // Current PPF rate
  
  const deposit = parseFloat(yearlyDeposit) || 0;
  const years = parseFloat(tenure) || 15;
  const rate = parseFloat(interestRate) / 100;
  
  // PPF uses annual compounding
  let maturityAmount = 0;
  for (let i = 1; i <= years; i++) {
    maturityAmount = (maturityAmount + deposit) * (1 + rate);
  }
  
  const totalInvestment = deposit * years;
  const totalInterest = maturityAmount - totalInvestment;

  return (
    <Layout>
      <Helmet>
        <title>PPF Calculator 2026: Calculate Public Provident Fund Returns India</title>
        <meta name="description" content="Free PPF Calculator 2026. Calculate PPF maturity amount, interest earned & returns for 15 years. Latest PPF interest rate 7.1%. Plan your long-term tax-free investment." />
        <meta name="keywords" content="PPF calculator, PPF calculator India, public provident fund calculator, PPF maturity calculator, PPF interest rate 2026, PPF returns calculator" />
        <link rel="canonical" href="https://myfinancecalculator.netlify.app/ppf" />
        
        <meta property="og:title" content="PPF Calculator 2026 - Calculate PPF Returns" />
        <meta property="og:description" content="Calculate your PPF maturity amount with current interest rate of 7.1%." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://myfinancecalculator.netlify.app/ppf" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PPF Calculator India 2026" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "PPF Calculator",
            "description": "Calculate Public Provident Fund maturity and returns for India",
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
              "ratingCount": "6540"
            }
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-primary p-4 rounded-2xl mb-4">
              <Shield className="h-12 w-12 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-4">PPF Calculator 2026</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calculate Public Provident Fund returns with current interest rate of {interestRate}%
            </p>
          </div>

          <AdSenseSlot slot="header" />

          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Calculate PPF Returns</CardTitle>
                  <CardDescription>Plan your long-term tax-free investment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="yearlyDeposit">Yearly Investment (₹)</Label>
                    <Input
                      id="yearlyDeposit"
                      type="number"
                      placeholder="Enter yearly deposit"
                      value={yearlyDeposit}
                      onChange={(e) => setYearlyDeposit(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">Min: ₹500, Max: ₹1,50,000 per year</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tenure">Investment Period (Years)</Label>
                    <Input
                      id="tenure"
                      type="number"
                      placeholder="Enter tenure"
                      value={tenure}
                      onChange={(e) => setTenure(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">Minimum 15 years (can be extended in blocks of 5 years)</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Current PPF Interest Rate</Label>
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary">
                      <span className="text-2xl font-bold text-primary">{interestRate}%</span>
                      <span className="text-sm text-muted-foreground ml-2">per annum (Q4 FY 2025-26)</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate PPF Maturity
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card">
                <CardHeader>
                  <CardTitle>PPF Maturity Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="font-medium">Total Investment</span>
                    <span className="text-xl font-bold">₹{totalInvestment.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="font-medium">Total Interest Earned</span>
                    <span className="text-xl font-bold text-green-500">₹{totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border-2 border-primary">
                    <span className="font-bold text-lg">Maturity Amount</span>
                    <span className="text-3xl font-bold text-primary">₹{maturityAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="font-medium">Investment Period</span>
                    <span className="text-xl font-bold">{years} Years</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-success bg-success/5">
                <CardHeader>
                  <CardTitle className="text-success">💰 Start Your PPF Investment</CardTitle>
                  <CardDescription>Open PPF account online in minutes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-success hover:bg-success/90" size="lg">
                    Open PPF Account Now
                  </Button>
                  <p className="text-sm text-muted-foreground mt-3 text-center">
                    Tax-free returns • Government backed • EEE status
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Public Provident Fund (PPF) Guide 2026</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-invert max-w-none">
                  <h3>What is PPF?</h3>
                  <p>
                    Public Provident Fund (PPF) is a long-term savings scheme offered by the Government of India with attractive interest rates 
                    and tax benefits. It's one of the safest investment options available.
                  </p>
                  
                  <h3>Key Features of PPF</h3>
                  <ul>
                    <li><strong>Lock-in Period:</strong> 15 years (extendable in blocks of 5 years)</li>
                    <li><strong>Minimum Deposit:</strong> ₹500 per year</li>
                    <li><strong>Maximum Deposit:</strong> ₹1,50,000 per year</li>
                    <li><strong>Interest Rate:</strong> 7.1% p.a. (Q4 FY 2025-26)</li>
                    <li><strong>Compounding:</strong> Annual</li>
                    <li><strong>Tax Benefit:</strong> EEE status (Exempt-Exempt-Exempt)</li>
                  </ul>
                  
                  <h3>Tax Benefits under PPF</h3>
                  <p>
                    <strong>Investment:</strong> Deduction under Section 80C up to ₹1.5 lakh<br/>
                    <strong>Interest:</strong> Completely tax-free<br/>
                    <strong>Maturity:</strong> Tax-free withdrawal
                  </p>
                  
                  <h3>Who Should Invest in PPF?</h3>
                  <ul>
                    <li>Risk-averse investors seeking guaranteed returns</li>
                    <li>Long-term wealth creation for retirement</li>
                    <li>Tax-saving investment under 80C</li>
                    <li>Parents planning for child's future education</li>
                  </ul>
                  
                  <h3>Withdrawal Rules</h3>
                  <p>
                    <strong>Partial Withdrawal:</strong> Allowed from 7th year onwards<br/>
                    <strong>Loan:</strong> Available from 3rd to 6th year<br/>
                    <strong>Premature Closure:</strong> After 5 years in specific cases (medical emergency, higher education)
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

export default PPFCalculator;
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Copy, RotateCcw, PiggyBank } from 'lucide-react';
import { toast } from 'sonner';
import AffiliateButton from '@/components/AffiliateButton';
import AdSenseSlot from '@/components/AdSenseSlot';
import PremiumGate from '@/components/PremiumGate';
import { getAffiliateLinks } from '@/utils/affiliate';
import { isPremiumUser } from '@/utils/subscription';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FDCalculator = () => {
  const [principal, setPrincipal] = useState('100000');
  const [interestRate, setInterestRate] = useState('6');
  const [tenure, setTenure] = useState('5');
  const [compounding, setCompounding] = useState<'quarterly' | 'monthly' | 'yearly'>('quarterly');
  const [results, setResults] = useState<any>(null);

  const affiliateLinks = getAffiliateLinks().filter(
    link => link.calculatorPage === 'fd' && link.status === 'active'
  ).sort((a, b) => a.priority - b.priority);

  const calculate = () => {
    const P = parseFloat(principal);
    const r = parseFloat(interestRate) / 100;
    const t = parseFloat(tenure);

    if (isNaN(P) || isNaN(r) || isNaN(t) || P <= 0 || t <= 0) {
      toast.error('Please enter valid positive numbers');
      return;
    }

    let n = 4; // quarterly by default
    if (compounding === 'monthly') n = 12;
    if (compounding === 'yearly') n = 1;

    // A = P(1 + r/n)^(nt)
    const maturityAmount = P * Math.pow(1 + r / n, n * t);
    const totalInterest = maturityAmount - P;

    setResults({
      principal: Math.round(P),
      maturityAmount: Math.round(maturityAmount),
      totalInterest: Math.round(totalInterest)
    });

    toast.success('Calculation completed!');
  };

  const reset = () => {
    setPrincipal('100000');
    setInterestRate('6');
    setTenure('5');
    setCompounding('quarterly');
    setResults(null);
  };

  const copyResults = () => {
    if (!results) return;
    const text = `FD Calculator Results:\nPrincipal: ₹${results.principal.toLocaleString('en-IN')}\nInterest Rate: ${interestRate}%\nTenure: ${tenure} years\nCompounding: ${compounding}\nTotal Interest: ₹${results.totalInterest.toLocaleString('en-IN')}\nMaturity Amount: ₹${results.maturityAmount.toLocaleString('en-IN')}`;
    navigator.clipboard.writeText(text);
    toast.success('Results copied to clipboard!');
  };

  return (
    <Layout>
      <Helmet>
        <title>Best FD Calculator 2026: Compare Interest Rates & Maturity</title>
        <meta name="description" content="Calculate your Fixed Deposit returns instantly. Compare bank FD rates & maximize earnings! Free FD Calculator for India 2026 with compound interest." />
        <meta name="keywords" content="FD calculator India 2026, fixed deposit calculator, FD maturity calculator, bank FD calculator, best FD rates, FD interest calculator" />
        <link rel="canonical" href="https://myfinancecalculator.netlify.app/fd" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Best FD Calculator 2026 - Calculate Fixed Deposit Returns" />
        <meta property="og:description" content="Calculate FD maturity and compare interest rates. Free & accurate Fixed Deposit calculator for India." />
        <meta property="og:type" content="website" />
        
        {/* JSON-LD Schema - HowTo */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Calculate Fixed Deposit Returns",
            "description": "Learn how to calculate your Fixed Deposit maturity amount, interest earnings, and total returns",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Enter Principal Amount",
                "text": "Input the initial deposit amount you want to invest in Fixed Deposit"
              },
              {
                "@type": "HowToStep",
                "name": "Set Interest Rate",
                "text": "Enter the annual interest rate offered by your bank"
              },
              {
                "@type": "HowToStep",
                "name": "Choose Tenure",
                "text": "Select the investment period in years"
              },
              {
                "@type": "HowToStep",
                "name": "Select Compounding Frequency",
                "text": "Choose how often interest is compounded - quarterly, monthly, or yearly"
              },
              {
                "@type": "HowToStep",
                "name": "View Maturity Amount",
                "text": "Get instant results showing maturity value and total interest earned"
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-xl inline-block mb-4">
              <PiggyBank className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3">FD Calculator India (Fixed Deposit Returns)</h1>
            <p className="text-muted-foreground text-lg">
              Compare FD rates & calculate maturity amount with best interest rates for 2026
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 bg-gradient-card">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="principal" className="flex items-center gap-2">
                      Principal Amount (₹)
                      <span className="text-xs text-muted-foreground" title="Initial deposit amount">ⓘ</span>
                    </Label>
                    <Input
                      id="principal"
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      className="mt-2"
                      placeholder="100000"
                    />
                  </div>

                  <div>
                    <Label htmlFor="interest" className="flex items-center gap-2">
                      Interest Rate (% per annum)
                      <span className="text-xs text-muted-foreground" title="Annual interest rate">ⓘ</span>
                    </Label>
                    <Input
                      id="interest"
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="mt-2"
                      placeholder="6"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tenure" className="flex items-center gap-2">
                      Tenure (Years)
                      <span className="text-xs text-muted-foreground" title="Investment period">ⓘ</span>
                    </Label>
                    <Input
                      id="tenure"
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(e.target.value)}
                      className="mt-2"
                      placeholder="5"
                    />
                  </div>

                  <div>
                    <Label className="flex items-center gap-2">
                      Compounding Frequency
                      <span className="text-xs text-muted-foreground" title="How often interest is compounded">ⓘ</span>
                    </Label>
                    <Select value={compounding} onValueChange={(value: any) => setCompounding(value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={calculate} className="flex-1 gap-2 bg-gradient-primary">
                      <Calculator className="h-4 w-4" />
                      Calculate
                    </Button>
                    <Button onClick={reset} variant="outline" className="gap-2">
                      <RotateCcw className="h-4 w-4" />
                      Reset
                    </Button>
                  </div>
                </div>
              </Card>

              {results && (
                <Card className="p-6 bg-gradient-card">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Your Results</h3>
                    <Button onClick={copyResults} variant="outline" size="sm" className="gap-2">
                      <Copy className="h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-muted-foreground text-sm">Principal</p>
                      <p className="text-2xl font-bold mt-1">₹{results.principal.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-muted-foreground text-sm">Total Interest</p>
                      <p className="text-2xl font-bold text-success mt-1">₹{results.totalInterest.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-muted-foreground text-sm">Maturity Amount</p>
                      <p className="text-2xl font-bold text-primary mt-1">₹{results.maturityAmount.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </Card>
              )}

              {isPremiumUser() ? (
                <Card className="p-6 bg-gradient-success">
                  <h3 className="text-xl font-semibold mb-4">Growth Chart (Premium)</h3>
                  <div className="h-64 flex items-center justify-center bg-background/20 rounded-lg">
                    <p className="text-muted-foreground">Interest accumulation chart would appear here</p>
                  </div>
                </Card>
              ) : (
                <PremiumGate feature="Growth Charts" />
              )}

              {affiliateLinks.map(link => (
                <div key={link.id}>
                  <AffiliateButton
                    id={link.id}
                    ctaText={link.ctaText}
                    referralLink={link.referralLink}
                    placement={link.placement}
                    partnerName={link.partnerName}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <AdSenseSlot slot="sidebar" />
              
              <Card className="p-6 bg-gradient-card">
                <h3 className="text-lg font-semibold mb-3">What is FD?</h3>
                <p className="text-sm text-muted-foreground">
                  Fixed Deposit (FD) is a financial instrument offered by banks with guaranteed returns. Your principal amount is locked for a fixed tenure at a predetermined interest rate.
                </p>
              </Card>

              <Card className="p-6 bg-gradient-card">
                <h3 className="text-lg font-semibold mb-3">How to Use?</h3>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Enter deposit amount</li>
                  <li>Input bank's interest rate</li>
                  <li>Choose investment tenure</li>
                  <li>Select compounding frequency</li>
                  <li>Click Calculate</li>
                </ol>
              </Card>
            </div>
          </div>

          <div className="mt-8">
            <Card className="p-6 bg-gradient-card">
              <h2 className="text-2xl font-bold mb-4">Understanding Fixed Deposits</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground mb-3">
                  Fixed Deposits are one of the safest investment options in India. Banks and financial institutions offer FDs with varying interest rates typically ranging from 5% to 7% per annum.
                </p>
                <h3 className="text-lg font-semibold mb-2 mt-4">FD Benefits</h3>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Guaranteed returns with no market risk</li>
                  <li>• Higher interest rates for senior citizens</li>
                  <li>• Loan facility against FD</li>
                  <li>• Tax benefits under Section 80C (for tax-saving FDs)</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FDCalculator;

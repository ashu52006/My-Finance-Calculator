import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Copy, RotateCcw, Wallet } from 'lucide-react';
import { toast } from 'sonner';
import AffiliateButton from '@/components/AffiliateButton';
import AdSenseSlot from '@/components/AdSenseSlot';
import PremiumGate from '@/components/PremiumGate';
import { getAffiliateLinks } from '@/utils/affiliate';
import { isPremiumUser } from '@/utils/subscription';

const RDCalculator = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState('5000');
  const [interestRate, setInterestRate] = useState('6');
  const [tenure, setTenure] = useState('5');
  const [results, setResults] = useState<any>(null);

  const affiliateLinks = getAffiliateLinks().filter(
    link => link.calculatorPage === 'rd' && link.status === 'active'
  ).sort((a, b) => a.priority - b.priority);

  const calculate = () => {
    const P = parseFloat(monthlyDeposit);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(tenure) * 12;

    if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || n <= 0) {
      toast.error('Please enter valid positive numbers');
      return;
    }

    // M = P × [(1 + r)^n - 1] / [1 - (1 + r)^(-1/3)]
    // Simplified: M = P × n × [(1 + (n + 1) / (2 × 12)) × r]
    const maturityValue = P * n + (P * n * (n + 1) / 2) * r;
    const totalDeposit = P * n;
    const totalInterest = maturityValue - totalDeposit;

    setResults({
      totalDeposit: Math.round(totalDeposit),
      totalInterest: Math.round(totalInterest),
      maturityValue: Math.round(maturityValue)
    });

    toast.success('Calculation completed!');
  };

  const reset = () => {
    setMonthlyDeposit('5000');
    setInterestRate('6');
    setTenure('5');
    setResults(null);
  };

  const copyResults = () => {
    if (!results) return;
    const text = `RD Calculator Results:\nMonthly Deposit: ₹${monthlyDeposit}\nInterest Rate: ${interestRate}%\nTenure: ${tenure} years\nTotal Deposit: ₹${results.totalDeposit.toLocaleString('en-IN')}\nTotal Interest: ₹${results.totalInterest.toLocaleString('en-IN')}\nMaturity Value: ₹${results.maturityValue.toLocaleString('en-IN')}`;
    navigator.clipboard.writeText(text);
    toast.success('Results copied to clipboard!');
  };

  return (
    <Layout>
      <Helmet>
        <title>RD Calculator India 2025 - Recurring Deposit Calculator Online</title>
        <meta name="description" content="Calculate RD maturity amount online. Free Recurring Deposit calculator for all banks in India. Get instant RD returns and interest earnings." />
        <meta name="keywords" content="RD calculator, recurring deposit calculator, RD maturity calculator India, bank RD calculator, RD interest calculator" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "RD Calculator",
            "applicationCategory": "FinanceApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            }
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-xl inline-block mb-4">
              <Wallet className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3">RD Calculator</h1>
            <p className="text-muted-foreground text-lg">
              Calculate returns on Recurring Deposit schemes
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 bg-gradient-card">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="monthly-deposit" className="flex items-center gap-2">
                      Monthly Deposit (₹)
                      <span className="text-xs text-muted-foreground" title="Amount deposited every month">ⓘ</span>
                    </Label>
                    <Input
                      id="monthly-deposit"
                      type="number"
                      value={monthlyDeposit}
                      onChange={(e) => setMonthlyDeposit(e.target.value)}
                      className="mt-2"
                      placeholder="5000"
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
                      <p className="text-muted-foreground text-sm">Total Deposit</p>
                      <p className="text-2xl font-bold mt-1">₹{results.totalDeposit.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-muted-foreground text-sm">Total Interest</p>
                      <p className="text-2xl font-bold text-success mt-1">₹{results.totalInterest.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-muted-foreground text-sm">Maturity Value</p>
                      <p className="text-2xl font-bold text-primary mt-1">₹{results.maturityValue.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </Card>
              )}

              {isPremiumUser() ? (
                <Card className="p-6 bg-gradient-success">
                  <h3 className="text-xl font-semibold mb-4">Deposit Schedule (Premium)</h3>
                  <div className="h-64 flex items-center justify-center bg-background/20 rounded-lg">
                    <p className="text-muted-foreground">Monthly deposit breakdown would appear here</p>
                  </div>
                </Card>
              ) : (
                <PremiumGate feature="Deposit Schedule" />
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
                <h3 className="text-lg font-semibold mb-3">What is RD?</h3>
                <p className="text-sm text-muted-foreground">
                  Recurring Deposit (RD) is a savings scheme where you deposit a fixed amount every month for a predetermined period and earn interest on the accumulated amount.
                </p>
              </Card>

              <Card className="p-6 bg-gradient-card">
                <h3 className="text-lg font-semibold mb-3">How to Use?</h3>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Enter monthly deposit amount</li>
                  <li>Input interest rate</li>
                  <li>Choose tenure in years</li>
                  <li>Click Calculate</li>
                </ol>
              </Card>
            </div>
          </div>

          <div className="mt-8">
            <Card className="p-6 bg-gradient-card">
              <h2 className="text-2xl font-bold mb-4">Understanding Recurring Deposits</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground mb-3">
                  Recurring Deposit is an ideal savings product for people with regular income. It combines features of savings account with benefits of fixed deposits.
                </p>
                <h3 className="text-lg font-semibold mb-2 mt-4">RD Benefits</h3>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Cultivates disciplined savings habit</li>
                  <li>• Higher returns than savings accounts</li>
                  <li>• Flexible monthly deposit amounts</li>
                  <li>• Tenure ranges from 6 months to 10 years</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RDCalculator;

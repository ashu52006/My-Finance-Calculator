import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Copy, RotateCcw, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import AffiliateButton from '@/components/AffiliateButton';
import AdSenseSlot from '@/components/AdSenseSlot';
import PremiumGate from '@/components/PremiumGate';
import { getAffiliateLinks } from '@/utils/affiliate';
import { isPremiumUser } from '@/utils/subscription';

const SIPCalculator = () => {
  const [monthlySIP, setMonthlySIP] = useState('5000');
  const [annualReturn, setAnnualReturn] = useState('12');
  const [tenure, setTenure] = useState('10');
  const [results, setResults] = useState<any>(null);

  const affiliateLinks = getAffiliateLinks().filter(
    link => link.calculatorPage === 'sip' && link.status === 'active'
  ).sort((a, b) => a.priority - b.priority);

  const calculate = () => {
    const P = parseFloat(monthlySIP);
    const r = parseFloat(annualReturn) / 100 / 12;
    const n = parseFloat(tenure) * 12;

    if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || n <= 0) {
      toast.error('Please enter valid positive numbers');
      return;
    }

    // FV = P × [(1 + r)^n - 1] / r × (1 + r)
    const futureValue = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    const totalInvestment = P * n;
    const estimatedReturns = futureValue - totalInvestment;
    
    // Calculate CAGR
    const cagr = ((Math.pow(futureValue / totalInvestment, 1 / parseFloat(tenure)) - 1) * 100).toFixed(2);

    setResults({
      totalInvestment: Math.round(totalInvestment),
      estimatedReturns: Math.round(estimatedReturns),
      futureValue: Math.round(futureValue),
      cagr
    });

    toast.success('Calculation completed!');
  };

  const reset = () => {
    setMonthlySIP('5000');
    setAnnualReturn('12');
    setTenure('10');
    setResults(null);
  };

  const copyResults = () => {
    if (!results) return;
    const text = `SIP Calculator Results:\nMonthly SIP: ₹${monthlySIP}\nTenure: ${tenure} years\nExpected Return: ${annualReturn}%\nTotal Investment: ₹${results.totalInvestment.toLocaleString('en-IN')}\nEstimated Returns: ₹${results.estimatedReturns.toLocaleString('en-IN')}\nFuture Value: ₹${results.futureValue.toLocaleString('en-IN')}\nCAGR: ${results.cagr}%`;
    navigator.clipboard.writeText(text);
    toast.success('Results copied to clipboard!');
  };

  return (
    <Layout>
      <Helmet>
        <title>SIP Calculator India 2025 - Free Mutual Fund SIP Calculator</title>
        <meta name="description" content="Calculate SIP returns with our free online SIP calculator. Estimate future value, CAGR, and expected returns on systematic investment plans in India." />
        <meta name="keywords" content="SIP calculator, mutual fund calculator, systematic investment plan, SIP returns calculator India, CAGR calculator" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "SIP Calculator",
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
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl inline-block mb-4">
              <TrendingUp className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3">SIP Calculator</h1>
            <p className="text-muted-foreground text-lg">
              Calculate returns on your Systematic Investment Plan with accurate projections
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 bg-gradient-card">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="monthly-sip" className="flex items-center gap-2">
                      Monthly SIP Amount (₹)
                      <span className="text-xs text-muted-foreground" title="Amount you invest every month">ⓘ</span>
                    </Label>
                    <Input
                      id="monthly-sip"
                      type="number"
                      value={monthlySIP}
                      onChange={(e) => setMonthlySIP(e.target.value)}
                      className="mt-2"
                      placeholder="5000"
                    />
                  </div>

                  <div>
                    <Label htmlFor="return-rate" className="flex items-center gap-2">
                      Expected Annual Return (%)
                      <span className="text-xs text-muted-foreground" title="Average yearly return expected">ⓘ</span>
                    </Label>
                    <Input
                      id="return-rate"
                      type="number"
                      step="0.1"
                      value={annualReturn}
                      onChange={(e) => setAnnualReturn(e.target.value)}
                      className="mt-2"
                      placeholder="12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tenure" className="flex items-center gap-2">
                      Investment Tenure (Years)
                      <span className="text-xs text-muted-foreground" title="How long you'll invest">ⓘ</span>
                    </Label>
                    <Input
                      id="tenure"
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(e.target.value)}
                      className="mt-2"
                      placeholder="10"
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
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-muted-foreground text-sm">Total Investment</p>
                      <p className="text-2xl font-bold mt-1">₹{results.totalInvestment.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-muted-foreground text-sm">Estimated Returns</p>
                      <p className="text-2xl font-bold text-success mt-1">₹{results.estimatedReturns.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-muted-foreground text-sm">Future Value (Maturity)</p>
                      <p className="text-2xl font-bold text-primary mt-1">₹{results.futureValue.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-muted-foreground text-sm">CAGR</p>
                      <p className="text-2xl font-bold mt-1">{results.cagr}%</p>
                    </div>
                  </div>
                </Card>
              )}

              {isPremiumUser() ? (
                <Card className="p-6 bg-gradient-success">
                  <h3 className="text-xl font-semibold mb-4">Investment Chart (Premium)</h3>
                  <div className="h-64 flex items-center justify-center bg-background/20 rounded-lg">
                    <p className="text-muted-foreground">Chart visualization would appear here</p>
                  </div>
                </Card>
              ) : (
                <PremiumGate feature="Investment Charts" />
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
                <h3 className="text-lg font-semibold mb-3">What is SIP?</h3>
                <p className="text-sm text-muted-foreground">
                  Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly in mutual funds. It helps you build wealth through the power of compounding and rupee cost averaging.
                </p>
              </Card>

              <Card className="p-6 bg-gradient-card">
                <h3 className="text-lg font-semibold mb-3">How to Use?</h3>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Enter your monthly SIP amount</li>
                  <li>Set expected annual return rate (typically 10-15%)</li>
                  <li>Choose investment duration in years</li>
                  <li>Click Calculate to see results</li>
                </ol>
              </Card>
            </div>
          </div>

          <div className="mt-8">
            <Card className="p-6 bg-gradient-card">
              <h2 className="text-2xl font-bold mb-4">Understanding SIP Returns</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground mb-3">
                  A Systematic Investment Plan (SIP) is one of the most popular ways to invest in mutual funds in India. Instead of investing a lump sum, you invest a fixed amount regularly (monthly/quarterly) which helps in averaging out market volatility.
                </p>
                <h3 className="text-lg font-semibold mb-2 mt-4">Benefits of SIP</h3>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Rupee Cost Averaging reduces market timing risk</li>
                  <li>• Power of compounding grows your wealth exponentially</li>
                  <li>• Disciplined investing builds long-term wealth</li>
                  <li>• Flexible - start with as low as ₹500 per month</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SIPCalculator;

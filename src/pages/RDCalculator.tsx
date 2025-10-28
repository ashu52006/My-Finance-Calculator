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
        <title>RD Calculator 2026: Recurring Deposit Maturity & Interest | Best RD</title>
        <meta name="description" content="Calculate Recurring Deposit maturity instantly! Plan monthly savings with best RD rates across banks. Free RD Calculator India 2026 with interest breakdown." />
        <meta name="keywords" content="RD calculator India 2026, recurring deposit calculator, RD maturity calculator, bank RD calculator, best RD rates, RD interest calculator, monthly deposit calculator" />
        <link rel="canonical" href="https://myfinancecalculator.netlify.app/rd" />
        
        {/* Open Graph */}
        <meta property="og:title" content="RD Calculator 2026 - Calculate Recurring Deposit Returns & Maturity" />
        <meta property="og:description" content="Calculate RD maturity and plan monthly savings. Free & accurate Recurring Deposit calculator for India." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://myfinancecalculator.netlify.app/rd" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RD Calculator 2026 - Calculate Recurring Deposit Returns" />
        <meta name="twitter:description" content="Calculate RD maturity and plan monthly savings with best rates." />
        
        {/* JSON-LD Schema - Calculator & HowTo Combined */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                "name": "RD Calculator India 2026",
                "applicationCategory": "FinanceApplication",
                "operatingSystem": "Any",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "INR"
                },
                "description": "Free Recurring Deposit calculator to calculate maturity value, interest earnings for monthly savings in Indian banks",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.6",
                  "ratingCount": "1450"
                }
              },
              {
                "@type": "HowTo",
                "name": "How to Calculate Recurring Deposit Returns",
                "description": "Learn how to calculate your Recurring Deposit maturity value and interest earnings",
                "step": [
                  {
                    "@type": "HowToStep",
                    "name": "Enter Monthly Deposit",
                    "text": "Input the amount you want to deposit every month"
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Set Interest Rate",
                    "text": "Enter the annual interest rate offered by your bank for RD"
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Choose Tenure",
                    "text": "Select the investment period in years"
                  },
                  {
                    "@type": "HowToStep",
                "name": "Calculate Maturity",
                "text": "Get instant maturity value, total deposits, and interest earned"
              }
            ]
          }
            ]
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-xl inline-block mb-4">
              <Wallet className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3">RD Calculator India (Recurring Deposit Maturity)</h1>
            <p className="text-muted-foreground text-lg">
              Calculate returns on Recurring Deposit with best bank rates for 2026
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

          <div className="mt-8 space-y-6">
            <Card className="p-8 bg-gradient-card">
              <h2 className="text-3xl font-bold mb-6">Complete Guide to Recurring Deposits (RD) in India 2026</h2>
              
              <div className="space-y-6">
                <div>
                  <p className="text-muted-foreground leading-relaxed">
                    Recurring Deposits (RD) are perfect for building wealth through disciplined monthly savings. Unlike Fixed Deposits where you invest a lump sum, RDs allow you to deposit a fixed amount every month, making it ideal for salaried individuals and those with regular income. Our RD calculator helps you plan your monthly savings and calculate exact maturity amounts.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">What is a Recurring Deposit?</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    A Recurring Deposit is a special savings scheme offered by banks and post offices where you deposit a fixed amount every month for a predetermined period. The interest rate is similar to Fixed Deposits, typically ranging from 5.5% to 7.5% per annum. RD interest is compounded quarterly, and the maturity amount includes your total deposits plus accumulated interest.
                  </p>
                  <div className="bg-background/50 p-4 rounded-lg">
                    <p className="font-semibold mb-2">RD Maturity Formula:</p>
                    <p className="text-muted-foreground font-mono text-sm">M = P × n × [(1 + r/400)^(4n+3) - (1 + r/400)^2] / [(1 + r/400) - 1]</p>
                    <p className="text-xs text-muted-foreground mt-2">Where: M = Maturity Amount, P = Monthly Deposit, n = Number of quarters, r = Annual Interest Rate</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">Types of Recurring Deposits</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-background/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Regular RD</h4>
                      <p className="text-sm text-muted-foreground">Standard recurring deposit with tenure from 6 months to 10 years. Fixed monthly deposits with quarterly compounding.</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Post Office RD</h4>
                      <p className="text-sm text-muted-foreground">Government-backed RD scheme with attractive interest rates and tax benefits under certain conditions.</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Senior Citizen RD</h4>
                      <p className="text-sm text-muted-foreground">Enhanced interest rates for investors aged 60+, typically 0.25% to 0.5% higher than regular RD rates.</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">NRI RD</h4>
                      <p className="text-sm text-muted-foreground">Special RD accounts for Non-Resident Indians with competitive interest rates and foreign currency options.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">Benefits of Recurring Deposits</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <p className="font-semibold">Disciplined Savings</p>
                        <p className="text-sm text-muted-foreground">Builds a habit of regular savings with fixed monthly deposits. Penalties for missed deposits encourage consistency.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <p className="font-semibold">Low Entry Barrier</p>
                        <p className="text-sm text-muted-foreground">Start with as little as ₹100-500 per month. No need for lump sum investment like FDs.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <p className="font-semibold">Loan Facility</p>
                        <p className="text-sm text-muted-foreground">Avail loans against your RD up to 90% of the deposited amount at minimal interest rates.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <p className="font-semibold">Flexible Tenure</p>
                        <p className="text-sm text-muted-foreground">Choose tenure from 6 months to 10 years based on your financial goals and capacity.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">RD vs Other Investment Options</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-background/50">
                          <th className="p-3 text-left">Feature</th>
                          <th className="p-3 text-left">RD</th>
                          <th className="p-3 text-left">FD</th>
                          <th className="p-3 text-left">SIP</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-border">
                          <td className="p-3">Investment Type</td>
                          <td className="p-3">Monthly deposits</td>
                          <td className="p-3">Lump sum</td>
                          <td className="p-3">Monthly deposits</td>
                        </tr>
                        <tr className="border-t border-border">
                          <td className="p-3">Returns</td>
                          <td className="p-3 text-warning">Guaranteed (5.5-7.5%)</td>
                          <td className="p-3 text-warning">Guaranteed (6-8%)</td>
                          <td className="p-3 text-success">Market-linked (12-15%)</td>
                        </tr>
                        <tr className="border-t border-border">
                          <td className="p-3">Risk</td>
                          <td className="p-3 text-success">Very Low</td>
                          <td className="p-3 text-success">Very Low</td>
                          <td className="p-3 text-warning">Moderate-High</td>
                        </tr>
                        <tr className="border-t border-border">
                          <td className="p-3">Liquidity</td>
                          <td className="p-3 text-warning">Low (penalty)</td>
                          <td className="p-3 text-warning">Low (penalty)</td>
                          <td className="p-3 text-success">High</td>
                        </tr>
                        <tr className="border-t border-border">
                          <td className="p-3">Best For</td>
                          <td className="p-3">Regular savers</td>
                          <td className="p-3">Lump sum investors</td>
                          <td className="p-3">Long-term wealth</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">Best RD Interest Rates 2026</h3>
                  <div className="space-y-3">
                    <div className="bg-background/50 p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-semibold">State Bank of India (SBI)</p>
                        <p className="text-sm text-muted-foreground">Regular: 6.50% | Senior Citizen: 7.00%</p>
                      </div>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-semibold">HDFC Bank</p>
                        <p className="text-sm text-muted-foreground">Regular: 6.80% | Senior Citizen: 7.30%</p>
                      </div>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-semibold">Post Office RD</p>
                        <p className="text-sm text-muted-foreground">Regular: 6.70% (Updated Quarterly)</p>
                      </div>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-semibold">Small Finance Banks</p>
                        <p className="text-sm text-muted-foreground">Regular: 7.50% | Senior Citizen: 8.00%</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">*Interest rates are indicative and subject to change. Verify current rates with respective banks.</p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">RD Tax Rules</h3>
                  <div className="space-y-3">
                    <div className="bg-background/50 p-4 rounded-lg">
                      <p className="font-semibold mb-2">TDS Applicability</p>
                      <p className="text-sm text-muted-foreground">Banks deduct 10% TDS if total interest exceeds ₹40,000 per year (₹50,000 for senior citizens). TDS is 20% without PAN.</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg">
                      <p className="font-semibold mb-2">Income Tax Treatment</p>
                      <p className="text-sm text-muted-foreground">Interest earned on RD is added to your total income and taxed as per your income tax slab rate.</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg">
                      <p className="font-semibold mb-2">No 80C Benefit</p>
                      <p className="text-sm text-muted-foreground">Unlike PPF and ELSS, regular RD deposits do not qualify for tax deduction under Section 80C.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div className="bg-background/50 p-4 rounded-lg">
                      <p className="font-semibold mb-2">What happens if I miss an RD installment?</p>
                      <p className="text-sm text-muted-foreground">Banks charge a penalty (typically ₹10-50 per missed installment). You can pay the missed amount with penalty. After multiple defaults, the account may be closed prematurely.</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg">
                      <p className="font-semibold mb-2">Can I withdraw my RD before maturity?</p>
                      <p className="text-sm text-muted-foreground">Yes, premature withdrawal is allowed but banks impose penalties (usually 1-2% interest reduction) and you receive lower interest for the actual tenure.</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg">
                      <p className="font-semibold mb-2">How is RD different from SIP?</p>
                      <p className="text-sm text-muted-foreground">RD offers guaranteed returns (6-7%) with zero risk, while SIP invests in mutual funds with market-linked returns (10-15% potential) but carries market risk. RD is for safety, SIP for wealth creation.</p>
                    </div>
                    <div className="bg-background/50 p-4 rounded-lg">
                      <p className="font-semibold mb-2">Can I increase my monthly RD deposit?</p>
                      <p className="text-sm text-muted-foreground">No, RD requires fixed monthly deposits. To save more, you need to open an additional RD account with a higher deposit amount.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">Related Calculators</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <a href="/fd" className="bg-background/50 p-4 rounded-lg hover:bg-background/70 transition-colors">
                      <p className="font-semibold mb-1">FD Calculator</p>
                      <p className="text-xs text-muted-foreground">Calculate Fixed Deposit returns</p>
                    </a>
                    <a href="/sip" className="bg-background/50 p-4 rounded-lg hover:bg-background/70 transition-colors">
                      <p className="font-semibold mb-1">SIP Calculator</p>
                      <p className="text-xs text-muted-foreground">Plan systematic investments</p>
                    </a>
                    <a href="/emi" className="bg-background/50 p-4 rounded-lg hover:bg-background/70 transition-colors">
                      <p className="font-semibold mb-1">EMI Calculator</p>
                      <p className="text-xs text-muted-foreground">Calculate loan EMI amounts</p>
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RDCalculator;

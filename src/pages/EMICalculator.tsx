import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Copy, RotateCcw, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import AffiliateButton from '@/components/AffiliateButton';
import AdSenseSlot from '@/components/AdSenseSlot';
import PremiumGate from '@/components/PremiumGate';
import { getAffiliateLinks } from '@/utils/affiliate';
import { isPremiumUser } from '@/utils/subscription';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const EMICalculator = () => {
  const [principal, setPrincipal] = useState('1000000');
  const [interestRate, setInterestRate] = useState('8');
  const [tenure, setTenure] = useState('20');
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [results, setResults] = useState<any>(null);

  const affiliateLinks = getAffiliateLinks().filter(
    link => link.calculatorPage === 'emi' && link.status === 'active'
  ).sort((a, b) => a.priority - b.priority);

  const calculate = () => {
    const P = parseFloat(principal);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = tenureType === 'years' ? parseFloat(tenure) * 12 : parseFloat(tenure);

    if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || n <= 0) {
      toast.error('Please enter valid positive numbers');
      return;
    }

    // EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    setResults({
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      principal: Math.round(P)
    });

    toast.success('Calculation completed!');
  };

  const reset = () => {
    setPrincipal('1000000');
    setInterestRate('8');
    setTenure('20');
    setTenureType('years');
    setResults(null);
  };

  const copyResults = () => {
    if (!results) return;
    const text = `EMI Calculator Results:\nLoan Amount: ₹${results.principal.toLocaleString('en-IN')}\nInterest Rate: ${interestRate}%\nTenure: ${tenure} ${tenureType}\nMonthly EMI: ₹${results.emi.toLocaleString('en-IN')}\nTotal Interest: ₹${results.totalInterest.toLocaleString('en-IN')}\nTotal Payment: ₹${results.totalPayment.toLocaleString('en-IN')}`;
    navigator.clipboard.writeText(text);
    toast.success('Results copied to clipboard!');
  };

  return (
    <Layout>
      <Helmet>
        <title>EMI Calculator India 2025 - Home Loan, Car Loan, Personal Loan EMI</title>
        <meta name="description" content="Calculate your loan EMI online. Free EMI calculator for home loans, car loans, and personal loans in India. Get instant EMI, interest, and total payment details." />
        <meta name="keywords" content="EMI calculator, home loan EMI, car loan calculator, personal loan EMI, loan calculator India" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "EMI Calculator",
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
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl inline-block mb-4">
              <CreditCard className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3">EMI Calculator</h1>
            <p className="text-muted-foreground text-lg">
              Calculate your monthly loan EMI and total interest payable
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 bg-gradient-card">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="principal" className="flex items-center gap-2">
                      Loan Amount (₹)
                      <span className="text-xs text-muted-foreground" title="Total loan amount">ⓘ</span>
                    </Label>
                    <Input
                      id="principal"
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      className="mt-2"
                      placeholder="1000000"
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
                      placeholder="8"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tenure" className="flex items-center gap-2">
                      Loan Tenure
                      <span className="text-xs text-muted-foreground" title="Duration of the loan">ⓘ</span>
                    </Label>
                    <div className="flex gap-3 mt-2">
                      <Input
                        id="tenure"
                        type="number"
                        value={tenure}
                        onChange={(e) => setTenure(e.target.value)}
                        className="flex-1"
                        placeholder="20"
                      />
                      <RadioGroup value={tenureType} onValueChange={(value: any) => setTenureType(value)} className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="years" id="years" />
                          <Label htmlFor="years" className="cursor-pointer">Years</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="months" id="months" />
                          <Label htmlFor="months" className="cursor-pointer">Months</Label>
                        </div>
                      </RadioGroup>
                    </div>
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
                      <p className="text-muted-foreground text-sm">Monthly EMI</p>
                      <p className="text-2xl font-bold text-primary mt-1">₹{results.emi.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-muted-foreground text-sm">Principal Amount</p>
                      <p className="text-2xl font-bold mt-1">₹{results.principal.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-muted-foreground text-sm">Total Interest</p>
                      <p className="text-2xl font-bold text-warning mt-1">₹{results.totalInterest.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <p className="text-muted-foreground text-sm">Total Payment</p>
                      <p className="text-2xl font-bold mt-1">₹{results.totalPayment.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </Card>
              )}

              {isPremiumUser() ? (
                <Card className="p-6 bg-gradient-success">
                  <h3 className="text-xl font-semibold mb-4">Amortization Schedule (Premium)</h3>
                  <div className="h-64 flex items-center justify-center bg-background/20 rounded-lg">
                    <p className="text-muted-foreground">Payment breakdown table would appear here</p>
                  </div>
                </Card>
              ) : (
                <PremiumGate feature="Amortization Schedule" />
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
                <h3 className="text-lg font-semibold mb-3">What is EMI?</h3>
                <p className="text-sm text-muted-foreground">
                  Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month.
                </p>
              </Card>

              <Card className="p-6 bg-gradient-card">
                <h3 className="text-lg font-semibold mb-3">How to Use?</h3>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Enter loan amount</li>
                  <li>Input interest rate per annum</li>
                  <li>Select tenure in years or months</li>
                  <li>Click Calculate for instant results</li>
                </ol>
              </Card>
            </div>
          </div>

          <div className="mt-8">
            <Card className="p-6 bg-gradient-card">
              <h2 className="text-2xl font-bold mb-4">Understanding EMI Calculation</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground mb-3">
                  EMI is calculated using the formula: [P x R x (1+R)^N]/[(1+R)^N-1], where P is principal, R is monthly interest rate, and N is tenure in months.
                </p>
                <h3 className="text-lg font-semibold mb-2 mt-4">Factors Affecting EMI</h3>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Loan Amount: Higher loan = higher EMI</li>
                  <li>• Interest Rate: Lower rate = lower EMI</li>
                  <li>• Tenure: Longer tenure = lower EMI but more total interest</li>
                  <li>• Processing fees and other charges not included in EMI</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EMICalculator;

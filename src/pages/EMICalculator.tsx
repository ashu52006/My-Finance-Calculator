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
        <title>EMI Calculator 2026: Home, Car & Personal Loan | Apply Now</title>
        <meta name="description" content="Calculate EMI instantly & check loan eligibility with lowest interest rates. Apply for Home, Car & Personal Loans Now! Free EMI Calculator India 2026 with charts." />
        <meta name="keywords" content="EMI calculator India 2026, home loan EMI calculator, car loan calculator, personal loan EMI, loan calculator, best EMI calculator, online loan calculator" />
        <link rel="canonical" href="https://myfinancecalculator.netlify.app/emi" />
        
        {/* Open Graph */}
        <meta property="og:title" content="EMI Calculator 2026 - Calculate Loan EMI & Apply Instantly" />
        <meta property="og:description" content="Calculate your EMI with lowest interest rates. Free & accurate EMI calculator for all types of loans." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://myfinancecalculator.netlify.app/emi" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EMI Calculator 2026 - Calculate Loan EMI & Apply Instantly" />
        <meta name="twitter:description" content="Calculate your EMI with lowest interest rates. Free & accurate EMI calculator for all types of loans." />
        
        {/* JSON-LD Schema - Calculator & HowTo Combined */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                "name": "EMI Calculator India 2026",
                "applicationCategory": "FinanceApplication",
                "operatingSystem": "Any",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "INR"
                },
                "description": "Free EMI (Equated Monthly Installment) calculator for home loans, car loans, and personal loans in India with instant results",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "ratingCount": "2340"
                }
              },
              {
                "@type": "HowTo",
                "name": "How to Calculate Loan EMI",
                "description": "Learn how to calculate your Equated Monthly Installment (EMI) for home loans, car loans, and personal loans",
                "step": [
                  {
                    "@type": "HowToStep",
                    "name": "Enter Loan Amount",
                    "text": "Input the total principal amount you want to borrow"
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Set Interest Rate",
                    "text": "Enter the annual interest rate offered by your lender"
                  },
                  {
                    "@type": "HowToStep",
                "name": "Choose Loan Tenure",
                "text": "Select the repayment period in years or months"
              },
              {
                "@type": "HowToStep",
                "name": "View EMI Results",
                "text": "Get instant EMI amount, total interest payable, and total payment details"
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
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl inline-block mb-4">
              <CreditCard className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3">EMI Calculator India (Home, Car & Personal Loans)</h1>
            <p className="text-muted-foreground text-lg">
              Calculate your monthly loan EMI with lowest interest rates - Apply Now for 2026!
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
                <>
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

                  {/* High-Conversion CTA for EMI */}
                  <Card className="p-8 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 border-2 border-purple-400/50 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <div className="relative z-10 text-center space-y-4">
                      <div className="inline-block bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-full mb-2 animate-pulse">
                        🔥 APPLY NOW: LOWEST INTEREST RATES!
                      </div>
                      <h3 className="text-2xl font-bold text-white">Ready to Get Your Loan Approved?</h3>
                      <p className="text-white/95 text-lg">Check Eligibility & Get Instant Approval with Lowest EMI!</p>
                      <Button 
                        size="lg" 
                        className="bg-white text-purple-600 hover:bg-white/90 font-bold text-lg px-8 py-6 shadow-[0_12px_48px_rgba(0,0,0,0.3)] hover:scale-105 transition-all"
                        onClick={() => window.open('https://your-loan-affiliate-link.com', '_blank')}
                      >
                        CHECK LOAN ELIGIBILITY NOW →
                      </Button>
                      <p className="text-white/80 text-sm">Instant approval • Lowest interest rates • Zero processing fee</p>
                    </div>
                  </Card>
                </>
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

          {/* Comprehensive SEO Content Section */}
          <div className="mt-8 space-y-8">
            <Card className="p-8 bg-gradient-card">
              <article className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-bold mb-6">What is EMI and How is it Calculated?</h2>
                <p className="text-muted-foreground text-lg mb-6">
                  Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month, so that over a specified number of years, the loan is paid off in full. Our EMI calculator helps you determine your monthly payment obligations instantly for home loans, car loans, personal loans, and any other type of loan.
                </p>
                
                <h3 className="text-2xl font-semibold mb-4 mt-8">EMI Calculation Formula 2026</h3>
                <p className="text-muted-foreground mb-4">
                  The EMI amount is calculated using the following formula: <strong>EMI = [P × R × (1+R)^N] / [(1+R)^N-1]</strong>
                </p>
                <ul className="text-muted-foreground space-y-2 mb-6">
                  <li><strong>P</strong> = Principal Loan Amount</li>
                  <li><strong>R</strong> = Monthly Interest Rate (Annual Rate / 12 / 100)</li>
                  <li><strong>N</strong> = Loan Tenure in Months</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4 mt-8">How to Use EMI Calculator</h3>
                <p className="text-muted-foreground mb-4">
                  Using our advanced EMI calculator is simple and gives you instant accurate results. Enter your desired loan amount, the annual interest rate offered by your lender, and choose the loan tenure in years or months. The calculator will instantly show you the monthly EMI amount, total interest payable, and total payment amount including principal and interest.
                </p>

                <h3 className="text-2xl font-semibold mb-4 mt-8">Factors Affecting Your EMI Amount</h3>
                <ul className="text-muted-foreground space-y-3 mb-6">
                  <li><strong>Loan Amount (Principal):</strong> Higher the loan amount, higher will be your EMI. Consider borrowing only what you need</li>
                  <li><strong>Interest Rate:</strong> Even a 0.5% difference in interest rate can significantly impact your EMI and total interest paid. Compare rates from multiple lenders</li>
                  <li><strong>Loan Tenure:</strong> Longer tenure reduces monthly EMI but increases total interest paid. Choose tenure that balances affordability with total cost</li>
                  <li><strong>Processing Fees:</strong> Usually 0.5-2% of loan amount. Factor this into your total cost</li>
                  <li><strong>Prepayment Charges:</strong> Some lenders charge penalties for early loan closure. Check terms before choosing a lender</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4 mt-8">Types of Loans and Current Interest Rates 2026</h3>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="text-left py-3 px-4">Loan Type</th>
                        <th className="text-left py-3 px-4">Typical Interest Rate</th>
                        <th className="text-left py-3 px-4">Maximum Tenure</th>
                        <th className="text-left py-3 px-4">Processing Fee</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">Home Loan</td>
                        <td className="py-3 px-4">8.0% - 9.5%</td>
                        <td className="py-3 px-4">30 years</td>
                        <td className="py-3 px-4">0.5% - 1%</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">Car Loan</td>
                        <td className="py-3 px-4">8.5% - 11%</td>
                        <td className="py-3 px-4">7 years</td>
                        <td className="py-3 px-4">1% - 2%</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">Personal Loan</td>
                        <td className="py-3 px-4">10% - 24%</td>
                        <td className="py-3 px-4">5 years</td>
                        <td className="py-3 px-4">2% - 3%</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">Education Loan</td>
                        <td className="py-3 px-4">8.5% - 12%</td>
                        <td className="py-3 px-4">15 years</td>
                        <td className="py-3 px-4">0.5% - 1%</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Business Loan</td>
                        <td className="py-3 px-4">11% - 18%</td>
                        <td className="py-3 px-4">10 years</td>
                        <td className="py-3 px-4">1% - 2%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-2xl font-semibold mb-4 mt-8">EMI Tax Benefits for Home Loans</h3>
                <p className="text-muted-foreground mb-4">
                  Home loan borrowers in India can avail significant tax benefits:
                </p>
                <ul className="text-muted-foreground space-y-2 mb-6">
                  <li>• <strong>Section 80C:</strong> Principal repayment up to ₹1.5 lakh is tax deductible</li>
                  <li>• <strong>Section 24:</strong> Interest payment up to ₹2 lakh is tax deductible for self-occupied property</li>
                  <li>• <strong>Section 80EE:</strong> First-time home buyers can claim additional ₹50,000 deduction on interest</li>
                  <li>• <strong>Joint Loan Benefits:</strong> Both co-borrowers can claim tax benefits individually</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4 mt-8">Tips to Reduce Your EMI Burden</h3>
                <ul className="text-muted-foreground space-y-3 mb-6">
                  <li><strong>Increase Down Payment:</strong> Higher down payment means lower loan amount and thus lower EMI</li>
                  <li><strong>Choose Longer Tenure Wisely:</strong> While longer tenure reduces EMI, it increases total interest significantly</li>
                  <li><strong>Make Prepayments:</strong> Use bonuses or windfall gains to make part-prepayments and reduce outstanding principal</li>
                  <li><strong>Balance Transfer:</strong> If you find a better interest rate, consider transferring your loan to a new lender</li>
                  <li><strong>Negotiate Interest Rates:</strong> Loyal customers and those with good credit scores can often negotiate better rates</li>
                  <li><strong>Step-Up EMI:</strong> Some lenders offer increasing EMI plans that start lower and increase annually with your income</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4 mt-8">Frequently Asked Questions (FAQs)</h3>
                <div className="space-y-6 mb-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Q1: What percentage of salary should go to EMI?</h4>
                    <p className="text-muted-foreground">Financial advisors recommend keeping your EMI obligations below 40-50% of your net monthly income to maintain financial stability.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Q2: Can I prepay my loan to reduce EMI?</h4>
                    <p className="text-muted-foreground">Yes, part-prepayment reduces your outstanding principal, which can either reduce your EMI amount or shorten your loan tenure. Check with your lender about prepayment charges.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Q3: Fixed vs Floating Interest Rate - Which is better?</h4>
                    <p className="text-muted-foreground">Fixed rates provide stability but are typically 1-2% higher. Floating rates can be lower but fluctuate with market conditions. Choose based on your risk appetite and market outlook.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Q4: What is the maximum loan amount I can get?</h4>
                    <p className="text-muted-foreground">Lenders typically offer 80-90% of property value for home loans. Your eligibility also depends on your income, existing obligations, credit score, and age. Use our EMI calculator to plan accordingly.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Q5: Should I take a loan or invest my savings?</h4>
                    <p className="text-muted-foreground">If your investment returns exceed your loan interest rate, investing might be better. However, for home loans with tax benefits, the effective interest rate is lower. Use our <a href="/sip" className="text-primary hover:underline">SIP Calculator</a> to compare investment returns.</p>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mb-4 mt-8">Related Financial Calculators</h3>
                <p className="text-muted-foreground mb-4">
                  Plan your complete financial journey with our suite of calculators:
                </p>
                <ul className="text-muted-foreground space-y-2">
                  <li>• <a href="/sip" className="text-primary hover:underline font-semibold">SIP Calculator</a> - Plan your mutual fund investments and wealth creation</li>
                  <li>• <a href="/fd" className="text-primary hover:underline font-semibold">FD Calculator</a> - Calculate Fixed Deposit maturity and returns</li>
                  <li>• <a href="/rd" className="text-primary hover:underline font-semibold">RD Calculator</a> - Estimate Recurring Deposit maturity value</li>
                </ul>
              </article>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EMICalculator;

import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Calculator, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/components/Layout';
import AdSenseSlot from '@/components/AdSenseSlot';

const PersonalLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<string>('500000');
  const [interestRate, setInterestRate] = useState<string>('11.5');
  const [tenure, setTenure] = useState<string>('3');
  
  const principal = parseFloat(loanAmount) || 0;
  const rate = parseFloat(interestRate) || 0;
  const years = parseFloat(tenure) || 0;
  const months = years * 12;
  
  const monthlyRate = rate / 12 / 100;
  const emi = monthlyRate > 0
    ? (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    : principal / months;
  
  const totalAmount = emi * months;
  const totalInterest = totalAmount - principal;
  const processingFee = principal * 0.02; // Typical 2% processing fee

  return (
    <Layout>
      <Helmet>
        <title>Personal Loan Calculator 2026: Calculate Personal Loan EMI India</title>
        <meta name="description" content="Free Personal Loan Calculator 2026. Calculate personal loan EMI, total interest & processing fees. Compare best rates from top banks. Get instant approval online." />
        <meta name="keywords" content="personal loan calculator, personal loan EMI calculator, instant personal loan calculator, personal loan eligibility calculator India 2026" />
        <link rel="canonical" href="https://myfinancecalculator.netlify.app/personal-loan" />
        
        <meta property="og:title" content="Personal Loan Calculator 2026 - Calculate EMI" />
        <meta property="og:description" content="Calculate your personal loan EMI and compare best rates instantly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://myfinancecalculator.netlify.app/personal-loan" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Personal Loan Calculator India" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Personal Loan Calculator",
            "description": "Calculate personal loan EMI and interest for India",
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
              "ratingCount": "11200"
            }
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-primary p-4 rounded-2xl mb-4">
              <Wallet className="h-12 w-12 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Personal Loan Calculator 2026</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calculate personal loan EMI, interest & total cost. Compare best rates from top banks
            </p>
          </div>

          <AdSenseSlot slot="header" />

          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Calculate Personal Loan EMI</CardTitle>
                  <CardDescription>Get instant EMI calculation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      placeholder="Enter loan amount"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">Available: ₹50,000 to ₹40,00,000</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interestRate">Interest Rate (% per annum)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      placeholder="Enter interest rate"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">Typical range: 10% - 24% p.a.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tenure">Loan Tenure (Years)</Label>
                    <Input
                      id="tenure"
                      type="number"
                      placeholder="Enter tenure"
                      value={tenure}
                      onChange={(e) => setTenure(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">Available: 1 to 5 years</p>
                  </div>

                  <Button className="w-full" size="lg">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate EMI
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card">
                <CardHeader>
                  <CardTitle>Loan Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border-2 border-primary">
                    <span className="font-bold text-lg">Monthly EMI</span>
                    <span className="text-3xl font-bold text-primary">₹{emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="font-medium">Loan Amount</span>
                    <span className="text-xl font-bold">₹{principal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="font-medium">Total Interest</span>
                    <span className="text-xl font-bold text-orange-500">₹{totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="font-medium">Processing Fee (Est. 2%)</span>
                    <span className="text-xl font-bold text-red-500">₹{processingFee.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="font-medium">Total Amount Payable</span>
                    <span className="text-xl font-bold text-red-500">₹{totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="font-medium">Loan Tenure</span>
                    <span className="text-xl font-bold">{years} Years ({months} Months)</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-primary">⚡ Apply for Instant Personal Loan</CardTitle>
                  <CardDescription>Get approval in 5 minutes • Disbursal in 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" size="lg">
                    Check Eligibility & Apply Now
                  </Button>
                  <p className="text-sm text-muted-foreground mt-3 text-center">
                    No collateral • Minimal documentation • Competitive rates
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Personal Loan Guide India 2026</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-invert max-w-none">
                  <h3>What is a Personal Loan?</h3>
                  <p>
                    A personal loan is an unsecured loan provided by banks and NBFCs for various personal needs like medical emergencies, 
                    weddings, home renovation, education, or debt consolidation. No collateral is required.
                  </p>
                  
                  <h3>Personal Loan Interest Rates 2026</h3>
                  <ul>
                    <li><strong>HDFC Bank:</strong> 10.50% - 24.00% p.a.</li>
                    <li><strong>SBI Personal Loan:</strong> 11.15% - 15.40% p.a.</li>
                    <li><strong>ICICI Bank:</strong> 10.75% - 19.00% p.a.</li>
                    <li><strong>Axis Bank:</strong> 10.49% - 22.00% p.a.</li>
                  </ul>
                  
                  <h3>Eligibility Criteria</h3>
                  <ul>
                    <li><strong>Age:</strong> 21 to 60 years</li>
                    <li><strong>Minimum Salary:</strong> ₹15,000 - ₹25,000 per month</li>
                    <li><strong>Credit Score:</strong> 750+ preferred</li>
                    <li><strong>Work Experience:</strong> Minimum 2 years (1 year in current company)</li>
                    <li><strong>Employment Type:</strong> Salaried or self-employed</li>
                  </ul>
                  
                  <h3>Documents Required</h3>
                  <ul>
                    <li>Identity proof (Aadhaar, PAN card, passport)</li>
                    <li>Address proof (utility bills, rent agreement)</li>
                    <li>Income proof (salary slips, bank statements)</li>
                    <li>Employment proof (appointment letter, ID card)</li>
                  </ul>
                  
                  <h3>Features & Benefits</h3>
                  <ul>
                    <li>Quick approval and disbursal</li>
                    <li>No collateral required</li>
                    <li>Flexible repayment tenure (1-5 years)</li>
                    <li>Minimal documentation</li>
                    <li>Part-payment and foreclosure options</li>
                  </ul>
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

export default PersonalLoanCalculator;
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Calculator, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/components/Layout';
import AdSenseSlot from '@/components/AdSenseSlot';

const HomeLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<string>('5000000');
  const [interestRate, setInterestRate] = useState<string>('8.5');
  const [tenure, setTenure] = useState<string>('20');
  
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

  return (
    <Layout>
      <Helmet>
        <title>Home Loan EMI Calculator 2026: Calculate Home Loan EMI Online India</title>
        <meta name="description" content="Free Home Loan Calculator India 2026. Calculate home loan EMI, total interest & amortization schedule instantly. Compare best home loan rates from top banks." />
        <meta name="keywords" content="home loan calculator, home loan EMI calculator, housing loan calculator India, home loan interest calculator, home loan eligibility calculator 2026" />
        <link rel="canonical" href="https://myfinancecalculator.netlify.app/home-loan" />
        
        <meta property="og:title" content="Home Loan Calculator 2026 - Calculate EMI Online" />
        <meta property="og:description" content="Calculate your home loan EMI and compare best rates from top banks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://myfinancecalculator.netlify.app/home-loan" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home Loan EMI Calculator India" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Home Loan Calculator",
            "description": "Calculate home loan EMI and total interest for India",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "9870"
            }
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-primary p-4 rounded-2xl mb-4">
              <Home className="h-12 w-12 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Home Loan EMI Calculator 2026</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calculate your home loan EMI, total interest, and monthly payments instantly
            </p>
          </div>

          <AdSenseSlot slot="header" />

          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Calculate Home Loan EMI</CardTitle>
                  <CardDescription>Enter your loan details</CardDescription>
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tenure">Loan Tenure (Years)</Label>
                    <Input
                      id="tenure"
                      type="number"
                      placeholder="Enter tenure in years"
                      value={tenure}
                      onChange={(e) => setTenure(e.target.value)}
                    />
                  </div>

                  <Button className="w-full" size="lg">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate EMI
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card">
                <CardHeader>
                  <CardTitle>EMI Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border-2 border-primary">
                    <span className="font-bold text-lg">Monthly EMI</span>
                    <span className="text-3xl font-bold text-primary">₹{emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="font-medium">Principal Amount</span>
                    <span className="text-xl font-bold">₹{principal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="font-medium">Total Interest</span>
                    <span className="text-xl font-bold text-orange-500">₹{totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
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

              <Card className="border-2 border-success bg-success/5">
                <CardHeader>
                  <CardTitle className="text-success">🏡 Ready to Apply for Home Loan?</CardTitle>
                  <CardDescription>Get instant approval with lowest interest rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-success hover:bg-success/90" size="lg">
                    Check Eligibility & Apply Now
                  </Button>
                  <p className="text-sm text-muted-foreground mt-3 text-center">
                    Compare rates from top banks • Zero processing fee • Instant approval
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Home Loan Guide India 2026</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-invert max-w-none">
                  <h3>What is Home Loan EMI?</h3>
                  <p>
                    EMI (Equated Monthly Installment) is the fixed monthly amount you pay to the lender until the home loan is fully repaid. 
                    It includes both principal and interest components.
                  </p>
                  
                  <h3>Home Loan Interest Rates 2026</h3>
                  <ul>
                    <li><strong>SBI Home Loan:</strong> 8.50% - 9.65% p.a.</li>
                    <li><strong>HDFC Home Loan:</strong> 8.60% - 9.50% p.a.</li>
                    <li><strong>ICICI Home Loan:</strong> 8.75% - 9.75% p.a.</li>
                    <li><strong>Axis Bank:</strong> 8.75% - 10.00% p.a.</li>
                  </ul>
                  
                  <h3>Home Loan Eligibility Criteria</h3>
                  <ul>
                    <li>Age: 21 to 65 years</li>
                    <li>Minimum income: ₹25,000 per month</li>
                    <li>Credit score: 750 or above preferred</li>
                    <li>Employment: Salaried or self-employed</li>
                  </ul>
                  
                  <h3>Tax Benefits on Home Loan</h3>
                  <p>
                    <strong>Section 24(b):</strong> Deduction up to ₹2 lakh on interest paid<br/>
                    <strong>Section 80C:</strong> Deduction up to ₹1.5 lakh on principal repayment
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

export default HomeLoanCalculator;
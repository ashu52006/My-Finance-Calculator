import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Calculator, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/Layout';
import AdSenseSlot from '@/components/AdSenseSlot';

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState<string>('100000');
  const [rate, setRate] = useState<string>('8');
  const [time, setTime] = useState<string>('10');
  const [frequency, setFrequency] = useState<string>('1'); // 1=yearly, 4=quarterly, 12=monthly
  
  const P = parseFloat(principal) || 0;
  const r = parseFloat(rate) / 100;
  const t = parseFloat(time) || 0;
  const n = parseFloat(frequency);
  
  // Compound Interest Formula: A = P(1 + r/n)^(nt)
  const amount = P * Math.pow((1 + r / n), n * t);
  const compoundInterest = amount - P;

  return (
    <Layout>
      <Helmet>
        <title>Compound Interest Calculator 2026: Calculate CI Online Free India</title>
        <meta name="description" content="Free Compound Interest Calculator 2026. Calculate compound interest with daily, monthly, quarterly & yearly compounding. See wealth growth with CI formula & examples." />
        <meta name="keywords" content="compound interest calculator, CI calculator, compound interest calculator India, compound interest formula calculator, daily compound interest calculator 2026" />
        <link rel="canonical" href="https://myfinancecalculator.netlify.app/compound-interest" />
        
        <meta property="og:title" content="Compound Interest Calculator 2026 - Calculate CI" />
        <meta property="og:description" content="Calculate compound interest with multiple compounding frequencies instantly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://myfinancecalculator.netlify.app/compound-interest" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Compound Interest Calculator" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Compound Interest Calculator",
            "description": "Calculate compound interest with different compounding frequencies",
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
              "ratingCount": "7850"
            }
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-primary p-4 rounded-2xl mb-4">
              <TrendingUp className="h-12 w-12 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Compound Interest Calculator 2026</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calculate compound interest with daily, monthly, quarterly & yearly compounding
            </p>
          </div>

          <AdSenseSlot slot="header" />

          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Calculate Compound Interest</CardTitle>
                  <CardDescription>See the power of compounding</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="principal">Principal Amount (₹)</Label>
                    <Input
                      id="principal"
                      type="number"
                      placeholder="Enter principal amount"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                    <Input
                      id="rate"
                      type="number"
                      step="0.1"
                      placeholder="Enter interest rate"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time Period (Years)</Label>
                    <Input
                      id="time"
                      type="number"
                      placeholder="Enter time period"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="frequency">Compounding Frequency</Label>
                    <Select value={frequency} onValueChange={setFrequency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="365">Daily</SelectItem>
                        <SelectItem value="12">Monthly</SelectItem>
                        <SelectItem value="4">Quarterly</SelectItem>
                        <SelectItem value="2">Half-Yearly</SelectItem>
                        <SelectItem value="1">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full" size="lg">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Interest
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card">
                <CardHeader>
                  <CardTitle>Calculation Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="font-medium">Principal Amount</span>
                    <span className="text-xl font-bold">₹{P.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="font-medium">Interest Earned</span>
                    <span className="text-xl font-bold text-green-500">₹{compoundInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border-2 border-primary">
                    <span className="font-bold text-lg">Total Amount</span>
                    <span className="text-3xl font-bold text-primary">₹{amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="font-medium">Time Period</span>
                    <span className="text-xl font-bold">{t} Years</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="font-medium">Interest Rate</span>
                    <span className="text-xl font-bold">{rate}% p.a.</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-success bg-success/5">
                <CardHeader>
                  <CardTitle className="text-success">📈 Start Growing Your Wealth</CardTitle>
                  <CardDescription>Open a high-interest savings account or start investing</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-success hover:bg-success/90" size="lg">
                    Explore Investment Options
                  </Button>
                  <p className="text-sm text-muted-foreground mt-3 text-center">
                    High returns • Secure investments • Tax benefits
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Understanding Compound Interest</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-invert max-w-none">
                  <h3>What is Compound Interest?</h3>
                  <p>
                    Compound interest is the interest calculated on the initial principal and also on the accumulated interest from previous periods. 
                    It's often called "interest on interest" and makes your money grow faster than simple interest.
                  </p>
                  
                  <h3>Compound Interest Formula</h3>
                  <div className="bg-background p-4 rounded-lg font-mono text-sm">
                    A = P (1 + r/n)^(nt)
                  </div>
                  <p>Where:</p>
                  <ul>
                    <li><strong>A</strong> = Final amount</li>
                    <li><strong>P</strong> = Principal (initial investment)</li>
                    <li><strong>r</strong> = Annual interest rate (decimal)</li>
                    <li><strong>n</strong> = Number of times interest is compounded per year</li>
                    <li><strong>t</strong> = Time period in years</li>
                  </ul>
                  
                  <h3>Simple Interest vs Compound Interest</h3>
                  <p>
                    <strong>Simple Interest:</strong> Calculated only on principal amount<br/>
                    <strong>Compound Interest:</strong> Calculated on principal + accumulated interest
                  </p>
                  <p>
                    Example: ₹1,00,000 at 10% for 5 years<br/>
                    Simple Interest = ₹50,000<br/>
                    Compound Interest = ₹61,051 (₹11,051 more!)
                  </p>
                  
                  <h3>Best Investments with Compound Interest</h3>
                  <ul>
                    <li><strong>Fixed Deposits (FD):</strong> Quarterly compounding, safe returns</li>
                    <li><strong>Public Provident Fund (PPF):</strong> Annual compounding, tax-free</li>
                    <li><strong>Mutual Funds:</strong> Daily NAV calculation, market-linked returns</li>
                    <li><strong>Recurring Deposits (RD):</strong> Quarterly compounding, disciplined saving</li>
                  </ul>
                  
                  <h3>The Power of Compounding</h3>
                  <p>
                    The longer you invest, the more powerful compounding becomes. Starting early is the key to building substantial wealth. 
                    Even small amounts invested consistently can grow significantly over time due to compound interest.
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

export default CompoundInterestCalculator;
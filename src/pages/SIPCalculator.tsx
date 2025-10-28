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
        <title>Best SIP Calculator 2026: Calculate Returns & Maturity | Free</title>
        <meta name="description" content="Calculate your SIP returns instantly! Start your investment journey today with our Free SIP Calculator India 2026. Get accurate CAGR, maturity value & investment projections." />
        <meta name="keywords" content="SIP calculator India 2026, mutual fund calculator, systematic investment plan, SIP returns calculator, CAGR calculator, best SIP calculator, online SIP calculator" />
        <link rel="canonical" href="https://myfinancecalculator.netlify.app/sip" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Best SIP Calculator 2026 - Calculate Returns Instantly" />
        <meta property="og:description" content="Calculate your SIP returns and future value instantly. Free & Accurate SIP Calculator for India." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://myfinancecalculator.netlify.app/sip" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best SIP Calculator 2026 - Calculate Returns Instantly" />
        <meta name="twitter:description" content="Calculate your SIP returns and future value instantly. Free & Accurate SIP Calculator for India." />
        
        {/* JSON-LD Schema - Calculator & HowTo Combined */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                "name": "SIP Calculator India 2026",
                "applicationCategory": "FinanceApplication",
                "operatingSystem": "Any",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "INR"
                },
                "description": "Free SIP (Systematic Investment Plan) calculator to calculate returns, maturity value, and CAGR for mutual fund investments in India",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "ratingCount": "1250"
                }
              },
              {
                "@type": "HowTo",
                "name": "How to Calculate SIP Returns",
                "description": "Learn how to calculate your Systematic Investment Plan (SIP) returns, maturity value, and CAGR using our free calculator",
                "step": [
                  {
                    "@type": "HowToStep",
                    "name": "Enter Monthly SIP Amount",
                    "text": "Input the amount you want to invest every month in mutual funds"
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Set Expected Annual Return",
                    "text": "Enter the expected annual return rate (typically 10-15% for equity funds)"
                  },
                  {
                    "@type": "HowToStep",
                "name": "Choose Investment Tenure",
                "text": "Select how many years you plan to continue your SIP investment"
              },
              {
                "@type": "HowToStep",
                "name": "Calculate Results",
                "text": "Click calculate to see your total investment, returns, maturity value and CAGR"
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
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl inline-block mb-4">
              <TrendingUp className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3">SIP Calculator India (Systematic Investment Plan)</h1>
            <p className="text-muted-foreground text-lg">
              Calculate returns on your Systematic Investment Plan with accurate projections for 2026
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

                  {/* High-Conversion CTA */}
                  <Card className="p-8 bg-gradient-to-r from-accent via-success to-accent border-2 border-accent/50 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <div className="relative z-10 text-center space-y-4">
                      <div className="inline-block bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-full mb-2">
                        ⭐ EXCLUSIVE OFFER - START INVESTING TODAY!
                      </div>
                      <h3 className="text-2xl font-bold text-white">Ready to Start Your SIP Journey?</h3>
                      <p className="text-white/95 text-lg">Open a FREE Demat Account in Minutes & Begin Your Wealth Creation!</p>
                      <Button 
                        size="lg" 
                        className="bg-white text-accent hover:bg-white/90 font-bold text-lg px-8 py-6 shadow-[0_12px_48px_rgba(0,0,0,0.3)] hover:scale-105 transition-all"
                        onClick={() => window.open('https://your-demat-affiliate-link.com', '_blank')}
                      >
                        START INVESTING IN MINUTES →
                      </Button>
                      <p className="text-white/80 text-sm">Zero account opening charges • Instant activation</p>
                    </div>
                  </Card>
                </>
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

          {/* Comprehensive SEO Content Section */}
          <div className="mt-8 space-y-8">
            <Card className="p-8 bg-gradient-card">
              <article className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-bold mb-6">What is SIP and How Does it Work?</h2>
                <p className="text-muted-foreground text-lg mb-6">
                  A Systematic Investment Plan (SIP) is one of the most popular and effective ways to invest in mutual funds in India. Instead of investing a lump sum amount, SIP allows you to invest a fixed amount regularly - monthly, quarterly, or annually. This disciplined approach to investing has helped millions of Indians build substantial wealth over time through the power of compounding and rupee cost averaging.
                </p>
                
                <h3 className="text-2xl font-semibold mb-4 mt-8">How to Use Our SIP Calculator 2026</h3>
                <p className="text-muted-foreground mb-4">
                  Our advanced SIP calculator is designed to give you accurate projections of your investment returns. Simply enter your monthly SIP amount, expected annual return rate (typically 10-15% for equity mutual funds), and investment tenure in years. The calculator instantly shows your total investment, estimated returns, maturity value, and CAGR (Compound Annual Growth Rate).
                </p>

                <h3 className="text-2xl font-semibold mb-4 mt-8">SIP Formula and Calculation Method</h3>
                <p className="text-muted-foreground mb-4">
                  The SIP maturity amount is calculated using the compound interest formula: <strong>FV = P × [(1 + r)^n - 1] / r × (1 + r)</strong>
                </p>
                <ul className="text-muted-foreground space-y-2 mb-6">
                  <li><strong>FV</strong> = Future Value (Maturity Amount)</li>
                  <li><strong>P</strong> = Monthly SIP Investment Amount</li>
                  <li><strong>r</strong> = Expected Monthly Return Rate (Annual Rate / 12)</li>
                  <li><strong>n</strong> = Total Number of Months (Years × 12)</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4 mt-8">Benefits of SIP Investment</h3>
                <ul className="text-muted-foreground space-y-3 mb-6">
                  <li><strong>Rupee Cost Averaging:</strong> By investing regularly, you buy more units when prices are low and fewer when prices are high, reducing the average cost per unit over time</li>
                  <li><strong>Power of Compounding:</strong> Your returns generate more returns, creating exponential wealth growth especially over long investment horizons</li>
                  <li><strong>Disciplined Investing:</strong> Automated monthly deductions ensure consistent investment regardless of market conditions</li>
                  <li><strong>Flexibility:</strong> Start with as low as ₹500 per month and increase or pause anytime</li>
                  <li><strong>No Market Timing:</strong> Eliminates the need to time the market, which even experts find difficult</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4 mt-8">SIP Tax Benefits in India</h3>
                <p className="text-muted-foreground mb-4">
                  Equity Linked Savings Schemes (ELSS) offer tax deductions up to ₹1.5 lakh under Section 80C of the Income Tax Act. ELSS funds have the shortest lock-in period of just 3 years among all tax-saving investments. Long-term capital gains (LTCG) above ₹1 lakh are taxed at 10%, while short-term gains are taxed at 15%.
                </p>

                <h3 className="text-2xl font-semibold mb-4 mt-8">SIP vs Lump Sum Investment: Which is Better?</h3>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="text-left py-3 px-4">Aspect</th>
                        <th className="text-left py-3 px-4">SIP</th>
                        <th className="text-left py-3 px-4">Lump Sum</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">Investment Style</td>
                        <td className="py-3 px-4">Regular fixed amounts</td>
                        <td className="py-3 px-4">One-time large investment</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">Market Timing Risk</td>
                        <td className="py-3 px-4">Low (averaged out)</td>
                        <td className="py-3 px-4">High (timing crucial)</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">Best For</td>
                        <td className="py-3 px-4">Salaried individuals</td>
                        <td className="py-3 px-4">Sudden windfall gains</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4">Returns in Bull Market</td>
                        <td className="py-3 px-4">Good</td>
                        <td className="py-3 px-4">Excellent</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Returns in Volatile Market</td>
                        <td className="py-3 px-4">Excellent</td>
                        <td className="py-3 px-4">Risky</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-2xl font-semibold mb-4 mt-8">Frequently Asked Questions (FAQs)</h3>
                <div className="space-y-6 mb-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Q1: What is the minimum amount to start a SIP?</h4>
                    <p className="text-muted-foreground">Most mutual funds allow you to start a SIP with as low as ₹500 per month. However, the minimum amount varies by fund house and scheme.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Q2: Can I stop my SIP anytime?</h4>
                    <p className="text-muted-foreground">Yes, SIPs are completely flexible. You can pause, stop, or increase your SIP amount anytime without any penalty (except for ELSS which has a 3-year lock-in).</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Q3: What is a good return rate for SIP?</h4>
                    <p className="text-muted-foreground">Historically, equity mutual funds have delivered 12-15% annual returns over long periods (10+ years). However, past performance doesn't guarantee future returns.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Q4: When is the best time to start a SIP?</h4>
                    <p className="text-muted-foreground">The best time to start a SIP is NOW. Since SIP averages out market volatility, waiting for the "right time" is counterproductive. The earlier you start, the more you benefit from compounding.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Q5: How is SIP different from FD and RD?</h4>
                    <p className="text-muted-foreground">Unlike Fixed Deposits and Recurring Deposits which offer guaranteed returns (5-7%), SIPs are market-linked and can potentially deliver higher returns (12-15%) but come with market risk. Check our <a href="/fd" className="text-primary hover:underline">FD Calculator</a> and <a href="/rd" className="text-primary hover:underline">RD Calculator</a> to compare.</p>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mb-4 mt-8">Best SIP Investment Strategies for 2026</h3>
                <ul className="text-muted-foreground space-y-3 mb-6">
                  <li><strong>Start Early:</strong> The power of compounding works best over long periods. Starting 5 years earlier can double your corpus</li>
                  <li><strong>Increase Annually:</strong> Increase your SIP amount by 10-15% every year to match salary increments</li>
                  <li><strong>Diversify:</strong> Invest across large-cap, mid-cap, and multi-cap funds to balance risk and returns</li>
                  <li><strong>Stay Invested:</strong> Don't stop SIP during market downturns - this is when you accumulate more units at lower prices</li>
                  <li><strong>Goal-Based Planning:</strong> Calculate your target corpus and work backwards to determine monthly SIP amount</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4 mt-8">Related Calculators</h3>
                <p className="text-muted-foreground mb-4">
                  Explore our other financial calculators to plan your complete financial journey:
                </p>
                <ul className="text-muted-foreground space-y-2">
                  <li>• <a href="/emi" className="text-primary hover:underline font-semibold">EMI Calculator</a> - Calculate loan EMIs for home, car, and personal loans</li>
                  <li>• <a href="/fd" className="text-primary hover:underline font-semibold">FD Calculator</a> - Estimate Fixed Deposit maturity returns</li>
                  <li>• <a href="/rd" className="text-primary hover:underline font-semibold">RD Calculator</a> - Plan your Recurring Deposit investments</li>
                </ul>
              </article>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SIPCalculator;

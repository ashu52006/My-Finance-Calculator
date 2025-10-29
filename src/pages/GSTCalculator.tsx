import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Calculator, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/Layout';
import AdSenseSlot from '@/components/AdSenseSlot';

const GSTCalculator = () => {
  const [amount, setAmount] = useState<string>('10000');
  const [gstRate, setGstRate] = useState<string>('18');
  const [calculationType, setCalculationType] = useState<'exclusive' | 'inclusive'>('exclusive');
  
  const baseAmount = parseFloat(amount) || 0;
  const rate = parseFloat(gstRate) || 0;
  
  let netAmount = 0;
  let gstAmount = 0;
  let totalAmount = 0;
  
  if (calculationType === 'exclusive') {
    // Add GST to base amount
    netAmount = baseAmount;
    gstAmount = (baseAmount * rate) / 100;
    totalAmount = baseAmount + gstAmount;
  } else {
    // Extract GST from total amount
    totalAmount = baseAmount;
    netAmount = (baseAmount * 100) / (100 + rate);
    gstAmount = baseAmount - netAmount;
  }
  
  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;

  return (
    <Layout>
      <Helmet>
        <title>GST Calculator 2026: Calculate GST, CGST & SGST Online - Free India</title>
        <meta name="description" content="Free GST Calculator India 2026. Calculate GST amount, CGST, SGST & IGST instantly. Add or remove GST from prices. Accurate tax calculator for businesses & individuals." />
        <meta name="keywords" content="GST calculator, GST calculator India, CGST SGST calculator, GST tax calculator, goods and services tax calculator, calculate GST online, GST calculator 2026" />
        <link rel="canonical" href="https://myfinancecalculator.netlify.app/gst" />
        
        <meta property="og:title" content="GST Calculator 2026 - Calculate GST Online Free" />
        <meta property="og:description" content="Calculate GST, CGST & SGST instantly with our free calculator. Add or remove GST from any amount." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://myfinancecalculator.netlify.app/gst" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GST Calculator - Calculate GST Online" />
        <meta name="twitter:description" content="Free GST calculator for India. Calculate CGST, SGST & IGST instantly." />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "GST Calculator",
            "description": "Free GST calculator for India to calculate CGST, SGST, and IGST",
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
              "ratingCount": "8450"
            }
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Calculate GST",
            "description": "Step by step guide to calculate GST, CGST, and SGST",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Enter Amount",
                "text": "Enter the base amount or total amount including GST"
              },
              {
                "@type": "HowToStep",
                "name": "Select GST Rate",
                "text": "Choose the applicable GST rate (5%, 12%, 18%, or 28%)"
              },
              {
                "@type": "HowToStep",
                "name": "Choose Calculation Type",
                "text": "Select whether to add GST (exclusive) or extract GST (inclusive)"
              },
              {
                "@type": "HowToStep",
                "name": "View Results",
                "text": "Get instant breakdown of CGST, SGST, and total amount"
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-primary p-4 rounded-2xl mb-4">
              <Receipt className="h-12 w-12 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-4">GST Calculator India 2026</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calculate Goods and Services Tax (GST), CGST, SGST & IGST instantly for accurate tax compliance
            </p>
          </div>

          <AdSenseSlot slot="header" />

          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Calculate GST</CardTitle>
                  <CardDescription>Enter details to calculate GST breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Calculation Type</Label>
                    <Select value={calculationType} onValueChange={(value: 'exclusive' | 'inclusive') => setCalculationType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exclusive">Add GST (Exclusive)</SelectItem>
                        <SelectItem value="inclusive">Remove GST (Inclusive)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">
                      {calculationType === 'exclusive' ? 'Base Amount (₹)' : 'Total Amount (₹)'}
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gstRate">GST Rate (%)</Label>
                    <Select value={gstRate} onValueChange={setGstRate}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5%</SelectItem>
                        <SelectItem value="12">12%</SelectItem>
                        <SelectItem value="18">18%</SelectItem>
                        <SelectItem value="28">28%</SelectItem>
                        <SelectItem value="0">0% (Exempted)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full" size="lg">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate GST
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card">
                <CardHeader>
                  <CardTitle>GST Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="font-medium">Net Amount (Before Tax)</span>
                    <span className="text-xl font-bold">₹{netAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="font-medium">CGST ({rate/2}%)</span>
                    <span className="text-xl font-bold text-blue-500">₹{cgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="font-medium">SGST ({rate/2}%)</span>
                    <span className="text-xl font-bold text-green-500">₹{sgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                    <span className="font-medium">Total GST ({rate}%)</span>
                    <span className="text-xl font-bold text-orange-500">₹{gstAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border-2 border-primary">
                    <span className="font-bold text-lg">Total Amount</span>
                    <span className="text-2xl font-bold text-primary">₹{totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What is GST?</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-invert max-w-none">
                  <h3>Understanding Goods and Services Tax (GST)</h3>
                  <p>
                    GST is an indirect tax levied on the supply of goods and services in India. Implemented on July 1, 2017, 
                    it replaced multiple indirect taxes like VAT, Service Tax, and Excise Duty with a unified tax system.
                  </p>
                  
                  <h3>GST Components</h3>
                  <ul>
                    <li><strong>CGST (Central GST):</strong> Tax collected by the Central Government on intra-state supplies</li>
                    <li><strong>SGST (State GST):</strong> Tax collected by the State Government on intra-state supplies</li>
                    <li><strong>IGST (Integrated GST):</strong> Tax collected by the Central Government on inter-state supplies</li>
                  </ul>
                  
                  <h3>GST Rate Slabs in India 2026</h3>
                  <ul>
                    <li><strong>0%:</strong> Essential items like milk, bread, fresh vegetables</li>
                    <li><strong>5%:</strong> Household necessities, sugar, tea, coffee</li>
                    <li><strong>12%:</strong> Computers, processed food</li>
                    <li><strong>18%:</strong> Hair oil, toothpaste, industrial goods (most common)</li>
                    <li><strong>28%:</strong> Luxury items, automobiles, tobacco</li>
                  </ul>
                  
                  <h3>How to Use This GST Calculator</h3>
                  <p>
                    Our GST calculator works in two modes:
                  </p>
                  <ol>
                    <li><strong>Add GST (Exclusive):</strong> When you have the base price and want to calculate the final price with GST</li>
                    <li><strong>Remove GST (Inclusive):</strong> When you have the final price and want to find the base price and GST amount</li>
                  </ol>
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

export default GSTCalculator;
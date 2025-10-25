import { Link } from 'react-router-dom';
import { Calculator, TrendingUp, PiggyBank, Wallet, CreditCard, Crown, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Layout from '@/components/Layout';
import AffiliateButton from '@/components/AffiliateButton';
import AdSenseSlot from '@/components/AdSenseSlot';
import { getAffiliateLinks } from '@/utils/affiliate';
import { Helmet } from 'react-helmet';

const Index = () => {
  const affiliateLinks = getAffiliateLinks();
  const bannerLink = affiliateLinks.find(link => link.placement === 'banner' && link.status === 'active');
  const sidebarLink = affiliateLinks.find(link => link.placement === 'sidebar' && link.status === 'active');

  const calculators = [
    {
      icon: TrendingUp,
      title: 'SIP Calculator',
      description: 'Calculate returns on your Systematic Investment Plan with compound interest',
      path: '/sip',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: CreditCard,
      title: 'EMI Calculator',
      description: 'Compute your monthly loan EMI and total interest payable',
      path: '/emi',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: PiggyBank,
      title: 'FD Calculator',
      description: 'Estimate maturity amount on Fixed Deposit investments',
      path: '/fd',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Wallet,
      title: 'RD Calculator',
      description: 'Calculate returns on Recurring Deposit schemes',
      path: '/rd',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const features = [
    'Instant results with accurate calculations',
    'Free to use, no hidden charges',
    'Mobile-friendly responsive design',
    'Export results as PDF (Premium)',
    'Visual charts and graphs (Premium)',
    'Historical data tracking (Premium)'
  ];

  return (
    <Layout>
      <Helmet>
        <title>My Finance Calculator - Free SIP, EMI, FD & RD Calculators India 2025</title>
        <meta name="description" content="Free online financial calculators for India. Calculate SIP returns, EMI payments, FD maturity, and RD investments instantly. Accurate, fast, and SEO-optimized for 2025." />
        <meta name="keywords" content="SIP calculator India, EMI calculator, FD calculator, RD calculator, financial calculator, investment calculator 2025" />
        <link rel="canonical" href="https://myfinancecalculator.netlify.app/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="My Finance Calculator - Free Financial Calculators India" />
        <meta property="og:description" content="Calculate SIP returns, EMI, FD maturity & RD investments with our free calculators." />
        <meta property="og:type" content="website" />
        
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "My Finance Calculator",
            "applicationCategory": "FinanceApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "description": "Free financial calculators for SIP, EMI, FD, and RD calculations in India"
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-block">
            <div className="bg-gradient-primary p-4 rounded-2xl inline-block shadow-glow">
              <Calculator className="h-16 w-16 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold">
            Smart Financial Calculators for{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Better Decisions
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Calculate SIP returns, EMI payments, FD maturity, and RD investments with our free, accurate, and instant calculators. Make informed financial decisions in 2025.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/sip">
              <Button size="lg" className="gap-2 bg-gradient-primary">
                Start Calculating
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/subscription">
              <Button size="lg" variant="outline" className="gap-2">
                <Crown className="h-4 w-4" />
                View Premium Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AdSense Header */}
      <div className="container mx-auto px-4 mb-8">
        <AdSenseSlot slot="header" />
      </div>

      {/* Banner Affiliate */}
      {bannerLink && (
        <div className="container mx-auto px-4 mb-12">
          <AffiliateButton
            id={bannerLink.id}
            ctaText={bannerLink.ctaText}
            referralLink={bannerLink.referralLink}
            placement="banner"
            partnerName={bannerLink.partnerName}
          />
        </div>
      )}

      {/* Calculators Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-8">Our Financial Calculators</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {calculators.map((calc) => {
                const Icon = calc.icon;
                return (
                  <Link key={calc.path} to={calc.path}>
                    <Card className="p-6 hover:shadow-glow transition-all bg-gradient-card group cursor-pointer h-full">
                      <div className={`bg-gradient-to-br ${calc.color} p-3 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{calc.title}</h3>
                      <p className="text-muted-foreground mb-4">{calc.description}</p>
                      <div className="flex items-center text-primary">
                        <span className="text-sm font-medium">Calculate Now</span>
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {sidebarLink && (
              <AffiliateButton
                id={sidebarLink.id}
                ctaText={sidebarLink.ctaText}
                referralLink={sidebarLink.referralLink}
                placement="banner"
                partnerName={sidebarLink.partnerName}
              />
            )}
            <AdSenseSlot slot="sidebar" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <Card className="p-8 bg-gradient-card">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Choose My Finance Calculator?</h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* SEO Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="prose prose-invert max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">About My Finance Calculator</h2>
          <p className="text-muted-foreground mb-4">
            My Finance Calculator is India's leading platform for free financial calculators. Whether you're planning investments through SIP, taking a loan and need EMI calculations, or exploring Fixed Deposit and Recurring Deposit options, our calculators provide instant, accurate results.
          </p>
          <h3 className="text-xl font-semibold mb-3">SIP Calculator India 2025</h3>
          <p className="text-muted-foreground mb-4">
            Our SIP (Systematic Investment Plan) calculator helps you estimate potential returns on mutual fund investments. Input your monthly SIP amount, expected annual return rate, and investment tenure to see projected corpus with CAGR calculations.
          </p>
          <h3 className="text-xl font-semibold mb-3">EMI Calculator for Home & Personal Loans</h3>
          <p className="text-muted-foreground mb-4">
            Calculate your Equated Monthly Installment (EMI) for home loans, car loans, or personal loans. Our EMI calculator shows monthly payment amount, total interest, and complete amortization schedule.
          </p>
          <h3 className="text-xl font-semibold mb-3">FD & RD Calculators</h3>
          <p className="text-muted-foreground">
            Compare Fixed Deposit returns across different banks and tenure options. Our RD calculator helps you plan recurring deposits with accurate maturity value projections including compound interest calculations.
          </p>
        </div>
      </section>

      {/* Footer AdSense */}
      <div className="container mx-auto px-4 mb-8">
        <AdSenseSlot slot="footer" />
      </div>
    </Layout>
  );
};

export default Index;

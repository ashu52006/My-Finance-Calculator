import { Link } from 'react-router-dom';
import { Calculator, TrendingUp, PiggyBank, Wallet, CreditCard, Crown, ArrowRight, CheckCircle, Receipt, FileText, Home, Shield, BadgeIndianRupee, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Layout from '@/components/Layout';
import AffiliateButton from '@/components/AffiliateButton';
import AdSenseSlot from '@/components/AdSenseSlot';
import { getAffiliateLinks } from '@/utils/affiliate';
import { Helmet } from 'react-helmet';

const Index = () => {
  const affiliateLinks = getAffiliateLinks();
  const bannerLinks = affiliateLinks.filter(link => link.placement === 'banner' && link.status === 'active' && link.calculatorPage === 'general');
  const cardLinks = affiliateLinks.filter(link => (link.placement === 'tertiary-card' || link.placement === 'secondary-card') && link.status === 'active' && link.calculatorPage === 'general');
  const buttonLinks = affiliateLinks.filter(link => (link.placement === 'primary-button' || link.placement === 'secondary-button') && link.status === 'active' && link.calculatorPage === 'general');
  const sidebarLinks = affiliateLinks.filter(link => link.placement === 'sidebar' && link.status === 'active' && link.calculatorPage === 'general');
  const contentLinks = affiliateLinks.filter(link => link.placement === 'content-link' && link.status === 'active' && link.calculatorPage === 'general');

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
    },
    {
      icon: Receipt,
      title: 'GST Calculator',
      description: 'Calculate GST, CGST, SGST and IGST for accurate tax compliance',
      path: '/gst',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: FileText,
      title: 'Income Tax Calculator',
      description: 'Calculate income tax for FY 2025-26 with old & new regime',
      path: '/income-tax',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Home,
      title: 'Home Loan Calculator',
      description: 'Calculate home loan EMI and total interest payable',
      path: '/home-loan',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'PPF Calculator',
      description: 'Calculate Public Provident Fund maturity and returns',
      path: '/ppf',
      color: 'from-emerald-500 to-green-500'
    },
    {
      icon: BadgeIndianRupee,
      title: 'Personal Loan Calculator',
      description: 'Calculate personal loan EMI and compare best rates',
      path: '/personal-loan',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: BarChart3,
      title: 'Compound Interest Calculator',
      description: 'Calculate compound interest with various compounding frequencies',
      path: '/compound-interest',
      color: 'from-violet-500 to-purple-500'
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
        <title>Finance Calculator 2026: Free SIP, EMI, FD, RD, GST, Income Tax Calculator India</title>
        <meta name="description" content="Free financial calculators India 2026. Calculate SIP, EMI, FD, RD, GST, Income Tax, Home Loan, PPF, Personal Loan & Compound Interest instantly. Accurate tools for smart decisions." />
        <meta name="keywords" content="finance calculator India 2026, SIP calculator, EMI calculator, FD calculator, RD calculator, GST calculator, income tax calculator, home loan calculator, PPF calculator, personal loan calculator, compound interest calculator" />
        <meta name="google-site-verification" content="zs10Rr2HXxcXcN9E5IYGpjpuVdhI6NiFeIleNawF9Yc" />
        <link rel="canonical" href="https://myfinancecalculator.netlify.app/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Finance Calculator 2026 - Free Financial Calculators India" />
        <meta property="og:description" content="Calculate SIP returns, EMI, FD maturity & RD investments with our free calculators." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://myfinancecalculator.netlify.app/" />
        <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@lovable_dev" />
        <meta name="twitter:title" content="Finance Calculator 2026 - Free Financial Calculators" />
        <meta name="twitter:description" content="Calculate SIP returns, EMI, FD & RD investments instantly." />
        <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
        
        {/* JSON-LD Schema - Website & Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "name": "My Finance Calculator",
                "url": "https://myfinancecalculator.netlify.app/",
                "description": "Free financial calculators for SIP, EMI, FD, and RD calculations in India",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://myfinancecalculator.netlify.app/?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@type": "WebApplication",
            "name": "My Finance Calculator",
            "applicationCategory": "FinanceApplication",
                "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
                "description": "Free financial calculators for SIP, EMI, FD, and RD calculations in India",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "ratingCount": "5230"
                }
              }
            ]
          })}
        </script>
        
        {/* BreadcrumbList Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://myfinancecalculator.netlify.app/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "SIP Calculator",
                "item": "https://myfinancecalculator.netlify.app/sip"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "EMI Calculator",
                "item": "https://myfinancecalculator.netlify.app/emi"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "FD Calculator",
                "item": "https://myfinancecalculator.netlify.app/fd"
              },
              {
                "@type": "ListItem",
                "position": 5,
                "name": "RD Calculator",
                "item": "https://myfinancecalculator.netlify.app/rd"
              }
            ]
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
            Calculate SIP, EMI, FD, RD, GST, Income Tax, Home Loan, PPF, Personal Loan & Compound Interest with our free calculators. Make informed financial decisions in 2026.
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

      {/* Banner Affiliates */}
      {bannerLinks.length > 0 && (
        <div className="container mx-auto px-4 mb-12 space-y-6">
          {bannerLinks.map(link => (
            <AffiliateButton
              key={link.id}
              id={link.id}
              ctaText={link.ctaText}
              referralLink={link.referralLink}
              placement="banner"
              partnerName={link.partnerName}
            />
          ))}
        </div>
      )}

      {/* Featured Partner Offers - Card Grid */}
      {(cardLinks.length > 0 || buttonLinks.length > 0 || contentLinks.length > 0) && (
        <section className="container mx-auto px-4 py-12 bg-gradient-to-br from-accent/5 to-success/5 rounded-3xl mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">
              🎁 Exclusive Partner Offers
            </h2>
            <p className="text-muted-foreground text-lg">
              Special deals from our trusted financial partners
            </p>
          </div>
          
          {/* Button Links */}
          {buttonLinks.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
              {buttonLinks.map(link => (
                <AffiliateButton
                  key={link.id}
                  id={link.id}
                  ctaText={link.ctaText}
                  referralLink={link.referralLink}
                  placement={link.placement}
                  partnerName={link.partnerName}
                />
              ))}
            </div>
          )}

          {/* Card Links */}
          {cardLinks.length > 0 && (
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {cardLinks.map(link => (
                <AffiliateButton
                  key={link.id}
                  id={link.id}
                  ctaText={link.ctaText}
                  referralLink={link.referralLink}
                  placement={link.placement}
                  partnerName={link.partnerName}
                />
              ))}
            </div>
          )}

          {/* Content Links */}
          {contentLinks.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4">
              {contentLinks.map(link => (
                <AffiliateButton
                  key={link.id}
                  id={link.id}
                  ctaText={link.ctaText}
                  referralLink={link.referralLink}
                  placement={link.placement}
                  partnerName={link.partnerName}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Calculators Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-8">Our Financial Calculators</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="sticky top-4 space-y-6">
              <h3 className="text-xl font-bold">⭐ Top Picks</h3>
              {sidebarLinks.map(link => (
                <AffiliateButton
                  key={link.id}
                  id={link.id}
                  ctaText={link.ctaText}
                  referralLink={link.referralLink}
                  placement="banner"
                  partnerName={link.partnerName}
                />
              ))}
              <AdSenseSlot slot="sidebar" />
            </div>
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

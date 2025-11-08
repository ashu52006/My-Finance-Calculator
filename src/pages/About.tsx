import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Target, Users, TrendingUp, Shield, Zap } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <Helmet>
        <title>About Us - CalcGenius Financial Calculators</title>
        <meta name="description" content="Learn about CalcGenius, our mission to simplify financial planning, and how we help thousands of users make informed financial decisions." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            About CalcGenius
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Empowering financial decisions through accurate calculations and insights
          </p>
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-gradient-primary text-primary-foreground">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <Target className="h-12 w-12" />
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg opacity-90">
                At CalcGenius, our mission is to democratize financial planning by providing 
                free, accurate, and easy-to-use financial calculators. We believe everyone 
                deserves access to tools that help them make informed financial decisions, 
                whether it's planning investments, calculating loans, or understanding tax implications.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Our Story</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="mb-4">
              CalcGenius was founded with a simple idea: financial planning shouldn't be complicated. 
              We noticed that many people struggle with basic financial calculations and often make 
              decisions without fully understanding the numbers behind them.
            </p>
            <p className="mb-4">
              Our founder, Shaik Ashraf Ahmed, experienced firsthand the challenges of navigating 
              complex financial calculations. This inspired the creation of CalcGenius – a platform 
              that makes financial mathematics accessible to everyone, regardless of their background 
              or expertise.
            </p>
            <p>
              Today, we serve thousands of users who rely on our calculators for everything from 
              planning their retirement savings to understanding loan EMIs. We're proud to be a 
              trusted resource in the Indian financial planning landscape.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Accuracy</h3>
                <p className="text-muted-foreground">
                  We ensure all our calculators use precise formulas and are regularly updated 
                  to reflect current financial regulations and standards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">User-Centric</h3>
                <p className="text-muted-foreground">
                  Every feature we build is designed with our users in mind. We focus on 
                  simplicity, clarity, and providing actionable insights.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Privacy</h3>
                <p className="text-muted-foreground">
                  Your financial data is yours alone. All calculations are performed locally 
                  in your browser, ensuring your information stays private.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Growth</h3>
                <p className="text-muted-foreground">
                  We're constantly evolving, adding new calculators and features based on 
                  user feedback and emerging financial trends.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Simplicity</h3>
                <p className="text-muted-foreground">
                  Complex calculations made simple. We break down complicated financial 
                  concepts into easy-to-understand results.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Transparency</h3>
                <p className="text-muted-foreground">
                  We show you exactly how we arrive at each calculation, helping you 
                  understand the methodology behind the numbers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* What We Offer */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Free Calculators</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• SIP (Systematic Investment Plan) Calculator</li>
                  <li>• EMI (Equated Monthly Installment) Calculator</li>
                  <li>• Fixed Deposit Calculator</li>
                  <li>• Recurring Deposit Calculator</li>
                  <li>• GST Calculator</li>
                  <li>• Income Tax Calculator</li>
                  <li>• Home Loan Calculator</li>
                  <li>• PPF Calculator</li>
                  <li>• Personal Loan Calculator</li>
                  <li>• Compound Interest Calculator</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Premium Features</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Ad-free experience</li>
                  <li>• Advanced charts & visualizations</li>
                  <li>• Downloadable PDF reports</li>
                  <li>• Detailed analytics dashboard</li>
                  <li>• Custom calculations</li>
                  <li>• Priority support</li>
                  <li>• Investment recommendations</li>
                  <li>• Financial insights</li>
                  <li>• Portfolio analysis</li>
                  <li>• Tax planning guidance</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Meet Our Team</h2>
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-gradient-primary w-24 h-24 rounded-full flex items-center justify-center text-primary-foreground text-3xl font-bold">
                  SA
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">Shaik Ashraf Ahmed</h3>
                  <p className="text-lg text-primary mb-3">Founder & Developer</p>
                  <p className="text-muted-foreground">
                    Passionate about making financial planning accessible to everyone. With a background 
                    in technology and finance, Ashraf built CalcGenius to help people make better 
                    financial decisions through accurate calculations and clear insights.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-muted">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Join Thousands of Smart Financial Planners</h2>
              <p className="text-muted-foreground mb-6">
                Start using our free calculators today and take control of your financial future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/">
                  <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
                    Try Our Calculators
                  </button>
                </a>
                <a href="/contact">
                  <button className="px-6 py-3 bg-background border border-border rounded-lg font-semibold hover:bg-muted transition-colors">
                    Contact Us
                  </button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default About;

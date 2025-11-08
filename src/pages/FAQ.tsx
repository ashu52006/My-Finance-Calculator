import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const FAQ = () => {
  return (
    <Layout>
      <Helmet>
        <title>Frequently Asked Questions - CalcGenius</title>
        <meta name="description" content="Find answers to common questions about CalcGenius financial calculators, premium features, subscriptions, and how to use our tools effectively." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about CalcGenius
            </p>
          </div>

          {/* General Questions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">General Questions</h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  What is CalcGenius?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  CalcGenius is a comprehensive financial calculator platform that helps you make informed 
                  financial decisions. We offer a wide range of calculators for SIP, EMI, FD, RD, GST, 
                  Income Tax, and more – all designed to be accurate, easy to use, and completely free.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Are the calculators really free?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! All our basic calculators are completely free to use with no hidden costs. 
                  We also offer premium features like ad-free experience, advanced charts, and downloadable 
                  reports through our subscription plans, but the core calculator functionality is always free.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Is my financial data safe?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Absolutely! All calculations are performed locally in your browser. We don't store 
                  or transmit your financial data to our servers unless you create an account. Your 
                  privacy and data security are our top priorities.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Do I need to create an account to use the calculators?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No, you can use all our calculators without creating an account. However, creating 
                  an account allows you to save your calculations, access premium features, and sync 
                  your data across devices.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Calculator Questions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Calculator Questions</h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="calc-1" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  How accurate are the calculations?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Our calculators use industry-standard formulas and are regularly updated to ensure 
                  accuracy. However, please note that these are estimates and actual results may vary 
                  based on market conditions, fees, and other factors. Always consult with a financial 
                  advisor for personalized advice.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="calc-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  What is a SIP Calculator and how do I use it?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  A SIP (Systematic Investment Plan) Calculator helps you estimate returns from regular 
                  mutual fund investments. Simply enter your monthly investment amount, expected annual 
                  return rate, and investment duration to see projected returns and wealth accumulation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="calc-3" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  How does the EMI Calculator work?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The EMI Calculator determines your monthly loan payment based on the principal amount, 
                  interest rate, and loan tenure. It shows you the breakup of principal and interest 
                  components, helping you plan your loan repayment effectively.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="calc-4" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Can I save my calculations?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! With a premium subscription, you can save unlimited calculations, create custom 
                  scenarios, and access your calculation history anytime. Free users can use browser 
                  bookmarks or take screenshots of their results.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="calc-5" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Are the tax calculations up to date with current laws?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, we update our tax calculators regularly to reflect the latest tax laws and slabs. 
                  However, tax rules can be complex, and we recommend consulting with a tax professional 
                  for specific situations or complex returns.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Subscription Questions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Subscription & Premium Features</h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="sub-1" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  What are the benefits of a premium subscription?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Premium subscribers get an ad-free experience, advanced charts and visualizations, 
                  downloadable PDF reports, detailed analytics dashboard, custom calculations, priority 
                  support, investment recommendations, and exclusive financial insights.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="sub-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  How much does a premium subscription cost?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We offer flexible subscription plans starting from ₹199/month for Basic, ₹499 for 
                  3 months Standard (most popular), ₹999 for 6 months Premium, and ₹1,799 for 12 months 
                  Ultimate plan. Check our Subscription page for detailed pricing and features.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="sub-3" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Can I cancel my subscription anytime?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, you can cancel your subscription at any time. You'll continue to have access 
                  to premium features until the end of your current billing period. No refunds are 
                  provided for partial periods.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="sub-4" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  What payment methods do you accept?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We accept all major payment methods through Razorpay, including credit cards, debit 
                  cards, net banking, UPI, and popular digital wallets. All transactions are secure 
                  and encrypted.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="sub-5" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Is there a free trial available?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Currently, we don't offer a free trial for premium features. However, all our basic 
                  calculators are free to use indefinitely, so you can get a good sense of our platform 
                  before upgrading.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Technical Questions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Technical Support</h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="tech-1" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Which browsers are supported?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  CalcGenius works on all modern browsers including Chrome, Firefox, Safari, and Edge. 
                  For the best experience, we recommend using the latest version of your preferred browser.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tech-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Is there a mobile app available?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Currently, we offer a mobile-responsive website that works great on all devices. 
                  A dedicated mobile app is in our roadmap and will be available soon. You can bookmark 
                  our website on your mobile device for quick access.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tech-3" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  I'm having technical issues. How can I get help?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Please contact our support team through the Contact page. Premium subscribers get 
                  priority support. Try clearing your browser cache first, as this resolves most common 
                  issues.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tech-4" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Can I use CalcGenius offline?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Currently, CalcGenius requires an internet connection to load. Once loaded, the 
                  calculations are performed locally in your browser and don't require continuous 
                  internet access.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Contact Card */}
          <Card className="bg-primary/5">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">
                Can't find the answer you're looking for? Our support team is here to help!
              </p>
              <a href="/contact">
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  Contact Support
                </button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;

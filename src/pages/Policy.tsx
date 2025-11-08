import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import { Separator } from "@/components/ui/separator";

const Policy = () => {
  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy & Terms of Service - CalcGenius</title>
        <meta name="description" content="Read our privacy policy and terms of service to understand how we protect your data and the terms governing your use of CalcGenius financial calculators." />
      </Helmet>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Privacy Policy & Terms of Service</h1>
        
        {/* Privacy Policy Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Privacy Policy</h2>
          <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-6 text-foreground">
            <div>
              <h3 className="text-xl font-semibold mb-3">1. Information We Collect</h3>
              <p className="text-muted-foreground">
                We collect information that you provide directly to us, including when you use our calculators, 
                subscribe to our services, or contact us for support. This may include your name, email address, 
                and payment information for premium subscriptions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">2. How We Use Your Information</h3>
              <p className="text-muted-foreground mb-2">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process your transactions and send related information</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns to improve user experience</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">3. Data Storage and Security</h3>
              <p className="text-muted-foreground">
                Your calculation data is stored locally in your browser and is not transmitted to our servers 
                unless you create an account. We implement appropriate security measures to protect your 
                personal information from unauthorized access, alteration, or destruction.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">4. Cookies and Tracking</h3>
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to track activity on our service and hold 
                certain information. You can instruct your browser to refuse all cookies or to indicate when 
                a cookie is being sent.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">5. Third-Party Services</h3>
              <p className="text-muted-foreground">
                We may use third-party service providers to help us operate our service, including payment 
                processors and analytics services. These third parties have access to your information only 
                to perform specific tasks on our behalf and are obligated not to disclose or use it for other purposes.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">6. Your Rights</h3>
              <p className="text-muted-foreground">
                You have the right to access, update, or delete your personal information at any time. 
                You can also opt-out of marketing communications and request data portability.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">7. Children's Privacy</h3>
              <p className="text-muted-foreground">
                Our service is not intended for children under 13 years of age. We do not knowingly collect 
                personal information from children under 13.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Terms of Service Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-foreground">Terms of Service</h2>
          <p className="text-muted-foreground mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-6 text-foreground">
            <div>
              <h3 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h3>
              <p className="text-muted-foreground">
                By accessing and using CalcGenius, you accept and agree to be bound by the terms and provisions 
                of this agreement. If you do not agree to these terms, please do not use our service.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">2. Use License</h3>
              <p className="text-muted-foreground">
                We grant you a personal, non-exclusive, non-transferable license to use our calculators and 
                services for personal or business financial planning purposes. You may not modify, distribute, 
                or create derivative works based on our content without explicit permission.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">3. Disclaimer of Warranties</h3>
              <p className="text-muted-foreground">
                The calculators and information provided are for educational and informational purposes only. 
                Results should not be considered as financial, investment, tax, or legal advice. We do not 
                guarantee the accuracy, completeness, or reliability of any calculations or content.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">4. Limitation of Liability</h3>
              <p className="text-muted-foreground">
                CalcGenius and its operators shall not be liable for any direct, indirect, incidental, 
                consequential, or punitive damages arising from your use of the service or any financial 
                decisions made based on calculations performed using our tools.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">5. Subscription Terms</h3>
              <p className="text-muted-foreground mb-2">For premium subscriptions:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Subscriptions are billed in advance on a recurring basis</li>
                <li>You can cancel your subscription at any time</li>
                <li>No refunds are provided for partial subscription periods</li>
                <li>Prices are subject to change with notice</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">6. User Conduct</h3>
              <p className="text-muted-foreground mb-2">You agree not to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Use the service for any illegal purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the service</li>
                <li>Use automated systems to access the service without permission</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">7. Intellectual Property</h3>
              <p className="text-muted-foreground">
                All content, features, and functionality on CalcGenius are owned by us and are protected by 
                copyright, trademark, and other intellectual property laws.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">8. Modifications to Service</h3>
              <p className="text-muted-foreground">
                We reserve the right to modify or discontinue the service at any time without notice. 
                We shall not be liable to you or any third party for any modification, suspension, or 
                discontinuance of the service.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">9. Governing Law</h3>
              <p className="text-muted-foreground">
                These terms shall be governed by and construed in accordance with applicable laws, without 
                regard to its conflict of law provisions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">10. Contact Information</h3>
              <p className="text-muted-foreground">
                If you have any questions about these Terms or our Privacy Policy, please contact us through 
                our support channels.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            By using CalcGenius, you acknowledge that you have read and understood these policies and 
            agree to be bound by them. We may update these policies from time to time, and your continued 
            use of the service constitutes acceptance of any changes.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;

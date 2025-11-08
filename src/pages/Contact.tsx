import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  subject: z.string().trim().min(1, { message: "Subject is required" }).max(200, { message: "Subject must be less than 200 characters" }),
  message: z.string().trim().min(1, { message: "Message is required" }).max(1000, { message: "Message must be less than 1000 characters" })
});

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      // Validate form data
      contactSchema.parse(formData);

      // Create WhatsApp message with proper encoding
      const whatsappMessage = encodeURIComponent(
        `*New Contact Form Submission*\n\n` +
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Subject: ${formData.subject}\n\n` +
        `Message:\n${formData.message}`
      );
      
      // Open WhatsApp with the message
      window.open(`https://wa.me/917569274949?text=${whatsappMessage}`, '_blank');

      toast({
        title: "Message sent!",
        description: "You'll be redirected to WhatsApp to complete sending your message.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
        toast({
          title: "Validation Error",
          description: "Please check the form for errors.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact Us - CalcGenius Financial Calculators</title>
        <meta name="description" content="Get in touch with CalcGenius for support, feedback, or inquiries about our financial calculators and premium services." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              Have questions or feedback? We'd love to hear from you!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>Fill out the form and we'll get back to you shortly</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? "border-destructive" : ""}
                      maxLength={100}
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "border-destructive" : ""}
                      maxLength={255}
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      className={errors.subject ? "border-destructive" : ""}
                      maxLength={200}
                    />
                    {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={handleChange}
                      className={errors.message ? "border-destructive" : ""}
                      rows={5}
                      maxLength={1000}
                    />
                    {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                    <p className="text-xs text-muted-foreground">{formData.message.length}/1000 characters</p>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Reach out to us directly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a href="mailto:creativelyaistudio@gmail.com" className="text-muted-foreground hover:text-primary">
                        creativelyaistudio@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <a href="tel:+917569274949" className="text-muted-foreground hover:text-primary">
                        +91 7569274949
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">WhatsApp</h3>
                      <a 
                        href="https://wa.me/917569274949" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary"
                      >
                        Chat with us on WhatsApp
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Support Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We're here to help you!<br />
                    Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                    Saturday: 10:00 AM - 4:00 PM IST<br />
                    Sunday: Closed
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary/5">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">
                    <strong>Shaik Ashraf Ahmed</strong><br />
                    Founder & Support Lead<br />
                    CalcGenius Financial Calculators
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;

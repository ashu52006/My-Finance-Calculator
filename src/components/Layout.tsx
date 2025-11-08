import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, TrendingUp, PiggyBank, Wallet, CreditCard, Crown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { getUserSubscription } from '@/utils/subscription';
import CookieConsent from '@/components/CookieConsent';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const subscription = getUserSubscription();

  const navItems = [
    { path: '/', label: 'Home', icon: Calculator },
    { path: '/sip', label: 'SIP Calculator', icon: TrendingUp },
    { path: '/emi', label: 'EMI Calculator', icon: CreditCard },
    { path: '/fd', label: 'FD Calculator', icon: PiggyBank },
    { path: '/rd', label: 'RD Calculator', icon: Wallet },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Calculator className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">My Finance Calculator</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={isActive ? 'secondary' : 'ghost'}
                      className="gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
              <Link to="/subscription">
                <Button className="gap-2 ml-4 bg-gradient-primary">
                  <Crown className="h-4 w-4" />
                  {subscription.isActive ? 'My Plan' : 'Go Premium'}
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive ? 'secondary' : 'ghost'}
                      className="w-full justify-start gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
              <Link to="/subscription" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full gap-2 bg-gradient-primary">
                  <Crown className="h-4 w-4" />
                  {subscription.isActive ? 'My Plan' : 'Go Premium'}
                </Button>
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Cookie Consent */}
      <CookieConsent />

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">About</h3>
              <p className="text-sm text-muted-foreground">
                CalcGenius helps you make informed financial decisions with accurate calculators and insights.
              </p>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
                <li><Link to="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Calculators</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/sip" className="text-muted-foreground hover:text-primary">SIP Calculator</Link></li>
                <li><Link to="/emi" className="text-muted-foreground hover:text-primary">EMI Calculator</Link></li>
                <li><Link to="/fd" className="text-muted-foreground hover:text-primary">FD Calculator</Link></li>
                <li><Link to="/rd" className="text-muted-foreground hover:text-primary">RD Calculator</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Partner Offers</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://mdeal.in/c_ZXBeRsyD" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">Shop Electronics on EMI via Flipkart</a></li>
                <li><a href="https://mdeal.in/c_MUkksm5h" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">Buy Acer Laptops on EMI</a></li>
                <li><a href="https://mdeal.in/c_XhfEI1LK" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">Latest Dell Offers for Students</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/policy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link to="/policy" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                <li><Link to="/policy" className="text-muted-foreground hover:text-primary">Disclaimer</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2025 CalcGenius. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

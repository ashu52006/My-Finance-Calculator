import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Plus, Trash2, Edit, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { getAffiliateLinks, saveAffiliateLinks, getTotalClicks } from '@/utils/affiliate';
import { AffiliateLink, CalculatorPage, AffiliatePlacement } from '@/types/affiliate';

const ADMIN_PASSWORD = 'admin123'; // In production, this should be server-side

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [affiliateLinks, setAffiliateLinks] = useState<AffiliateLink[]>([]);
  const [editingLink, setEditingLink] = useState<AffiliateLink | null>(null);
  const [newLink, setNewLink] = useState<Partial<AffiliateLink>>({
    calculatorPage: 'general',
    placement: 'footer',
    status: 'active'
  });

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadAffiliateLinks();
    }
  }, []);

  const loadAffiliateLinks = () => {
    const links = getAffiliateLinks();
    setAffiliateLinks(links);
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      loadAffiliateLinks();
      toast.success('Login successful');
    } else {
      toast.error('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    navigate('/');
  };

  const handleAddLink = () => {
    if (!newLink.partnerName || !newLink.ctaText || !newLink.referralLink) {
      toast.error('Please fill all required fields');
      return;
    }

    const link: AffiliateLink = {
      id: Date.now().toString(),
      calculatorPage: newLink.calculatorPage as CalculatorPage,
      partnerName: newLink.partnerName,
      ctaText: newLink.ctaText,
      placement: newLink.placement as AffiliatePlacement,
      referralLink: newLink.referralLink,
      status: newLink.status as 'active' | 'inactive',
      priority: newLink.priority || affiliateLinks.length + 1
    };

    const updatedLinks = [...affiliateLinks, link];
    setAffiliateLinks(updatedLinks);
    saveAffiliateLinks(updatedLinks);
    setNewLink({ calculatorPage: 'general', placement: 'footer', status: 'active' });
    toast.success('Affiliate link added successfully');
  };

  const handleDeleteLink = (id: string) => {
    const updatedLinks = affiliateLinks.filter(link => link.id !== id);
    setAffiliateLinks(updatedLinks);
    saveAffiliateLinks(updatedLinks);
    toast.success('Affiliate link deleted');
  };

  const handleUpdateLink = () => {
    if (!editingLink) return;
    
    const updatedLinks = affiliateLinks.map(link =>
      link.id === editingLink.id ? editingLink : link
    );
    setAffiliateLinks(updatedLinks);
    saveAffiliateLinks(updatedLinks);
    setEditingLink(null);
    toast.success('Affiliate link updated');
  };

  const toggleLinkStatus = (id: string) => {
    const updatedLinks = affiliateLinks.map(link =>
      link.id === id ? { ...link, status: link.status === 'active' ? 'inactive' as const : 'active' as const } : link
    );
    setAffiliateLinks(updatedLinks);
    saveAffiliateLinks(updatedLinks);
    toast.success('Status updated');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="p-8 max-w-md w-full bg-gradient-card">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Shield className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-6">Admin Access</h1>
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className="mt-2 pr-10"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button onClick={handleLogin} className="w-full bg-gradient-primary">
              Login
            </Button>
            <Button onClick={() => navigate('/')} variant="outline" className="w-full">
              Back to Home
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="links" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="links">Affiliate Links</TabsTrigger>
            <TabsTrigger value="stats">Quick Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="links" className="space-y-6">
            {/* Add New Link */}
            <Card className="p-6 bg-gradient-card">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Affiliate Link
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Partner Name*</Label>
                  <Input
                    value={newLink.partnerName || ''}
                    onChange={(e) => setNewLink({ ...newLink, partnerName: e.target.value })}
                    placeholder="e.g., Kotak Bank"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>CTA Text*</Label>
                  <Input
                    value={newLink.ctaText || ''}
                    onChange={(e) => setNewLink({ ...newLink, ctaText: e.target.value })}
                    placeholder="e.g., Apply Now"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Referral Link*</Label>
                  <Input
                    value={newLink.referralLink || ''}
                    onChange={(e) => setNewLink({ ...newLink, referralLink: e.target.value })}
                    placeholder="https://..."
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Calculator Page</Label>
                  <Select value={newLink.calculatorPage} onValueChange={(value: any) => setNewLink({ ...newLink, calculatorPage: value })}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emi">EMI Calculator</SelectItem>
                      <SelectItem value="sip">SIP Calculator</SelectItem>
                      <SelectItem value="fd">FD Calculator</SelectItem>
                      <SelectItem value="rd">RD Calculator</SelectItem>
                      <SelectItem value="general">General/Footer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Placement</Label>
                  <Select value={newLink.placement} onValueChange={(value: any) => setNewLink({ ...newLink, placement: value })}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary-button">Primary Button</SelectItem>
                      <SelectItem value="secondary-button">Secondary Button</SelectItem>
                      <SelectItem value="tertiary-card">Tertiary Card</SelectItem>
                      <SelectItem value="secondary-card">Secondary Card</SelectItem>
                      <SelectItem value="content-link">Content Link</SelectItem>
                      <SelectItem value="banner">Banner</SelectItem>
                      <SelectItem value="sidebar">Sidebar</SelectItem>
                      <SelectItem value="footer">Footer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Priority</Label>
                  <Input
                    type="number"
                    value={newLink.priority || ''}
                    onChange={(e) => setNewLink({ ...newLink, priority: parseInt(e.target.value) })}
                    placeholder="1"
                    className="mt-2"
                  />
                </div>
              </div>
              <Button onClick={handleAddLink} className="mt-4 gap-2 bg-gradient-primary">
                <Plus className="h-4 w-4" />
                Add Link
              </Button>
            </Card>

            {/* Links Table */}
            <Card className="p-6 bg-gradient-card overflow-x-auto">
              <h2 className="text-xl font-semibold mb-4">Manage Affiliate Links</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Partner</TableHead>
                    <TableHead>Page</TableHead>
                    <TableHead>Placement</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {affiliateLinks.map((link) => (
                    <TableRow key={link.id}>
                      <TableCell className="font-medium">{link.partnerName}</TableCell>
                      <TableCell>{link.calculatorPage}</TableCell>
                      <TableCell>{link.placement}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant={link.status === 'active' ? 'default' : 'secondary'}
                          onClick={() => toggleLinkStatus(link.id)}
                        >
                          {link.status}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingLink(link)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteLink(link.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 bg-gradient-card">
                <h3 className="text-muted-foreground text-sm mb-2">Total Calculations</h3>
                <p className="text-3xl font-bold">--</p>
                <p className="text-xs text-muted-foreground mt-2">App not published yet</p>
              </Card>
              <Card className="p-6 bg-gradient-card">
                <h3 className="text-muted-foreground text-sm mb-2">Affiliate Clicks</h3>
                <p className="text-3xl font-bold">--</p>
                <p className="text-xs text-muted-foreground mt-2">App not published yet</p>
              </Card>
              <Card className="p-6 bg-gradient-card">
                <h3 className="text-muted-foreground text-sm mb-2">Premium Users</h3>
                <p className="text-3xl font-bold">--</p>
                <p className="text-xs text-muted-foreground mt-2">App not published yet</p>
              </Card>
              <Card className="p-6 bg-gradient-card">
                <h3 className="text-muted-foreground text-sm mb-2">Revenue</h3>
                <p className="text-3xl font-bold">--</p>
                <p className="text-xs text-muted-foreground mt-2">App not published yet</p>
              </Card>
            </div>

            <Card className="p-6 bg-gradient-card mt-6">
              <h3 className="text-lg font-semibold mb-4">AdSense Management</h3>
              <p className="text-muted-foreground mb-4">
                AdSense slots are ready in the application. Add your AdSense code in the AdSenseSlot component when ready.
              </p>
              <div className="space-y-2 text-sm">
                <p>• Header slot: Available on all pages</p>
                <p>• Sidebar slots: Available on calculator pages</p>
                <p>• Footer slot: Available on home page</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Modal */}
        {editingLink && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <Card className="p-6 max-w-2xl w-full bg-gradient-card">
              <h2 className="text-xl font-semibold mb-4">Edit Affiliate Link</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Partner Name</Label>
                  <Input
                    value={editingLink.partnerName}
                    onChange={(e) => setEditingLink({ ...editingLink, partnerName: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>CTA Text</Label>
                  <Input
                    value={editingLink.ctaText}
                    onChange={(e) => setEditingLink({ ...editingLink, ctaText: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Referral Link</Label>
                  <Input
                    value={editingLink.referralLink}
                    onChange={(e) => setEditingLink({ ...editingLink, referralLink: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button onClick={handleUpdateLink} className="bg-gradient-primary">
                  Save Changes
                </Button>
                <Button onClick={() => setEditingLink(null)} variant="outline">
                  Cancel
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;

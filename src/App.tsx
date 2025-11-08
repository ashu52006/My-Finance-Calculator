import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SIPCalculator from "./pages/SIPCalculator";
import EMICalculator from "./pages/EMICalculator";
import FDCalculator from "./pages/FDCalculator";
import RDCalculator from "./pages/RDCalculator";
import GSTCalculator from "./pages/GSTCalculator";
import IncomeTaxCalculator from "./pages/IncomeTaxCalculator";
import HomeLoanCalculator from "./pages/HomeLoanCalculator";
import PPFCalculator from "./pages/PPFCalculator";
import PersonalLoanCalculator from "./pages/PersonalLoanCalculator";
import CompoundInterestCalculator from "./pages/CompoundInterestCalculator";
import Subscription from "./pages/Subscription";
import Admin from "./pages/Admin";
import Policy from "./pages/Policy";
import Contact from "./pages/Contact";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sip" element={<SIPCalculator />} />
          <Route path="/emi" element={<EMICalculator />} />
          <Route path="/fd" element={<FDCalculator />} />
          <Route path="/rd" element={<RDCalculator />} />
          <Route path="/gst" element={<GSTCalculator />} />
          <Route path="/income-tax" element={<IncomeTaxCalculator />} />
          <Route path="/home-loan" element={<HomeLoanCalculator />} />
          <Route path="/ppf" element={<PPFCalculator />} />
          <Route path="/personal-loan" element={<PersonalLoanCalculator />} />
          <Route path="/compound-interest" element={<CompoundInterestCalculator />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

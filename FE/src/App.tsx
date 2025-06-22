import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from './components/RoleProtectedRoute';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage"; 
import StaffPanel from "./pages/StaffPanel";
import AdminPanel from "./pages/AdminPanel"
import Purchase from "./pages/purcase";
import Scanner from "./pages/Scanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
        <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Staff protected route (any logged-in user) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/staff" element={<StaffPanel />} />
        <Route path="/ausgabe" element={<Purchase />} />
        <Route path="/scanning" element={<Scanner />} />
      </Route>

      {/* Admin only route */}
      <Route element={<RoleProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminPanel />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

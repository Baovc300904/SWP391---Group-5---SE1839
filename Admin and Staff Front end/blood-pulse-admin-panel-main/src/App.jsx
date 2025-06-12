
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Reports from "./pages/Reports";
import StaffManagement from "./pages/StaffManagement";
import Notifications from "./pages/Notifications";
import SystemConfig from "./pages/SystemConfig";
import DataManagement from "./pages/DataManagement";
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
          <Route path="/staff/roles" element={<StaffManagement />} />
          <Route path="/staff/activities" element={<StaffManagement />} />
          <Route path="/reports/analytics" element={<Reports />} />
          <Route path="/reports/custom" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/system-config" element={<SystemConfig />} />
          <Route path="/data/backup" element={<DataManagement />} />
          <Route path="/data/import" element={<DataManagement />} />
          <Route path="/data/export" element={<DataManagement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

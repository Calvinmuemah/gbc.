import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { DashboardLayout } from "@/components/dashboard-layout";

// Pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Sermons from "./pages/Sermons";
import Events from "./pages/Events";
import Ministries from "./pages/Ministries";
import Donations from "./pages/Donations";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Register from "./pages/register";
// adds
import AddMinistry from "./pages/add/AddMinistry";
import AddEvent from "./pages/add/AddEvent";  
import AddSermon from "./pages/add/AddSermon";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="church-admin-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />

            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            } />
            <Route path="/sermons" element={
              <DashboardLayout>
                <Sermons />
              </DashboardLayout>
            } />
            <Route path="/events" element={
              <DashboardLayout>
                <Events />
              </DashboardLayout>
            } />
            <Route path="/ministries" element={
              <DashboardLayout>
                <Ministries />
              </DashboardLayout>
            } />
            <Route path="/donations" element={
              <DashboardLayout>
                <Donations />
              </DashboardLayout>
            } />
            <Route path="/settings" element={
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            } />
            {/* Add Ministry Route */}
            <Route path="/add-ministry" element={
              <DashboardLayout>
                <AddMinistry />
              </DashboardLayout>
            } />
            {/* Add Ministry Route */}
            <Route path="/add-Event" element={
              <DashboardLayout>
                <AddEvent />
              </DashboardLayout>
            } />
            {/* Add Ministry Route */}
            <Route path="/add-Sermon" element={
              <DashboardLayout>
                <AddSermon />
              </DashboardLayout>
            } />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalToast from "./components/ui/GlobalToast";
import { UserProvider } from "./contexts/UserContext";
import { isAuthenticated } from "./utils/session";

import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import AuthLayout from "./pages/_Layouts/AuthLayout";
import DashboardLayout from "./pages/_Layouts/DashboardLayout";
import Automations from "./pages/Automations/Automations";
import Clients from "./pages/Clients/Clients";
import CRM from "./pages/CRM/CRM";
import Dashboard from "./pages/Dashboard/Dashboard";
import Finance from "./pages/Financeiro/Finance";
import Home from "./pages/Home";
import Leads from "./pages/Leads/Leads";
import PortfolioDev from "./pages/PortfolioDev";
import PortfolioSocialMedia from "./pages/PortfolioSocialMedia";
import Reports from "./pages/Reports/Reports";
import Settings from "./pages/Settings/Settings";
import TermsAndService from "./pages/TermosAndServicos";
import Whatsapp from "./pages/whatsapp/whatsapp";
import Images from "./pages/Services/Images";
import PublicImage from "./pages/Services/PublicImage";
import Profile from "./pages/Settings/Profile";
import UpdateProfile from "./pages/Settings/UpdateProfile";
import Plans from "./pages/Settings/Plans";
import Contracts from "./pages/Settings/Contracts";

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <GlobalToast />
        <Routes>
          {/* Site */}
          <Route path="/" element={<Home />} />

          <Route path="/dev" element={<PortfolioDev />} />

          <Route path="/socialmedia" element={<PortfolioSocialMedia />} />

          <Route path="/terms" element={<TermsAndService />} />

          {/* Autenticação */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />
          </Route>

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="clients" element={<Clients />} />
            <Route path="leads" element={<Leads />} />
            <Route path="crm" element={<CRM />} />
            <Route path="finance" element={<Finance />} />
            <Route path="automations" element={<Automations />} />
            <Route path="whatsapp" element={<Whatsapp />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="services/images" element={<Images />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/update" element={<UpdateProfile />} />
            <Route path="plans" element={<Plans />} />
            <Route path="contracts" element={<Contracts />} />
          </Route>

          {/* Página pública de compartilhamento */}
          <Route path="/s/:id" element={<PublicImage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

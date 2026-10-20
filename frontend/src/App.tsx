import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalToast from "./components/ui/GlobalToast";
import { UserProvider } from "./contexts/UserContext";
import { isAuthenticated } from "./utils/session";

import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import AuthLayout from "./pages/_Layouts/AuthLayout";
import DashboardLayout from "./pages/_Layouts/DashboardLayout";
import Automations from "./pages/Automations/Automations";
import CheckoutCancel from "./pages/Checkout/CheckoutCancel";
import CheckoutSuccess from "./pages/Checkout/CheckoutSuccess";
import Clients from "./pages/Clients/Clients";
import CRM from "./pages/CRM/CRM";
import Dashboard from "./pages/Dashboard/Dashboard";
import Finance from "./pages/Financeiro/Finance";
import FoodLab from "./pages/FoodLab";
import Home from "./pages/Home";
import Leads from "./pages/Leads/Leads";
import Modelos from "./pages/Modelos";
import PortfolioDev from "./pages/PortfolioDev";
import PortfolioSocialMedia from "./pages/PortfolioSocialMedia";
import Reports from "./pages/Reports/Reports";
import Images from "./pages/Services/Images";
import PublicImage from "./pages/Services/PublicImage";
import Contracts from "./pages/Settings/Contracts";
import Plans from "./pages/Settings/Plans";
import Profile from "./pages/Settings/Profile";
import Settings from "./pages/Settings/Settings";
import UpdateProfile from "./pages/Settings/UpdateProfile";
import TermsAndService from "./pages/TermosAndServicos";
import Whatsapp from "./pages/whatsapp/whatsapp";

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
          <Route path="/" element={<PortfolioSocialMedia />} />

          <Route path="/plataforma" element={<Home />} />

          <Route path="/dev" element={<PortfolioDev />} />

          <Route
            path="/modelos"
            element={<Navigate to="/fabrica-de-modelos" replace />}
          />

          <Route path="/metodo-ai-studio" element={<Modelos />} />
          <Route path="/foodlab-studio" element={<FoodLab />} />

          <Route path="/socialmedia" element={<Navigate to="/" replace />} />

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

          {/* Checkout */}
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/cancel" element={<CheckoutCancel />} />

          {/* Página pública de compartilhamento */}
          <Route path="/s/:id" element={<PublicImage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

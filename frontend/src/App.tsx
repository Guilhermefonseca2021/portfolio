import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import Automations from "./pages/Automations/Automations";
import Clients from "./pages/Clients/Clients";
import CRM from "./pages/CRM/CRM";
import Dashboard from "./pages/Dashboard/Dashboard";
import Finance from "./pages/Financeiro/Finance";
import Home from "./pages/Home";
import AuthLayout from "./pages/_Layouts/AuthLayout";
import DashboardLayout from "./pages/_Layouts/DashboardLayout";
import Leads from "./pages/Leads/Leads";
import PortfolioDev from "./pages/PortfolioDev";
import PortfolioSocialMedia from "./pages/PortfolioSocialMedia";
import TermsAndService from "./pages/TermosAndServicos";
import Whatsapp from "./pages/whatsapp/whatsapp";
import Reports from "./pages/Reports/Reports";
import Settings from "./pages/Settings/Settings";

export default function App() {
  return (
    <BrowserRouter>
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
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="leads" element={<Leads />} />
          <Route path="crm" element={<CRM />} />
          <Route path="finance" element={<Finance />} />
          <Route path="automations" element={<Automations />} />
          <Route path="whatsapp" element={<Whatsapp />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

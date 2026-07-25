import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import PortfolioDev from "./pages/PortfolioDev";
import PortfolioSocialMedia from "./pages/PortfolioSocialMedia";
import TermsAndService from "./pages/TermosAndServicos";
import AuthLayout from "./pages/Layouts/AuthLayout";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardLayout from "./pages/Layouts/DashboardLayout";
import Clients from "./pages/Clients/Clients";


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
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/clientes" element={<Clients />} />

          {/* <Route path="/leads" element={<Leads />} />

          <Route path="/crm" element={<CRM />} />

          <Route path="/financeiro" element={<Financeiro />} /> */}

          {/* <Route path="/whatsapp" element={<WhatsApp />} />

          <Route path="/automacoes" element={<Automacoes />} />

          <Route path="/relatorios" element={<Relatorios />} />

          <Route path="/configuracoes" element={<Configuracoes />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

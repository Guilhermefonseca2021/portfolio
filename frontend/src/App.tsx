import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PortfolioDev from "./pages/PortfolioDev";
import PortfolioSocialMedia from "./pages/PortfolioSocialMedia";
import AuthLayout from "./pages/Auth/AuthLayout";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Site */}
        <Route path="/" element={<Home />} />

        <Route path="/dev" element={<PortfolioDev />} />

        <Route path="/socialmedia" element={<PortfolioSocialMedia />} />

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

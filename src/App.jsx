import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import DetailPage from "./pages/ExploreDetailPage";
import SearchFilter from "./components/SearchFilters";
import DashboardAdmin from "./pages/DashboardPage";
import MyTransaction from "./pages/My-TransactionPage";
import MyTransactionID from "./pages/My-TransactionPage/[id]";
import ProtectRoutes from "./routes/protectRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/explore" element={<SearchFilter />} />

        {/* Explore by ID hanya untuk user */}
        <Route
          path="/explore/:id"
          element={
            <ProtectRoutes>
              <DetailPage />
            </ProtectRoutes>
          }
        />

        {/* Dashboard hanya untuk admin */}
        <Route
          path="/dashboard"
          element={
            <ProtectRoutes>
              <DashboardAdmin />
            </ProtectRoutes>
          }
        />

        {/* My Transaction hanya untuk user */}
        <Route
          path="/my-transaction"
          element={
            <ProtectRoutes>
              <MyTransaction />
            </ProtectRoutes>
          }
        />
        <Route
          path="/my-transaction/:id"
          element={
            <ProtectRoutes>
              <MyTransactionID />
            </ProtectRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

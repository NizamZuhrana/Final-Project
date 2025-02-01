import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import DetailPage from "./pages/ExploreDetailPage";
import SearchFilter from "./components/SearchFilters";
import DashboardAdmin from "./pages/DashboardPage";
import MyTransaction from "./pages/My-TransactionPage";
import MyTransactionID from "./pages/My-TransactionPage/[id]";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/explore/:id" element={<DetailPage />} />
          <Route path="/explore" element={<SearchFilter />} />
          <Route path="/dashboard" element={<DashboardAdmin />} />
          <Route path="/my-transaction" element={<MyTransaction />} />
          <Route path="/my-transaction/:id" element={<MyTransactionID />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

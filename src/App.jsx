import LogingPage from "./components/LoginPage.jsx";
import ReceiptsPage from "./components/ReceiptsPage.jsx";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./ProtectedRoutes.jsx";
import NewReceipt from "./components/NewReceipt.jsx";

function App() {
  return (
    <AuthProvider>
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <Router>
          <Routes>
            <Route path="/" element={<LogingPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/receipts" element={<ReceiptsPage />} />
              <Route path="/add-receipt" element={<NewReceipt />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;

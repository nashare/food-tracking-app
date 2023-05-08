import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import AuthPage from "../AuthPage/AuthPage";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";

function App() {
  const [user, setUser] = useState(null);
  return (
    <main className="App">
      {user ? (
        <Routes>
          {/* Route components here */}
          <Route path="/orders/new" element={<NewOrderPage />} />
        </Routes>
      ) : (
        <AuthPage />
      )}
    </main>
  );
}

export default App;

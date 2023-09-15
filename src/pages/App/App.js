import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from '../../components/NavBar/NavBar';

import AuthPage from '../AuthPage/AuthPage';
import NewMealPage from '../NewMealPage/NewMealPage';
import MealsPage from '../MealsPage/MealsPage';

import { getUser } from '../../utilities/users-service';

function App() {
  const [user, setUser] = useState(getUser());
  
  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            {/* Route components here */}
            <Route path="/meals/new" element={<NewMealPage />} />
            <Route path="/meals" userId={user._id}  element={<MealsPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;

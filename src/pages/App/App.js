import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from '../../components/NavBar/NavBar';
import NewMealPage from '../NewMealPage/NewMealPage';
import MealsPage from '../MealsPage/MealsPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import MainPage from '../MainPage/MainPage';
import LogInPage from '../LogInPage/LogInPage';

import { getUser } from '../../utilities/users-service';

function App() {
  const [user, setUser] = useState(getUser());
  
  return (
    <main>
      <header>
      <NavBar user={user} setUser={setUser} />
      </header>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LogInPage setUser={setUser} />} />
        <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
        {user ? (
          <>
            <Route path="/meals/new" element={<NewMealPage />} />
            <Route path="/meals" element={<MealsPage user={user} />} />
          </>
        ) : (
            <Route path="/meals/*" element={<LogInPage setUser={setUser} />} />
        )}
      </Routes>
    </main>
  );
}

export default App;

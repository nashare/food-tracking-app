import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useState } from "react";

import "./AuthPage.css";

export default function AuthPage({ setUser }) {
  const [userStatus, setUserStatus] = useState(true);
  return (
    <main>
      <div className="auth-page">
        {userStatus ? (
          <>
            <div className="left">
                <button onClick={() => setUserStatus(!userStatus)}>
                  Sign Up
                </button>
            </div>
            <LoginForm setUser={setUser} />
          </>
        ) : (
          <>
            <div className="left">
                <button onClick={() => setUserStatus(!userStatus)}>
                  Log In
                </button>
            </div>
            <SignUpForm setUser={setUser} />
          </>
        )}
      </div>
    </main>
  );
}

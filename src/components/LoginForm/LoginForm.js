import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import * as usersService from '../../utilities/users-service';

export default function LoginForm({ setUser }) {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);
      if (user) {
        setUser(user);
        navigate("/");
      }
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div>
      <div>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="field">
            <p class="control has-icons-left">
              <input className="input is-medium" type="text" name="email" placeholder="Email" value={credentials.email} onChange={handleChange} required />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p class="control has-icons-left">
              <input className="input is-medium" type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field has-text-centered">
            <button className="button is-medium is-success mt-3" type="submit">Log In</button>
          </div>
        </form>
      </div>
      <p className="has-text-danger-dark">&nbsp;{error}</p>
    </div>
  );
}
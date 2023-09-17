import { Link } from "react-router-dom";
import * as userService from '../../utilities/users-service'
import CaloriesPerDay from "../CaloriesPerDay/CaloriesPerDay";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="navbar is-info p-2" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item is-family-monospace has-text-weight-bold is-size-4">Food Tracker</Link>
      </div>
      <div className="navbar-menu is-active">
        <ul className="navbar-end">
      {user ? (
        <>
              <Link to="/meals" className="navbar-item"><i class="fa-solid fa-utensils"></i>&nbsp; All Meals</Link>
              <Link to="/meals/new" className="navbar-item"><i class="fa-solid fa-plus"></i>&nbsp; New Meal</Link>
          <span className="navbar-item"><CaloriesPerDay user={user} setUser={setUser} /> </span>
              <Link to="" onClick={handleLogOut} className="navbar-item"><i class="fa-solid fa-right-from-bracket"></i>&nbsp; Log Out</Link>
        </>
      ) : (
        <>
                <Link to="/login" className="navbar-item"><i class="fa-solid fa-right-to-bracket"></i>&nbsp; Log In</Link>
                <Link to="/signup" className="navbar-item"><i class="fa-solid fa-user-plus"></i>&nbsp; Sign Up</Link>
        </>
      )}
        </ul>
      </div>
    </nav>
  );
}

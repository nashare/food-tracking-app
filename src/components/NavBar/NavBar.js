import { Link } from "react-router-dom";
import * as userService from '../../utilities/users-service'
import CaloriesPerDay from "../CaloriesPerDay/CaloriesPerDay";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <Link to="/" >Food Tracker</Link>
      {user ? (
        <>
          <Link to="/meals">All Meals</Link>
          <Link to="/meals/new">New Meal</Link>
          <span><CaloriesPerDay user={user} setUser={setUser} /> </span>
          <Link to="" onClick={handleLogOut}><i class="fa-solid fa-right-from-bracket"></i>Log Out</Link>
        </>
      ) : (
        <>
          <Link to="/login"><i class="fa-solid fa-right-to-bracket"></i>Log In</Link>
          <Link to="/signup"><i class="fa-solid fa-user-plus"></i>Sign Up</Link>
        </>
      )}
    </nav>
  );
}

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
      <Link to="/meals">All Meals</Link>
      &nbsp; | &nbsp;
      <Link to="/meals/new">New Meal</Link>
      {user && <span>&nbsp;Welcome, {user.name}</span>}
      {user && <span>&nbsp; <CaloriesPerDay user={user} /> </span>}
      &nbsp; | &nbsp;
      <Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}

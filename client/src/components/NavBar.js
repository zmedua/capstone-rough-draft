import React from "react";
import {NavLink} from "react-router-dom";

function NavBar({ user, onLogout }) 
{
  return (
    <nav>
      <h1>Workout Tracker</h1>
      <p>Welcome, {user.username}</p>

      <NavLink to="/workouts">
        Workouts
      </NavLink>

      {"|"}

      <NavLink to="/workouts/new">
        Add Workout
      </NavLink>

      {"|"}

      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </nav>
  );
}

export default NavBar;
import React from "react";
import {NavLink} from "react-router-dom";
import "../styles/NavBar.css";
function NavBar({ user, onLogout }) 
{
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Workout Tracker</h1>
      <p className="navbar-welcome">Welcome, {user.username}</p>

      <NavLink to="/workouts">
        Workouts
      </NavLink>

      {"|"}

      <NavLink to="/workouts/new">
        Add Workout
      </NavLink>

      {"|"}

      <button className="nav-button" type="button" onClick={onLogout}>
        Logout
      </button>
    </nav>
  );
}

export default NavBar;
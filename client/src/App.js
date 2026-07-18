import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import WorkoutsPage from "./pages/WorkoutsPage";
import AddWorkoutPage from "./pages/AddWorkoutPage";
import Signup from "./pages/Signup"

function App() {
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check whether the user already has an active session.
  useEffect(() => {
    fetch("/check_session")
      .then((response) => {
        if (!response.ok) {
          return null;
        }

        return response.json();
      })
      .then((userData) => {
        setUser(userData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Session check failed:", error);
        setUser(null);
        setIsLoading(false);
      });
  }, []);

  // Load workouts after the user logs in.
  useEffect(() => {
    if (!user) {
      setWorkouts([]);
      return;
    }

    fetch("/workouts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load workouts.");
        }

        return response.json();
      })
      .then((data) => {
        setWorkouts(data.workouts || data);
      })
      .catch((error) => {
        console.error(error);
        setWorkouts([]);
      });
  }, [user]);

  // Load available exercises after the user logs in.
  useEffect(() => {
    if (!user) {
      setExercises([]);
      return;
    }

    fetch("/exercises")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load exercises.");
        }

        return response.json();
      })
      .then((data) => {
        setExercises(data.exercises || data);
      })
      .catch((error) => {
        console.error(error);
        setExercises([]);
      });
  }, [user]);

  function handleLogin(userData) {
    setUser(userData);
  }

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to log out.");
        }

        setUser(null);
        setWorkouts([]);
        setExercises([]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleAddWorkout(newWorkout) {
    setWorkouts((currentWorkouts) => [
      ...currentWorkouts,
      newWorkout,
    ]);
  }

  // All hooks must appear before this conditional return.
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <BrowserRouter>
      {user && (
        <NavBar
          user={user}
          onLogout={handleLogout}
        />
      )}

      <Routes>
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/workouts" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            user ? (
              <Navigate to="/workouts" replace />
            ) : (
              <Signup onSignup={handleLogin} />
            )
          }
        />
        
        <Route
          path="/workouts"
          element={
            user ? (
              <WorkoutsPage
                workouts={workouts}
                setWorkouts={setWorkouts}
                exercises={exercises}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/workouts/new"
          element={
            user ? (
              <AddWorkoutPage
                onAddWorkout={handleAddWorkout}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to={user ? "/workouts" : "/login"}
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
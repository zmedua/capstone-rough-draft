import React from "react";
import { useNavigate } from "react-router-dom";
import WorkoutForm from "../components/WorkoutForm";
import "../styles/AddWorkoutPage.css";

function AddWorkoutPage({ onAddWorkout }) {
  const navigate = useNavigate();

  function handleAddWorkout(newWorkout) {
    onAddWorkout(newWorkout);
    navigate("/workouts");
  }

  return (
    <main>
      <h1>Add Workout</h1>

      <WorkoutForm
        onAddWorkout={handleAddWorkout}
      />
    </main>
  );
}

export default AddWorkoutPage;
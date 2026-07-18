import React from "react";
import WorkoutCard from "../components/WorkoutCard";
import "../styles/WorkoutsPage.css";
function WorkoutsPage({
  workouts,
  setWorkouts,
  exercises,
}) {
  function handleDeleteWorkout(id) {
    setWorkouts((currentWorkouts) =>
      currentWorkouts.filter(
        (workout) => workout.id !== id
      )
    );
  }

  function handleUpdateWorkout(updatedWorkout) {
    setWorkouts((currentWorkouts) =>
      currentWorkouts.map((workout) =>
        workout.id === updatedWorkout.id
          ? updatedWorkout
          : workout
      )
    );
  }

  return (
    <main>
      <h1>Workout Log</h1>

      {workouts.length === 0 ? (
        <p>No workouts have been recorded yet.</p>
      ) : (
        workouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            exercises={exercises}
            onDeleteWorkout={handleDeleteWorkout}
            onUpdateWorkout={handleUpdateWorkout}
          />
        ))
      )}
    </main>
  );
}

export default WorkoutsPage;
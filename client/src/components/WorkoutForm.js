import React, { useState } from "react";

function WorkoutForm({ onAddWorkout }) {
  const [date, setDate] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setErrors([]);

    fetch("/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date,
        duration_minutes: Number(durationMinutes),
        notes,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((errorData) => {
          const errorMessages = errorData.errors
            ? Object.values(errorData.errors).flat()
            : [errorData.error || "Unable to create workout."];

          throw new Error(errorMessages.join(", "));
        });
      })
      .then((newWorkout) => {
        onAddWorkout(newWorkout);

        setDate("");
        setDurationMinutes("");
        setNotes("");
      })
      .catch((error) => {
        setErrors([error.message]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <h2>Add Workout</h2>

      <label className="form-label" htmlFor="workout-date">Date</label>
      <input
        id="workout-date"
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        required
      />

      <label className="form-label" htmlFor="duration">Duration in minutes</label>
      <input
        id="duration"
        type="number"
        min="1"
        value={durationMinutes}
        onChange={(event) =>
          setDurationMinutes(event.target.value)
        }
        required
      />

      <label className="form-notes" htmlFor="notes">Notes</label>
      <textarea
        id="notes"
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
      />

      <button className="form-button" type="submit" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Workout"}
      </button>

      {errors.map((error, index) => (
        <p className="form-error" key={`${error}-${index}`}>{error}</p>
      ))}
    </form>
  );
}

export default WorkoutForm;
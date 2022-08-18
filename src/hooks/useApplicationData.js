import React, { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData(initialState) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });

  const getSpots = function (day) {
    let numSpots = 0;
    day.appointments.forEach(apptID => {
      if (state.appointments[apptID].interview === null) {
        numSpots++;
      }
    });
    return numSpots;
  }

  const updateSpots = function (id, state, isCreating = false) {
    const currentDay = state.days.find((day) => day.appointments.includes(id));
    let emptySpots = getSpots(currentDay);
    if (isCreating) { emptySpots--; }
    console.log("IT NOW IS", currentDay)
    console.log("EMPTY SPOTS", emptySpots);
    return [currentDay, emptySpots];
  }

  // ==== BOOK INTERVIEW ====
  const bookInterview = (id, interview, isCreating) => {
    const [currentDay, emptySpots] = updateSpots(id, state, isCreating);

    const appointment = {
      ...state.appointments[id],
      interview,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const day = {
      ...currentDay,
      spots: emptySpots
    }

    const newDays = [...state.days]
    newDays[currentDay.id - 1] = day;

    return axios
      .put(`/api/appointments/${id}`, { interview: interview })
      .then(() => {
        setState({ ...state, appointments });
      })
  };

  // ==== CANCEL INTERVIEW ====
  const cancelInterview = (id) => {
    const [currentDay, emptySpots] = updateSpots(id, state, false);
    console.log("Current day", currentDay);
    console.log("Empty spots", emptySpots);
    const ourAppointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = { ...state.appointments, [id]: ourAppointment };

    const day = {
      ...currentDay,
      spots: emptySpots
    }
    const newDays = [...state.days]
    newDays[currentDay.id - 1] = day;

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days: newDays });
      });
  };


  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview }
}
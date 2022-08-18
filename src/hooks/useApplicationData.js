import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData(initialState) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });

  //===== getSpots function -  for testing original emptySpots method====
  // const getSpots = function (day) {
  //   let numSpots = 0;
  //   day.appointments.forEach(apptID => {
  //     if (state.appointments[apptID].interview === null) {
  //       numSpots++;
  //     }
  //   });
  //   console.log("numSpots", numSpots)
  //   return numSpots;
  // }


  const updateSpots = function (id, state, isCreating = false) {
    const currentDay = state.days.find((day) => day.appointments.includes(id));

    const emptySpots = currentDay.appointments.filter(
      (id) => !state.appointments[id].interview
    ).length;
    // Below was my original function -- why did the above work when getSpots didn't?
    // let emptySpots = getSpots(currentDay);
    //=========================================
    // i THINK it's because the interview with the current ID is being filtered out
    // in comparison, we are counting the number of nulls that exist RIGHT NOW
    //=========================================
    const newDay = { ...currentDay, spots: emptySpots };
    const newDays = state.days.map((day) => {
      if (day.name === state.day) {
        return newDay;
      }
      return day;
    })
    setState({ ...state, days: newDays });
    return newDays;
  }

  // ==== BOOK INTERVIEW ====
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const newState = { ...state, appointments }

    return axios
      .put(`/api/appointments/${id}`, { interview: interview })
      .then(() => {
        updateSpots(id, newState);
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
    const newState = { ...state, appointments }

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        updateSpots(id, newState);
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
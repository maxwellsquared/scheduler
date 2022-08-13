export function getAppointmentsForDay(state, day) {
  let toReturn = [];

  // find index of the object in state.days with .name property === day argument
  let dayIndex = state.days.findIndex((element) => element.name === day);
  // if it's not found, return empty array
  if (dayIndex === -1) return toReturn;

  // set the appointment IDs for this day
  let appointmentIDs = state.days[dayIndex].appointments;

  // put the appointments with corresponding IDs into our array
  appointmentIDs.forEach((element) => {
    toReturn.push(state.appointments[element]);
  });
  return toReturn;
}

// takes
// { student: "Archie Cohen", interviewer: 2 }

// to return:
// {
//   "student": "Archie Cohen", // DONE
//   "interviewer": {   // state.interviewers[interview.interviewer]
//     "id": 1,     //
//     "name": "Sylvia Palmer",    //
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }
export function getInterview(state, interview) {
  let toReturn = {};

  if (!interview) return null;

  // put the student into the object
  toReturn.student = interview.student;
  toReturn.interviewer = { ...state.interviewers[interview.interviewer] };

  console.log("ME RETURNY", toReturn);
  return toReturn;
}

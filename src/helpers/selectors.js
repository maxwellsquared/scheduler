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

export function getInterview(state, interview) {
  let toReturn = {};

  if (!interview) return null;

  // put the student into the object
  toReturn.student = interview.student;
  // puts the interviewer into the object
  toReturn.interviewer = { ...state.interviewers[interview.interviewer] };
  let a = 1;
  a++;

  return toReturn;
}

export function getInterviewersForDay(state, day) {
  let toReturn = [];

  // find index of the object in state.days with .name property === day argument
  let dayIndex = state.days.findIndex((element) => element.name === day);
  // if it's not found, return empty array
  if (dayIndex === -1) return toReturn;

  // set the interviewer IDs for this day
  let interviewerIDs = state.days[dayIndex].interviewers;

  // put the appointments with corresponding IDs into our array
  interviewerIDs.forEach((element) => {
    toReturn.push(state.interviewers[element]);
  });
  return toReturn;
}

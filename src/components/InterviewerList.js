import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";

// props.interviewers  -- array with all
// props.setInterviewer -- function
// props.interviewer  -- currently selected interviewer

export default function InterviewerList(props) {
  let toReturn = props.interviewers.map((item) => {
    return (
      <InterviewerListItem
        key={item.id}
        name={item.name}
        avatar={item.avatar}
        selected={item.id === props.interviewer}
        setInterviewer={(event) => props.setInterviewer(item.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{toReturn}</ul>
    </section>
  );
}

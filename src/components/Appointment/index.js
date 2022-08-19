import React, { Fragment } from "react";

import Confirm from "./Confirm";
import Empty from "./Empty";
import Error from "./Error";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import Status from "./Status";

import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer, isCreating = false) {
    const interview = {
      student: name,
      interviewer: interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview, isCreating)
      .then(() => transition(SHOW))
      .catch((error) => {
        console.log(error);
        transition(ERROR_SAVE, true)
      });
  }

  function destroy(id) {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => { })
      .then(() => {
        setTimeout(() => {
          transition(EMPTY);
        }, 600)
      })
      .catch((error) => {
        console.log(error);
        transition(ERROR_DELETE, true)
      });

  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => { transition(EDIT) }}
          onDelete={() => {
            transition(CONFIRM);
          }}
        />
      )}

      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={back} isCreating={true} />
      )}
      {mode === EDIT && (
        <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} isCreating={false} onSave={save} onCancel={back} />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you want to delete this appointment?"}
          onCancel={back}
          onConfirm={destroy}
        />
      )}

      {mode === ERROR_DELETE && <Error message={"Error deleting!"} onClose={back} />}
      {mode === ERROR_SAVE && <Error message={"Error saving!"} onClose={back} />}
    </article>
  );
}

import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, queryByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    const studentName = "Lydia Miller-Jones"

    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointments = getAllByTestId(container, "appointment")
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: studentName }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))
    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();
    await waitForElement(() => queryByText(appointment, studentName));

    const days = getAllByTestId(container, "day");
    const monday = days.find(element => queryByText(element, "Monday"));

    expect(getByText(monday, /no spots remaining/i)).toBeInTheDocument();

  })


  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // 1. Render the Application.
    // 2. Wait until the text "Archie Cohen" is displayed.
    // 3. Click the button with the element "Delete" on the booked appointment.
    // 4. Click "Confirm."
    // 5. Check that the element with the text "Deleting..." is displayed.
    // 6. Wait until the elment with the text "Deleting"... is no longer displayed.
    // 7. Check that the DayListItem with the text "Monday" has the text "2 spots remaining."
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"))
    debug(prettyDOM(container));
    const appointments = getAllByTestId(container, "appointment")
    const appointment = appointments[1];

    fireEvent.click(getByAltText(appointment, "Delete"));





  })
})
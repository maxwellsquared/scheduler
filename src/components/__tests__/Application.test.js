import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, queryByText, prettyDOM, getAllByTestId, getByAltText, queryByAltText, getByPlaceholderText, waitForElementToBeRemoved, waitFor } from "@testing-library/react";

import Application from "components/Application";

/* somewhere near the top */
import axios from "axios";



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


  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));
    fireEvent.click(getByText(appointment, "Confirm"))

    await waitForElement(() => queryByText(appointment, "Deleting..."))
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();

    await waitForElement(() => queryByAltText(appointment, "Add"))

    const days = getAllByTestId(container, "day");
    const monday = days.find(element => queryByText(element, "Monday"));

    expect(getByText(monday, /2 spots remaining/i)).toBeInTheDocument();
  })

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"))


    // 2. Wait until the text "Archie Cohen" is displayed.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    // 3. Click the button with the alt text "Edit" on the booked appointment.
    fireEvent.click(getByAltText(appointment, "Edit"));
    // 4. Change the student name to "Gabagool"
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Gabagool" }
    });
    // click "Save"
    fireEvent.click(getByText(appointment, "Save"));

    // 5. Check that the element with the text "Saving..." is displayed.
    await waitForElement(() => queryByText(appointment, "Saving..."))
    // 6. Check that the DayListItem with the text "Monday" has the text "1 spot remaining."
    const days = getAllByTestId(container, "day");
    const monday = days.find(element => queryByText(element, "Monday"));

    expect(getByText(monday, /1 spot remaining/i)).toBeInTheDocument();

  })

  it("shows the save error when failing to save an appointment", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Gabagool" }
    });
    // click "Save"
    axios.put.mockRejectedValueOnce();

    fireEvent.click(getByText(appointment, "Save"));
    await waitForElement(() => queryByAltText(appointment, "Loading")).then(
      expect(queryByAltText(appointment, "Loading")).toBeInTheDocument()
    );
    await waitForElement(() => queryByText(appointment, "Error"))

    expect(queryByText(appointment, "Error")).toBeInTheDocument()

  });

  it("shows the delete error when failing to delete an appointment", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));

    axios.delete.mockRejectedValueOnce();

    fireEvent.click(getByText(appointment, "Confirm"))
    await waitForElement(() => queryByAltText(appointment, "Loading")).then(
      expect(queryByAltText(appointment, "Loading")).toBeInTheDocument()
    );

    await waitForElement(() => queryByText(appointment, "Error"))

    expect(queryByText(appointment, "Error")).toBeInTheDocument()

  });
});

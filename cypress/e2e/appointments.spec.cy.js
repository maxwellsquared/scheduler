describe("Appointments", () => {
  const student = "Lydia Miller-Jones";
  const interviewer = "Sylvia Palmer";
  const interviewer2 = "Tori Malcolm";

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset")

    cy.visit("/");
    cy.contains("Monday");

  })


  xit("Should book an interview", () => {

    cy.get('[alt="Add"]')
      .first()
      .click();
    cy.get('[placeholder="Enter Student Name"]')
      .type(student);
    cy.get(`[alt="${interviewer}"]`).click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", student);
    cy.contains(".appointment__card--show", interviewer);
  })

  xit("Should edit an interview", () => {
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });

    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })

  it("Should cancel an interview", () => {
    cy.get("[alt='Delete']")
      .first()
      .click({ force: true });

    cy.get('[alt="Confirm"]').click();
    cy.contains("Deleting...");
    cy.contains("Deleting...").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  })
});




describe("TodoList App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/deployFrontTodo");
  });

  it("Add a task to the list of todos", () => {
    const todoText = "Nouvelle tâche";
    // Saisit le texte de la tâche dans l'input
    cy.get("input[type='text']").type(todoText);
    // Clique sur le bouton "Add"
    cy.get("button").contains("Add").click();

    // Vérifie qu'il y a une seule tâche dans la liste
    cy.get("li").should("have.length", 1);
    // Vérifie que la tâche ajoutée est affichée
    cy.get("li").contains(todoText);
  });

  it("Delete a task from the todo list", () => {
    cy.get("li").should("have.length", 1);
    cy.get("li").contains("Nouvelle tâche");
    cy.get("button").contains("Supprimer").click();
    cy.get("li").should("have.length", 0);
  });

  it("Mark a task as done", () => {
    const todoText = "Tâche à réaliser";
    cy.get("input[type='text']").type(todoText);
    cy.get("button").contains("Add").click();
    cy.get("li").should("have.length", 1);
    cy.get("li").contains(todoText);
    cy.get("li button").contains("A faire").click();
    cy.get("li span").contains("✔️");
  });

  it("Modify a task in the list", () => {
    const originalText = "Tâche de base";
    const modifiedText = "Tâche que j'ai modifiée";
    cy.get("input[type='text']").type(originalText);
    cy.get("button").contains("Add").click();
    cy.get("li").should("have.length", 2);
    cy.get("li").contains(originalText);
    cy.get("li button").eq(-2).contains("Modifier").click();
    cy.get("ul div input[type='text']").clear().type(modifiedText);
    cy.get("ul div button").contains("Save").click();
    cy.get("li").contains(originalText).should("not.exist");
    cy.get("li").contains(modifiedText);
  });

  it("Check if nothing is added when the input is empty", () => {
    cy.get("li").should("have.length", 2);

    cy.get("button").contains("Add").click();

    cy.get("li").should("have.length", 2);
  });

  it("Check if the modification is canceled by clicking on the 'Cancel' button", () => {
    const originalText = "Tâche originale";
    const modifiedText = "Tâche modifiée";

    cy.get("input[type='text']").type(originalText);
    cy.get("button").contains("Add").click();

    cy.get("li").should("have.length", 3);
    cy.get("li").contains(originalText);

    cy.get("li button").eq(-2).contains("Modifier").click();

    cy.get("ul div input[type='text']").clear().type(modifiedText);
    cy.get("ul div button").contains("Cancel").click();

    cy.get("li").contains(originalText);
  });
});

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

describe("Integration Test", () => {
  beforeEach(() => {
    jest.spyOn(window, "fetch").mockImplementation((url, options) => {
      if (
        url === "http://localhost:8000/addTodo" &&
        options.method === "POST"
      ) {
        const newTodo = { id: "1", content: "Test todo", edit: false };
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(newTodo),
        });
      }
      if (
        url === "http://localhost:8000/deleteTodo" &&
        options.method === "POST"
      ) {
        return Promise.resolve({ ok: true });
      }
      return Promise.reject(new Error("Invalid request"));
    });
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  test("Adding a new todo and deleting it", async () => {
    render(<App />);

    // Saisit une valeur dans le champ d'ajout de todo
    const inputElement = screen.getByPlaceholderText("Add a todo");
    fireEvent.change(inputElement, { target: { value: "Test todo" } });

    // Clique sur le bouton "Add"
    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);

    // Vérifie que la nouvelle todo est ajoutée à la liste
    const addedTodo = await screen.findByText("Test todo");
    expect(addedTodo).toBeInTheDocument();

    // Clique sur le bouton de suppression pour la todo ajoutée
    const deleteButton = screen.getByText("Supprimer");
    fireEvent.click(deleteButton);

    // Vérifie que la todo est supprimée de la liste
    await waitFor(() => {
      const deletedTodo = screen.queryByText("Test todo");
      expect(deletedTodo).not.toBeInTheDocument();
    });
  });
});

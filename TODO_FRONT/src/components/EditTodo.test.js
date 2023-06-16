import { fireEvent, render, screen } from "@testing-library/react";
import EditTodo from "./EditTodo";

describe("Edit Todo test", () => {
  it("cancel the modifications when click on the button", () => {
    const todoUp = jest.fn();
    const newTodo = { id: "1", content: "Test todo", edit: false };

    render(<EditTodo todo={newTodo} updateTodo={todoUp} />);

    const btnEl = screen.getByText("Cancel");

    fireEvent.click(btnEl);

    expect(todoUp).not.toHaveBeenCalled();
  });
});

describe("Edit Todo test", () => {
  it("cannot save modifications if the input is empty", () => {
    const todoUp = jest.fn();
    const newTodo = { id: "1", content: "Test todo", edit: false };

    render(<EditTodo todo={newTodo} updateTodo={todoUp} />);

    const btnEl = screen.getByText("Save");

    fireEvent.click(btnEl);

    expect(todoUp).not.toBeNull();
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import AddTodo from "./AddTodo";

describe("Add Todo test", () => {
  it("doesn't add the todo in the db if the input is empty", () => {
    const addSim = jest.fn();

    render(<AddTodo addTodo={addSim} />);

    const btnEl = screen.getByText("Add");

    fireEvent.click(btnEl);

    expect(addSim).not.toHaveBeenCalled();
  });
});

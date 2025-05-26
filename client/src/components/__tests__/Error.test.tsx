import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Error from "../Error/Error";

describe("Error", () => {
  it("renders the error image and message", () => {
    render(<Error />);

    const image = screen.getByAltText("error");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("height", "100");

    const text = screen.getByText("Oops something went wrong!");
    expect(text).toBeInTheDocument();
  });
});

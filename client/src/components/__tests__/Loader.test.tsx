import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Loader from "../Loader/Loader";

describe("Loader", () => {
  it("renders the loader image and loading text", () => {
    render(<Loader />);

    const image = screen.getByAltText("loader");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("width", "100");

    const text = screen.getByText("LOADING...");
    expect(text).toBeInTheDocument();
  });
});

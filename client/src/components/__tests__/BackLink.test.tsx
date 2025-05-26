import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BackLink from "../BackLink/BackLink";

describe("BackLink", () => {
  it("renders the children text and correct link", () => {
    render(
      <MemoryRouter>
        <BackLink to="/home">Go back</BackLink>
      </MemoryRouter>
    );

    expect(screen.getByText("Go back")).toBeInTheDocument();

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", "/home");
  });

  it("renders arrow and link with expected CSS classes", () => {
    render(
      <MemoryRouter>
        <BackLink to="/test">Back</BackLink>
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    const arrowDiv = link.querySelector("div:first-child");
    const textDiv = link.querySelector("div:last-child");

    expect(arrowDiv?.className).toContain("arrow");
    expect(arrowDiv?.className).toContain("left");
    expect(textDiv?.className).toContain("link");
  });
});

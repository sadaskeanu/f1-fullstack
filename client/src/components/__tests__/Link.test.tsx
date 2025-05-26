import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Link from "../Link/Link";

describe("Link component", () => {
  it("renders a react-router link with correct text, href, and class", () => {
    render(
      <MemoryRouter>
        <Link to="/drivers">See Drivers</Link>
      </MemoryRouter>
    );

    const linkElement = screen.getByText("See Drivers");

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/drivers");
  });
});

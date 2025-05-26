import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Heading from "../Heading/Heading";

describe("Heading component", () => {
  test("renders the correct heading level and text", () => {
    render(<Heading level={2}>Test Heading</Heading>);

    const heading = screen.getByRole("heading", { name: "Test Heading" });

    expect(heading).toBeTruthy();
    expect(heading.tagName).toBe("H2");
    expect(heading.className).toContain("heading");
  });
});

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Empty } from "../Empty/Empty";

describe("<Empty />", () => {
  it("renders with default message", () => {
    render(<Empty />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("renders with a custom message", () => {
    render(<Empty message="No races found" />);
    expect(screen.getByText("No races found")).toBeInTheDocument();
  });

  it("renders the image", () => {
    render(<Empty />);
    const img = screen.getByAltText("no data") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("empty.png");
  });
});

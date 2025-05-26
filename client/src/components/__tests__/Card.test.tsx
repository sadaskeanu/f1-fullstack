import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "../Card/Card";

vi.mock("../Card/Card.module.css", () => ({
  default: {
    card: "card",
    isHighlighted: "isHighlighted",
    column: "column",
    sideText: "sideText",
    arrow: "arrow",
    right: "right",
  },
}));

vi.mock("../Card/assets/trophy.png", () => ({
  default: "trophy.png",
}));
vi.mock("../Card/assets/flag.png", () => ({
  default: "flag.png",
}));

describe("Card component", () => {
  it("renders name, family name and team", () => {
    render(
      <Card
        name="Max"
        familyName="Verstappen"
        team="Red Bull Racing"
        icon="trophy"
      />
    );

    expect(screen.getByText("Max Verstappen")).toBeInTheDocument();
    expect(screen.getByText("Red Bull Racing")).toBeInTheDocument();
    expect(screen.getByAltText("icon")).toHaveAttribute("src", "trophy.png");
  });

  it("renders points and season if provided", () => {
    render(
      <Card
        name="Charles"
        familyName="Leclerc"
        team="Ferrari"
        icon="trophy"
        season={2024}
        points={192}
      />
    );

    expect(screen.getByText("season: 2024")).toBeInTheDocument();
    expect(screen.getByText("points: 192")).toBeInTheDocument();
  });

  it("renders race if provided", () => {
    render(
      <Card
        name="Lewis"
        familyName="Hamilton"
        team="Mercedes"
        icon="flag"
        race="Silverstone"
      />
    );

    expect(screen.getByText("race:")).toBeInTheDocument();
    expect(screen.getByText("Silverstone")).toBeInTheDocument();
  });

  it("renders arrow if withArrow is true", () => {
    const { container } = render(
      <Card
        name="Sebastian"
        familyName="Vettel"
        team="Aston Martin"
        icon="flag"
        withArrow
      />
    );

    const arrow = container.querySelector('[class*="arrow"]');
    expect(arrow).toBeTruthy();
  });

  it("applies isHighlighted class when true", () => {
    render(
      <Card
        name="Fernando"
        familyName="Alonso"
        team="Aston Martin"
        icon="trophy"
        isHighlighted
      />
    );

    const wrapper = screen.getByTestId("card");
    expect(wrapper.className.includes("isHighlighted")).toBe(true);
  });
});

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import WorldsChampions from "../WorldsChampions/WorldsChampions";
import * as useCachedDataHook from "../../hooks/useCachedData";
import type { WorldChampion } from "../../types/WorldChampionData";
import { MemoryRouter } from "react-router-dom";

describe("WorldsChampions page", () => {
  it("renders loader while loading", () => {
    vi.spyOn(useCachedDataHook, "useCachedData").mockReturnValue({
      data: null,
      isLoading: true,
      errorMessage: null,
    });

    render(
      <MemoryRouter>
        <WorldsChampions />
      </MemoryRouter>
    );

    expect(screen.getByAltText("loader")).toBeInTheDocument();
  });

  it("renders error when fetch fails", () => {
    vi.spyOn(useCachedDataHook, "useCachedData").mockReturnValue({
      data: null,
      isLoading: false,
      errorMessage: "Failed to fetch",
    });

    render(
      <MemoryRouter>
        <WorldsChampions />
      </MemoryRouter>
    );

    expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
  });

  it("renders list of world champions", () => {
    const mockData: WorldChampion[] = [
      {
        id: 1,
        driverId: "Max",
        name: "Max",
        familyName: "Verstappen",
        team: "Red Bull",
        season: 2023,
        points: 575,
      },
      {
        id: 2,
        driverId: "Lewis",
        name: "Lewis",
        familyName: "Hamilton",
        team: "Mercedes",
        season: 2020,
        points: 347,
      },
    ];

    vi.spyOn(useCachedDataHook, "useCachedData").mockReturnValue({
      data: mockData,
      isLoading: false,
      errorMessage: null,
    });

    render(
      <MemoryRouter>
        <WorldsChampions />
      </MemoryRouter>
    );

    expect(
      screen.getByText((content) => content.includes("Max Verstappen"))
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("Lewis Hamilton"))
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("Red Bull"))
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("Mercedes"))
    ).toBeInTheDocument();
  });
});

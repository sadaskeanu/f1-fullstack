import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Champions from "../RaceChampions/RaceChampions";
import * as useCachedDataHook from "../../hooks/useCachedData";
import type { RaceWinner } from "../../types/RaceChampionsData";

describe("Champions page", () => {
  it("renders loader while loading", () => {
    vi.spyOn(useCachedDataHook, "useCachedData").mockReturnValue({
      data: null,
      isLoading: true,
      errorMessage: null,
    });

    render(
      <MemoryRouter initialEntries={["/champions/2023"]}>
        <Routes>
          <Route path="/champions/:season" element={<Champions />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByAltText("loader")).toBeInTheDocument();
  });

  it("renders error state", () => {
    vi.spyOn(useCachedDataHook, "useCachedData").mockReturnValue({
      data: null,
      isLoading: false,
      errorMessage: "Something went wrong",
    });

    render(
      <MemoryRouter initialEntries={["/champions/2023"]}>
        <Routes>
          <Route path="/champions/:season" element={<Champions />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders champions list", () => {
    const mockData: RaceWinner[] = [
      {
        id: 1,
        season: 2023,
        race: "Monaco GP",
        driverId: "Max",
        driverName: "Max",
        driverFamilyName: "Verstappen",
        team: "Red Bull",
        isWorldChampion: true,
      },
      {
        id: 2,
        season: 2023,
        race: "British GP",
        driverId: "Lando",
        driverName: "Lando",
        driverFamilyName: "Norris",
        team: "McLaren",
        isWorldChampion: false,
      },
    ];

    vi.spyOn(useCachedDataHook, "useCachedData").mockReturnValue({
      data: mockData,
      isLoading: false,
      errorMessage: null,
    });

    render(
      <MemoryRouter initialEntries={["/champions/2023"]}>
        <Routes>
          <Route path="/champions/:season" element={<Champions />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("2023: RACES WINNERS")).toBeInTheDocument();
    expect(screen.getByText("Monaco GP")).toBeInTheDocument();
    expect(screen.getByText("British GP")).toBeInTheDocument();
  });
});

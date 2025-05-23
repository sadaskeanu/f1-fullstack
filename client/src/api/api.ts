import axios from "axios";
import type { WorldChampion } from "../types/WorldChampionData";
import type { RaceWinner } from "../types/RaceChampionsData";

const API_BASE = import.meta.env.VITE_API_BASE as string;

const apiClient = axios.create({ baseURL: API_BASE });

export async function fetchSeasons(): Promise<WorldChampion[]> {
  const response = await apiClient.get<WorldChampion[]>("/seasons");
  return response.data;
}

export async function fetchWinners(year: number): Promise<RaceWinner[]> {
  // Axios will throw if the HTTP status is not 2xx
  const response = await apiClient.get<RaceWinner[]>(`/${year}/winners`);
  return response.data;
}

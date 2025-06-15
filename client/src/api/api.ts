import axios from "axios";
import type { WorldChampion } from "../types/WorldChampionData";
import type { RaceWinner } from "../types/RaceChampionsData";

const API_BASE = import.meta.env.VITE_API_BASE as string;

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "x-api-key": import.meta.env.VITE_PUBLIC_API_KEY || "frontend-client",
  },
});

export async function getWorldChampions(): Promise<WorldChampion[]> {
  const response = await apiClient.get<WorldChampion[]>("/seasons");
  return response.data;
}

export async function getRaceChampions(year: number): Promise<RaceWinner[]> {
  const response = await apiClient.get<RaceWinner[]>(`/${year}/winners`);
  return response.data;
}

import type { Prisma } from "@prisma/client";

export type RaceChampionData = Prisma.RaceChampionUncheckedCreateInput;

export interface RaceResult {
  season: string;
  round: string;
  raceName: string;
  Results: Array<{
    Driver: {
      driverId: string;
      givenName: string;
      familyName: string;
    };
    Constructor: {
      name: string;
    };
  }>;
}

export interface RaceTable {
  season: string;
  Races: RaceResult[];
}

export interface RaceResponse {
  MRData: {
    RaceTable: RaceTable;
  };
}

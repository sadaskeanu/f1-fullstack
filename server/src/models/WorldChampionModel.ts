import type { Prisma } from "@prisma/client";

export type WorldChampionData = Prisma.WorldChampionUncheckedCreateInput;

export interface WorldChampionDriver {
  driverId: string;
  givenName: string;
  familyName: string;
}

export interface WorldChampionConstructor {
  name: string;
}

export interface WorldChampionStandingList {
  season: string;
  DriverStandings: Array<{
    Driver: WorldChampionDriver;
    Constructors: WorldChampionConstructor[];
    points: string;
    [key: string]: any;
  }>;
}

export interface WorldChampionResponse {
  MRData: {
    StandingsTable: {
      StandingsLists: WorldChampionStandingList[];
    };
  };
}

export interface ErgastDriver {
  driverId: string;
  givenName: string;
  familyName: string;
}

export interface ErgastConstructor {
  name: string;
}

export interface ErgastStandingList {
  season: string;
  DriverStandings: Array<{
    Driver: ErgastDriver;
    Constructors: ErgastConstructor[];
    points: string;
    [key: string]: any;
  }>;
}

export interface ErgastResponse {
  MRData: {
    StandingsTable: {
      StandingsLists: ErgastStandingList[];
    };
  };
}

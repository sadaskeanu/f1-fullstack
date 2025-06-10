import { useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRaceChampions } from "../../api/api";
import BackLink from "../../components/BackLink/BackLink";
import Heading from "../../components/Heading/Heading";
import Loader from "../../components/Loader/Loader";
import List from "../../components/List/List";
import Error from "../../components/Error/Error";
import Card from "../../components/Card/Card";
import { Empty } from "../../components/Empty/Empty";
import type { RaceWinner } from "../../types/RaceChampionsData";
import { useCachedData } from "../../hooks/useCachedData";

export default function Champions() {
  const { season } = useParams();
  const navigate = useNavigate();
  const year = Number(season);

  useEffect(() => {
    if (!season) navigate("/");
  }, [season, navigate]);

  const fetchRaceWinners = useCallback(() => {
    return getRaceChampions(year);
  }, [year]);

  const {
    data: champions,
    isLoading,
    errorMessage,
  } = useCachedData<RaceWinner[]>(`raceWinners:${year}`, fetchRaceWinners);

  if (errorMessage) return <Error message={errorMessage} />;
  if (!champions || isLoading) return <Loader />;

  if (champions.length === 0) {
    return <Empty message={`No race winners found for season ${season}.`} />;
  }

  return (
    <>
      <BackLink to="/">Back to World's Champions</BackLink>
      <Heading level={1}>{champions[0].season}: RACES WINNERS</Heading>
      <List>
        {champions.map((race) => {
          const isHighlighted = race.isWorldChampion;
          return (
            <li key={race.id}>
              <Card
                race={race.race}
                name={race.driverName}
                familyName={race.driverFamilyName}
                team={race.team}
                isHighlighted={isHighlighted}
                icon={isHighlighted ? "trophy" : "flag"}
              />
            </li>
          );
        })}
      </List>
    </>
  );
}

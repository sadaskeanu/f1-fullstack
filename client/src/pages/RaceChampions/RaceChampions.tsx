import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRaceChampions } from "../../api/api";
import BackLink from "../../components/BackLink/BackLink";
import Heading from "../../components/Heading/Heading";
import Loader from "../../components/Loader/Loader";
import List from "../../components/List/List";
import Error from "../../components/Error/Error";
import Card from "../../components/Card/Card";
import type { RaceWinner } from "../../types/RaceChampionsData";

export default function Champions() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [champions, setChampions] = useState<RaceWinner[] | null>(null);

  const { season } = useParams<{ season: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!season) {
      navigate("/");
      return;
    }

    const cacheKey = `raceWinners:${season}`;
    const ttlKey = `raceWinnersTTL:${season}`;
    const now = Date.now();
    const oneDayInMs = 24 * 60 * 60 * 1000;

    const cached = localStorage.getItem(cacheKey);
    const ttl = localStorage.getItem(ttlKey);

    if (cached && ttl && now < Number(ttl)) {
      setChampions(JSON.parse(cached));
      return;
    }

    setIsLoading(true);

    getRaceChampions(Number(season))
      .then((champions) => {
        setChampions(champions);
        localStorage.setItem(cacheKey, JSON.stringify(champions));
        localStorage.setItem(ttlKey, String(now + oneDayInMs));
      })
      .catch((err) => {
        const message =
          err?.message || "Failed to load race champions for this season.";
        setErrorMessage(message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [season, navigate]);

  if (errorMessage) return <Error message={errorMessage} />;

  if (!champions || isLoading) return <Loader />;

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

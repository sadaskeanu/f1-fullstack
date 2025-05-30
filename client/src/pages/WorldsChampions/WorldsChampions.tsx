import { useState, useEffect } from "react";
import { getWorldChampions } from "../../api/api";
import type { WorldChampion } from "../../types/WorldChampionData";
import Heading from "../../components/Heading/Heading";
import List from "../../components/List/List";
import Link from "../../components/Link/Link";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import Card from "../../components/Card/Card";

export default function WorldsChampions() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [worldChampions, setWorldChampions] = useState<WorldChampion[] | null>(
    null
  );

  useEffect(() => {
    const cacheKey = "worldChampions";
    const ttlKey = "worldChampionsTTL";
    const now = Date.now();
    const oneDayInMs = 24 * 60 * 60 * 1000;

    const cached = localStorage.getItem(cacheKey);
    const ttl = localStorage.getItem(ttlKey);

    if (cached && ttl && now < Number(ttl)) {
      setWorldChampions(JSON.parse(cached));
      return;
    }

    setIsLoading(true);

    getWorldChampions()
      .then((data) => {
        setWorldChampions(data);
        localStorage.setItem(cacheKey, JSON.stringify(data));
        localStorage.setItem(ttlKey, String(now + oneDayInMs));
      })
      .catch((err) => {
        setErrorMessage(err?.message || "Failed to load world champions.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (errorMessage) return <Error message={errorMessage} />;

  if (!worldChampions || isLoading) return <Loader />;
  return (
    <>
      <Heading level={1}>F1 WORLD CHAMPIONS</Heading>
      <List>
        {worldChampions.map((champion) => (
          <li key={champion.id}>
            <Link to={`/season/${champion.season}`}>
              <Card
                season={champion.season}
                name={champion.name}
                familyName={champion.familyName}
                team={champion.team}
                points={champion.points}
                icon="trophy"
                withArrow
              />
            </Link>
          </li>
        ))}
      </List>
    </>
  );
}

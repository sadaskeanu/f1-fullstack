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
  const [hasError, setHasError] = useState(false);
  const [worldChampions, setWorldChampions] = useState<WorldChampion[] | null>(
    null
  );

  useEffect(() => {
    setIsLoading(true);

    getWorldChampions()
      .then((worldChampions) => {
        setWorldChampions(worldChampions);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
      });
  }, []);

  if (hasError) return <Error />;

  if (!worldChampions || isLoading) return <Loader />;
  return (
    <>
      <Heading level={1}>F1 WORLD CHAMPIONS</Heading>
      <List>
        {worldChampions.map((champion) => (
          <li key={champion.driverId}>
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

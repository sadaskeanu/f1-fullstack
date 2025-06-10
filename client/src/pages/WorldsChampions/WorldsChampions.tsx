import { getWorldChampions } from "../../api/api";
import type { WorldChampion } from "../../types/WorldChampionData";
import Heading from "../../components/Heading/Heading";
import List from "../../components/List/List";
import Link from "../../components/Link/Link";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import Card from "../../components/Card/Card";
import { Empty } from "../../components/Empty/Empty";
import { useCachedData } from "../../hooks/useCachedData";

export default function WorldsChampions() {
  const {
    data: worldChampions,
    isLoading,
    errorMessage,
  } = useCachedData<WorldChampion[]>("worldChampions", getWorldChampions);

  if (errorMessage) return <Error message={errorMessage} />;
  if (!worldChampions || isLoading) return <Loader />;

  return (
    <>
      <Heading level={1}>F1 WORLD CHAMPIONS</Heading>

      {worldChampions.length === 0 ? (
        <Empty message="No world champions found" />
      ) : (
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
      )}
    </>
  );
}

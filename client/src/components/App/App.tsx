import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import { lazy } from "react";

const WorldsChampions = lazy(
  () => import("../../pages/WorldsChampions/WorldsChampions")
);
const RaceChampions = lazy(
  () => import("../../pages/RaceChampions/RaceChampions")
);

function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Routes>
          <Route index element={<WorldsChampions />} />
          <Route path="/season/:season" element={<RaceChampions />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

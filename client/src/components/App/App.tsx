import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import { lazy } from "react";

const WorldsChampions = lazy(
  () => import("../../pages/WorldsChampions/WorldsChampions")
);
const RaceChampions = lazy(
  () => import("../../pages/RaceChampions/RaceChampions")
);

function App() {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route index element={<WorldsChampions />} />
          <Route path="/season/:season" element={<RaceChampions />} />
        </Routes>
      </Router>
    </Layout>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WorldsChampions from "../../pages/WorldsChampions/WorldsChampions";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Routes>
          <Route index element={<WorldsChampions />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

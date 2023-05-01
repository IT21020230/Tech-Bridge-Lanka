import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// home pages
const Map = lazy(() => import("./TBL/pages/map/map.jsx"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path={process.env.PUBLIC_URL + "/"} element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;

import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// home pages
const Map = lazy(() => import("./TBL/pages/map/map.jsx"));
import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// User Register Page
const SignUp = lazy(() => import("./TBL/pages/user/signUp"));
const TestingUi = lazy(() => import("./TBL/pages/TestingUI/testingUI"));

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Homepages */}
          <Route
            path={process.env.PUBLIC_URL + "/SignUp"}
            element={<SignUp />}
          />
          <Route
            path={process.env.PUBLIC_URL + "/test"}
            element={<TestingUi />}
          />
          <Route path={process.env.PUBLIC_URL + "/map"} element={<Map />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

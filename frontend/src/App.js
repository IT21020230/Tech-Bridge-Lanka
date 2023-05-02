import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// User Register Page
const UserRegisterPage = lazy(() =>
  import("./TBL/pages/user/userRegisterPage")
);
const TestingUi = lazy(() => import("./TBL/pages/TestingUI/testingUI"));

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Homepages */}
          <Route
            path={process.env.PUBLIC_URL + "/UserRegister"}
            element={<UserRegisterPage />}
          />
          <Route
            path={process.env.PUBLIC_URL + "/test"}
            element={<TestingUi />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

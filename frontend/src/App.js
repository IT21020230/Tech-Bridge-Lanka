import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// User Register Page
const UserRegisterPage = lazy(() =>
  import("./TBL/pages/user/userRegisterPage")
);

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;

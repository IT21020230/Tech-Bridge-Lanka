import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// User Register Page
const SignUp = lazy(() => import("./TBL/pages/user/signUp"));

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;

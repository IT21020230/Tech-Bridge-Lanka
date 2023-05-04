import { lazy } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useAuthContext } from "./TBL/hooks/useAuthContext";

// import { SignUp } from "./TBL/pages/user/signUp";
// import { Login } from "./TBL/pages/user/login";
// import { TestingUi } from "./TBL/pages/TestingUI/testingUI";

// Signup Page
const SignUp = lazy(() => import("./TBL/pages/user/signUp"));
// Login Page
const Login = lazy(() => import("./TBL/pages/user/login"));
//Tset UI page
const TestingUi = lazy(() => import("./TBL/pages/TestingUI/testingUI"));

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <TestingUi /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to="/" />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/test"}
              element={<TestingUi />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
    // <Router>
    //   <div className="App">
    //     <Routes>
    //       {/* Signup */}
    //       <Route
    //         path={process.env.PUBLIC_URL + "/SignUp"}
    //         element={<SignUp />}
    //       />

    //       {/* Login */}
    //       <Route path={process.env.PUBLIC_URL + "/Login"} element={<Login />} />
    //     </Routes>
    //   </div>
    // </Router>
  );
}

export default App;

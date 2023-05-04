import { lazy } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useAuthContext } from "./TBL/hooks/useAuthContext";

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
            {/* <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            /> */}
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

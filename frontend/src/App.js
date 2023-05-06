import { lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.scss";
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

//community
const CreateCommunity = lazy(() =>
  import("./TBL/pages/Community/createCommunity")
);

//Accept or Decline blogs
const AcceptDeclineBlogsPage = lazy(() =>
  import("./TBL/pages/admin/AcceptDeclineBlogPage")
);
const AcceptMembersPage = lazy(() =>
  import("./TBL/pages/admin/AcceptMembersPage")
);
const CreateIssuesPage = lazy(() =>
  import("./TBL/pages/admin/CreateIssuesPage")
);
const IssuesToAcceptPage = lazy(() =>
  import("./TBL/pages/admin/IssuesToAcceptPage")
);

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

            <Route
              path={process.env.PUBLIC_URL + "/accept-decline-blogs-page"}
              element={<AcceptDeclineBlogsPage />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/accept-members-page"}
              element={<AcceptMembersPage />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/create-issues"}
              element={<CreateIssuesPage />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/issues-to-accept"}
              element={<IssuesToAcceptPage />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/createCommunity"}
              element={<CreateCommunity />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

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

//Accept or Decline blogs
const BlogListPage = lazy(() => import("./TBL/pages/admin/BlogListPage"))
const AcceptDeclineBlogsPage = lazy(() => import("./TBL/pages/admin/AcceptDeclineBlogPage"));
const VerifyUserCommunitiesListPage = lazy(() => import("./TBL/pages/admin/VerifyUserCommunitiesListPage"))
const VerifyUserCommunityPage = lazy(() => import("./TBL/pages/admin/VerifyUserCommunityPage"))
const CreateIssuesPage = lazy(() => import("./TBL/pages/admin/CreateIssuesPage"))
const IssuesListPage = lazy(() => import("./TBL/pages/admin/IssuesListPage"))
const IssuesToAcceptPage = lazy(() => import("./TBL/pages/admin/IssuesToAcceptPage"))
const AcceptDeclineUpcomingEventPage = lazy(() => import("./TBL/pages/admin/AcceptDeclineUpcomingEventPage"))
const UpcomingEventsPage = lazy(() => import("./TBL/pages/admin/UpcomingEventsPage"))
const CreateEventsPage = lazy(() => import("./TBL/pages/admin/CreateEventsPage"))

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
              path={process.env.PUBLIC_URL + "/blog-list-page"}
              element={<BlogListPage />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/accept-decline-blogs-page/:id"}
              element={<AcceptDeclineBlogsPage />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/verify-user-communities-list"}
              element={<VerifyUserCommunitiesListPage />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/verify-user-community/:id"}
              element={<VerifyUserCommunityPage />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/create-issues"}
              element={<CreateIssuesPage />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/issues-list-page"}
              element={<IssuesListPage />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/issues-to-accept/:id"}
              element={<IssuesToAcceptPage />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/accept-decline-upcoming-event/:id"}
              element={<AcceptDeclineUpcomingEventPage />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/upcoming-events-list"}
              element={<UpcomingEventsPage />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/create-events"}
              element={<CreateEventsPage />}
            />

           

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

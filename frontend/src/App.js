import { Suspense, lazy } from "react";

import AddPostPage from "./TBL/pages/blog/CreatePost";
import EditPostPage from "./TBL/pages/blog/EditPost";
import PostPage from "./TBL/pages/blog/PostPage";
import PostsPage from "./TBL/pages/blog/IndexPage";
import DistrictDataPage from "./TBL/pages/districtDataPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.scss";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

import { useAuthContext } from "./TBL/hooks/useAuthContext";

// import { SignUp } from "./TBL/pages/user/signUp";
// import { Login } from "./TBL/pages/user/login";
// import { TestingUi } from "./TBL/pages/TestingUI/testingUI";

// map pages
const Map = lazy(() => import("./TBL/pages/map/map.jsx"));
const MapLive = lazy(() => import("./TBL/pages/map/mapLive.jsx"));

// Signup Page
const SignUp = lazy(() => import("./TBL/pages/user/signUp"));

// Login Page
const Login = lazy(() => import("./TBL/pages/user/login"));

// View User Page
const ViewUser = lazy(() => import("./TBL/pages/user/viewUser"));

// Test UI page
const TestingUi = lazy(() => import("./TBL/pages/TestingUI/testingUI"));

// View Project
const ViewProject = lazy(() => import("./TBL/pages/project/viewProject"));

// View Event
const ViewEvent = lazy(() => import("./TBL/pages/event/viewEvent"));

// List Project
const ListProject = lazy(() => import("./TBL/pages/project/listProject"));

//List Event
const ListEvent = lazy(() => import("./TBL/pages/event/listEvent"));

// List Project
const Projects = lazy(() => import("./TBL/pages/project/projects"));

//List Event
const Events = lazy(() => import("./TBL/pages/event/events"));

//community
const CreateCommunity = lazy(() =>
  import("./TBL/pages/Community/createCommunitypage")
);
const Community = lazy(() => import("./TBL/pages/Community/communityPage"));
const CommunityList = lazy(() =>
  import("./TBL/pages/Community/communityListPage")
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
              path={process.env.PUBLIC_URL + "/test"}
              element={<TestingUi />}
            />
            <Route
              path="/"
              element={user ? <TestingUi /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to="/test" />}
            />
            <Route
              path="/viewUser"
              element={user ? <ViewUser /> : <Navigate to="/login" />}
            />

            {/* Udesh start */}
            {/* Homepages */}
            <Route
              path={process.env.PUBLIC_URL + "/posts"}
              element={<PostsPage />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/post/:id"}
              element={<PostPage />}
            />
            {/* <Route
            path={process.env.PUBLIC_URL + "/UserRegister"}
            element={<UserRegisterPage />}
          /> */}

            <Route
              path={process.env.PUBLIC_URL + "/add-post"}
              element={<AddPostPage />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/edit/:id"}
              element={<EditPostPage />}
            />

            <Route
              path={process.env.PUBLIC_URL + "dd-data"}
              element={<DistrictDataPage />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/edit/:id"}
              element={<EditPostPage />}
            />

            {/* Usesh end */}

            <Route
              path="/viewProject/:id"
              element={user ? <ViewProject /> : <Navigate to="/login" />}
            />
            <Route
              path="/viewEvent/:id"
              element={user ? <ViewEvent /> : <Navigate to="/login" />}
            />
            <Route
              path="/listProject"
              element={user ? <ListProject /> : <Navigate to="/test" />}
            />
            <Route
              path="/listEvent"
              element={user ? <ListEvent /> : <Navigate to="/login" />}
            />
            <Route
              path="/events"
              element={user ? <Events /> : <Navigate to="/login" />}
            />
            <Route path="/projects" element={<Projects />} />

            {/* <Route
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
            /> */}

            {/* Community */}

            {/* <Route
              path={process.env.PUBLIC_URL + "/createCommunity"}
              element={<CreateCommunity />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/community"}
              element={<Community />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/communityList"}
              element={<CommunityList />}

            /> */}


            <Route path={process.env.PUBLIC_URL + "/map"} element={<Map />} />
            <Route
              path={process.env.PUBLIC_URL + "/map-live"}
              element={<MapLive />}
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { Suspense, lazy } from "react";
import AddPostPage from "./TBL/pages/blog/CreatePost";
import EditPostPage from "./TBL/pages/blog/EditPost";
import PostPage from "./TBL/pages/blog/PostPage";
import PostsPage from "./TBL/pages/blog/IndexPage";
import DistrictDataPage from "./TBL/pages/districtDataPage";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useAuthContext } from "./TBL/hooks/useAuthContext";

const BlogListPage = lazy(() => import("./TBL/pages/admin/BlogListPage"));

const VerifyUserCommunityPage = lazy(() =>
  import("./TBL/pages/admin/VerifyUserCommunityPage")
);

const IssuesListPage = lazy(() => import("./TBL/pages/admin/IssuesListPage"));

const CreateProjectPage = lazy(() =>
  import("./TBL/pages/admin/CreateProjectPage")
);
const AdminHomePage = lazy(() => import("./TBL/pages/admin/AdminHomePage"));
// //Admin
// const Admin = lazy(() => import("./TBL-admin/pages/admin"));

//Add user
const AddUser = lazy(() => import("./TBL-admin/pages/addUser"));

//List user
const ListUser = lazy(() => import("./TBL-admin/pages/listUser"));

//Info user
const InfoUser = lazy(() => import("./TBL-admin/pages/infoUser"));

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

//List Project by comm ID
const ListProjectById = lazy(() =>
  import("./TBL/pages/project/listProjectById")
);

//List Event
const ListEvent = lazy(() => import("./TBL/pages/event/listEvent"));

//List Event by comm ID
const ListEventById = lazy(() => import("./TBL/pages/event/listEventById"));

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

const CreateIssuesPage = lazy(() =>
  import("./TBL/pages/admin/CreateIssuesPage")
);
const IssuesToAcceptPage = lazy(() =>
  import("./TBL/pages/admin/IssuesToAcceptPage")
);

const VerifyUserCommunitiesListPage = lazy(() =>
  import("./TBL/pages/admin/VerifyUserCommunitiesListPage")
);

const AcceptDeclineUpcomingEventPage = lazy(() =>
  import("./TBL/pages/admin/AcceptDeclineUpcomingEventPage")
);
const UpcomingEventsPage = lazy(() =>
  import("./TBL/pages/admin/UpcomingEventsPage")
);
const CreateEventsPage = lazy(() =>
  import("./TBL/pages/admin/CreateEventsPage")
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
              path="/admin"
              element={user ? <AdminHomePage /> : <Navigate to="/login" />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/"}
              element={<TestingUi />}
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
              path="/addUser"
              element={user ? <AddUser /> : <Navigate to="/login" />}
            />
            <Route
              path="/listUser"
              element={user ? <ListUser /> : <Navigate to="/login" />}
            />
            <Route
              path="/infoUser/:id"
              element={user ? <InfoUser /> : <Navigate to="/login" />}
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
              element={user ? <AddPostPage /> : <Navigate to="/login" />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/edit/:id"}
              element={user ? <EditPostPage /> : <Navigate to="/login" />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/dd-data"}
              element={<DistrictDataPage />}
            />

            {/* Usesh end */}

            <Route
              path="/viewProject/:id"
              element={user ? <ViewProject /> : <Navigate to="/login" />}
            />
            <Route
              path="/viewProjectById/:id"
              element={user ? <ListProjectById /> : <Navigate to="/login" />}
            />
            <Route
              path="/viewEvent/:id"
              element={user ? <ViewEvent /> : <Navigate to="/login" />}
            />
            <Route
              path="/viewEventById/:id"
              element={user ? <ListEventById /> : <Navigate to="/login" />}
            />
            <Route
              path="/listProject"
              element={user ? <ListProject /> : <Navigate to="/test" />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/listEvent"}
              element={<ListEvent />}
            />
            <Route
              path="/events"
              element={user ? <Events /> : <Navigate to="/login" />}
            />
            <Route path="/projects" element={<Projects />} />

            <Route
              path={process.env.PUBLIC_URL + "/test"}
              element={<TestingUi />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/accept-decline-blogs-page"}
              element={<AcceptDeclineBlogsPage />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/verify-user-communities-list"}
              element={<VerifyUserCommunitiesListPage />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/create-issues"}
              element={<CreateIssuesPage />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/issues-to-accept"}
              element={<IssuesToAcceptPage />}
            />

            {/* Community */}

            <Route
              path="/community/:id"
              element={user ? <Community /> : <Navigate to="/login" />}
            />

            <Route
              path="/createCommunity"
              element={user ? <CreateCommunity /> : <Navigate to="/login" />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/communityList"}
              element={<CommunityList />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/map"}
              element={user ? <Map /> : <Navigate to="/login" />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/map-live"}
              element={<MapLive />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/accept-decline-upcoming-event"}
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
              path={
                process.env.PUBLIC_URL + "/accept-decline-upcoming-event/:id"
              }
              element={<AcceptDeclineUpcomingEventPage />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/upcoming-events-list"}
              element={<UpcomingEventsPage />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/create-events/:id"}
              element={<CreateEventsPage />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/create-project/:id"}
              element={<CreateProjectPage />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/admin"}
              element={<AdminHomePage />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

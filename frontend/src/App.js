import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddPostPage from "./TBL/pages/blog/CreatePost";
import EditPostPage from "./TBL/pages/blog/EditPost";
import PostPage from "./TBL/pages/blog/PostPage"
import PostsPage from "./TBL/pages/blog/IndexPage"

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
            path={process.env.PUBLIC_URL + "/posts"}
            element={<PostsPage />}
          />

          <Route
            path={process.env.PUBLIC_URL + "/post/:id"}
            element={<PostPage />}
          />
          <Route
            path={process.env.PUBLIC_URL + "/UserRegister"}
            element={<UserRegisterPage />}
          />

          <Route
            path={process.env.PUBLIC_URL + "/add-post"}
            element={<AddPostPage />}
          />

          <Route
            path={process.env.PUBLIC_URL + "/edit/:id"}
            element={<EditPostPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

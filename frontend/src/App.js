import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddPostPage from "./TBL/pages/blog/addPostPage";
import EditPostPage from "./TBL/pages/blog/editPostPage";

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

          <Route
            path={process.env.PUBLIC_URL + "/add-post"}
            element={<AddPostPage />}
          />

          <Route
            path={process.env.PUBLIC_URL + "/edit-post"}
            element={<EditPostPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import MyBlogs from "./pages/blogList/myblogs/MyBlogs";
import MyFeed from "./pages/blogList/myfeed/MyFeed";
import Blog from "./pages/blogView/Blog";
import CreateBlog from "./pages/blogCreate/CreateBlog";
import UpdateBlog from "./pages/blogUpdate/UpdateBlog";
import Header from "./pages/components/Header";
import Bookmarked from "./pages/bookmarks/Bookmarked";
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";
import ProtectedRoute from '@/components/routes/ProtectedRoute';
import useUserStore from '@/store/userStore';
import { useEffect } from "react";
import SelectInterest from "./pages/auth/interests/SelectInterest";

function App() {

 
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route
            path="/blog/myblogs"
            element={
              <ProtectedRoute>
                <MyBlogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/myfeed"
            element={
              <ProtectedRoute>
                <MyFeed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/create"
            element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            }
          />
          <Route path="/blog/view/:id" Component={Blog} />
          <Route
            path="/blog/update/:id"
            element={
              <ProtectedRoute>
                <UpdateBlog />
              </ProtectedRoute>
            }
          />
          <Route path="/blog/bookmarks" Component={Bookmarked} />
          <Route path="/auth/register" Component={Register} />
          <Route path="auth/login" Component={Login} />
          <Route path="/auth/interests" Component={SelectInterest}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

 
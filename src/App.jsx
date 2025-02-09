import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import MyBlogs from "./pages/blogList/MyBlogs";
import Blog from "./pages/blogView/Blog";
import CreateBlog from "./pages/blogCreate/CreateBlog";
import UpdateBlog from "./pages/blogUpdate/UpdateBlog";
import Header from "./pages/components/Header";
import Bookmarked from "./pages/bookmarks/Bookmarked";
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";

function App() {
  return (
    <div>
    
      <BrowserRouter>
      <Header/>
        <Routes>
            <Route path="/" Component={LandingPage}></Route>
            <Route path="/myblogs" Component={MyBlogs}></Route>
            <Route path="/blog/create" Component={CreateBlog}></Route>
            <Route path="/blog/view/:id" Component={Blog}></Route>
            <Route path="/blog/update/:id" Component={UpdateBlog}></Route>
            <Route path="/blog/bookmarks" Component={Bookmarked}></Route>
            <Route path="/auth/register" Component={Register}></Route>
            <Route path="auth/login" Component={Login}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import MyBlogs from "./pages/blogList/MyBlogs";
import Blog from "./pages/blogView/Blog";
import CreateBlog from "./pages/blogCreate/CreateBlog";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" Component={LandingPage}></Route>
            <Route path="/myblogs" Component={MyBlogs}></Route>
            <Route path="/blog/create" Component={CreateBlog}></Route>
            <Route path="/blog/view/:id" Component={Blog}></Route>
            <Route path="/blog/update/:id" Component={CreateBlog}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

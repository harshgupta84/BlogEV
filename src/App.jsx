import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import MyBlogs from "./pages/blogList/MyBlogs";
import Blog from "./pages/blogView/Blog";
import CreateBlog from "./pages/blogCreate/CreateBlog";
import UpdateBlog from "./pages/blogUpdate/UpdateBlog";
import Header from "./pages/components/Header";
import MyNotes from "./pages/noteList/MyNotes";
import Blogview  from "./pages/Blogview/Blogview";
import CreateBlog from "./pages/CreateBlog/CreateBlog";
import BlogView from "./pages/Blogview/Blogview";
import Blogview from "./pages/Blogview/Blogview";

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
            <Route path="/mynotes" Component={MyNotes}></Route>
            <Route path="/CreateBlog" Component={CreateBlog}></Route>
            <Route path="/blog/view/:id" element={<Blogview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

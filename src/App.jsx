import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import MyNotes from "./pages/noteList/MyNotes";
import Blogview  from "./pages/Blogview/Blogview";
import CreateBlog from "./pages/CreateBlog/CreateBlog";
import BlogView from "./pages/Blogview/Blogview";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          
            <Route path="/" Component={LandingPage}></Route>
            <Route path="/mynotes" Component={MyNotes}></Route>
            <Route path="/CreateBlog" Component={CreateBlog}></Route>
            <Route path="/blog/view/:id" element={<Blogview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

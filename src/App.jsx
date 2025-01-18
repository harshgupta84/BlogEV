import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import MyNotes from "./pages/noteList/MyNotes";
import Note from "./pages/noteView/Note";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          
            <Route path="/" Component={LandingPage}></Route>
            <Route path="/mynotes" Component={MyNotes}></Route>
            <Route path="/blog/view/:id" Component={Note}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

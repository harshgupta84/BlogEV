import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          
            <Route path="/" Component={LandingPage}></Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

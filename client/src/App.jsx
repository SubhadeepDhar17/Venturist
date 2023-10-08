import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/JSX/Home";
import { SignUp } from "./pages/JSX/SignUp";
import { Login } from "./pages/JSX/Login";
import { PitchIdeas } from "./pages/JSX/PitchIdeas";
import { PleaseLogin } from "./pages/JSX/PleaseLogin";
import { Pitches } from "./pages/JSX/Pitches";
import { Profile } from "./pages/JSX/Profile";
import Post from "./pages/JSX/Post";
import JobDesc from "./pages/JSX/JobDesc";

function App() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/pitches" element={<Pitches />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobdesc/:id" element={<JobDesc />} />
          
          {cookies.access_token === "" ||
          cookies.access_token === undefined ||
          cookies.access_token === "undefined" ? (
            <>
              <Route path="/pitch-ideas" element={<PleaseLogin />} />
              <Route path="/profile" element={<PleaseLogin />} />
              <Route path="/post/:id" element={<PleaseLogin />} />
            </>
          ) : (
            <>
              <Route path="/pitch-ideas" element={<PitchIdeas />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/post/:id" element={<Post />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

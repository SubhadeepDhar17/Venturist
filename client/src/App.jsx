import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/JSX/Home";
import { SignUp } from "./pages/JSX/SignUp";
import { Login } from "./pages/JSX/Login";
import { PitchIdeas } from "./pages/JSX/PitchIdeas";
import { PleaseLogin } from "./pages/JSX/PleaseLogin";
import { Pitches } from "./pages/JSX/Pitches";

function App() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  console.log(cookies);
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/pitches" element={<Pitches />} />
          <Route path="/login" element={<Login />} />
          {cookies.access_token === "" ||
          cookies.access_token === undefined ||
          cookies.access_token === "undefined" ? (
            <>
              <Route path="/pitch-ideas" element={<PleaseLogin />} />
            </>
          ) : (
            <>
              <Route path="/pitch-ideas" element={<PitchIdeas />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

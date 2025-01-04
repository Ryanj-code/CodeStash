import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./UserContext";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Library from "./pages/Library";
import AddSnippet from "./pages/AddSnippet";
import EditSnippet from "./pages/EditSnippet";
import SnippetDetail from "./pages/SnippetDetail";
import axios from "axios";
import "./App.css";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/library" element={<Library />} />
          <Route path="/add" element={<AddSnippet />} />
          <Route path="/edit/:snippetid" element={<EditSnippet />} />
          <Route path="/snippet/:snippetid" element={<SnippetDetail />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;

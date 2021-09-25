import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Signup from "./Pages/Signup/Signup";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Pages/Login/Login";
import "./App.css"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import SharePost from "./Pages/SharePost/SharePost";
import EditProfile from "./Pages/EditProfile/EditProfile";
import { useContext } from "react";
import { UserContext } from "./Context/UserContext";


function App() {
  const { user } = useContext(UserContext)
  return (
    <Router>

      <Route exact path="/">
        {user ? 
      <Home/> : <Login/>
        }
      </Route>

      <Route exact path="/profile/:username">
      {user ? 
      <Profile/> : <Login/>
        }
      </Route>

      <Route exact path="/register">
        {user ? <Redirect to="/" /> : <Signup/> }
      </Route>

      <Route exact path="/login">
      {user ? <Redirect to="/" /> : <Login/> }
      </Route>

      <Route exact path="/share">
      <SharePost user={user}/>
      </Route>

      <Route exact path="/edit/:username">
      <Navbar/>
      <EditProfile user={user}/>
      </Route>

    </Router>
  );
}

export default App;

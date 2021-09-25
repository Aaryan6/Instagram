import React, { useContext } from "react";
import "./Sidebar.css"
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const Sidebar = () => {
  const { user } = useContext(UserContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className="sidebarContainer">

      <div className="sidebar">
        <div className="profile">
          <div>
            <Link to={`/profile/${user.username}`} style={{ textDecoration: "none", cursor: "pointer" }}>
              <div className="rounded-image">
                <img src={user.profilePicture ? PF + user.profilePicture : PF + "avatar2.png"} alt="" />
              </div>
            </Link>
            <Link to={`/profile/${user.username}`} style={{ textDecoration: "none", cursor: "pointer" }}>
              <div className="profileInfo">
                <p className="profileName">{user.username}</p>
                <p className="subtitle1">{user.subtitle}</p>
              </div>
            </Link>
          </div>
          <a href="/" className="profileSwitch">Switch</a>
        </div>


        <div className="suggestPeople">
          <span variant="subtitle2" className="suggest">
            Suggestions For You
          </span>
          <span variant="subtitle2" className="seeAll">
            See All
          </span>
        </div>
        <div className="peopleProfile">
          <Link to="/profile">
            <div className="rounded-image">
              <img src={PF + "avatar3.png"} alt="avatar" />
            </div>
          </Link>
          <Link to="/profile">
            <div className="peopleInfo">
              <p className="peopleName">Nikky_Patel</p>
              <p className="follows">Follows you</p>
            </div>
          </Link>
          <a href="/">Follow</a>
        </div>

        <div className="peopleProfile">
          <Link to="/profile">
            <div className="rounded-image">
              <img src={PF + "avatar3.png"} alt="avatar" />
            </div>
          </Link>
          <Link to="/profile">
            <div className="peopleInfo">
              <p className="peopleName">Nikky_Patel</p>
              <p className="follows">Follows you</p>
            </div>
          </Link>
          <a href="/">Follow</a>
        </div>

        <div className="peopleProfile">
          <Link to="">
            <div className="rounded-image">
              <img src={PF + "avatar3.png"} alt="avatar" />
            </div>
          </Link>
          <Link to="">
            <div className="peopleInfo">
              <p className="peopleName">Nikky_Patel</p>
              <p className="follows">Follows you</p>
            </div>
          </Link>
          <a href="/">Follow</a>
        </div>

        <div className="peopleProfile">
          <Link to="/">
            <div className="rounded-image">
              <img src={PF + "avatar3.png"} alt="avatar" />
            </div>
          </Link>
          <Link to="">
            <div className="peopleInfo">
              <p className="peopleName">Nikky_Patel</p>
              <p className="follows">Follows you</p>
            </div>
          </Link>
          <a href="/">Follow</a>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;

import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import "./Profile.css";
import axios from "axios";
import { Add } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Close } from "@material-ui/icons";
import Navbar from "../../Components/Navbar/Navbar";
import MyPosts from "../../Components/MyPosts/MyPosts";
import Followers from "../../Components/Followers/Followers";
import Followings from "../../Components/Followings/Followings";
import { UserContext } from "../../Context/UserContext";

const Profile = () => {
  const { user: currentUser, dispatch } = useContext(UserContext);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const username = useParams().username;
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [showFr, setShowFr] = useState(false);
  const [showFl, setShowFl] = useState(false);
  const [followed, setFollowed] = useState(false);

  useEffect(()=>{
    setFollowed(currentUser.followings.includes(user._id))
  },[currentUser.followings,user._id])

  // user details
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchData();
  }, [username]);

  // posts
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/posts/profile/${username}`);
      setPosts(res.data.sort((p1, p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }));
    };
    fetchPosts();
  }, [username]);

  // followers
  useEffect(() => {
    const fetchfollowers = async () => {
      const res = await axios.get(`/users/followers/${user.username}`);
      setFollowers(res.data);
    };
    fetchfollowers();
  }, [user.username]);

  // followings
  useEffect(() => {
    const fetchfollowings = async () => {
      const res = await axios.get(`/users/followings/${user.username}`);
      setFollowings(res.data);
    };
    fetchfollowings();
  }, [user.username]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const showFrbox = () => {
    setShowFr(true);
  };
  const hideFrbox = () => {
    setShowFr(false);
  };
  const showFlbox = () => {
    setShowFl(true);
  };
  const hideFlbox = () => {
    setShowFl(false);
  };

  // unfollow user
  const handleFollow = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  };

  return (
    <>
      <Navbar />
      <Link to="/share">
        <Add className="add-icon" />
      </Link>
      <div className="profile-container">
        <div className="profile-details">
          <div className="rounded-image">
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "avatar2.png"
              }
              alt=""
            />
          </div>
          <div className="content">
            <div className="title">
              <span>{user.username}</span>
              {currentUser.username === username ?
                <>
                  <Link to={`/edit/${user.username}`} style={{ textDecoration: "none" }}>
                    <button>Edit Profile</button>
                  </Link>
                  <svg
                    aria-label="Options"
                    className="_8-yf5 "
                    color="#262626"
                    fill="#262626"
                    height="24"
                    role="img"
                    viewBox="0 0 48 48"
                    width="24"
                  >
                    <path
                      clipRule="evenodd"
                      d="M46.7 20.6l-2.1-1.1c-.4-.2-.7-.5-.8-1-.5-1.6-1.1-3.2-1.9-4.7-.2-.4-.3-.8-.1-1.2l.8-2.3c.2-.5 0-1.1-.4-1.5l-2.9-2.9c-.4-.4-1-.5-1.5-.4l-2.3.8c-.4.1-.8.1-1.2-.1-1.4-.8-3-1.5-4.6-1.9-.4-.1-.8-.4-1-.8l-1.1-2.2c-.3-.5-.8-.8-1.3-.8h-4.1c-.6 0-1.1.3-1.3.8l-1.1 2.2c-.2.4-.5.7-1 .8-1.6.5-3.2 1.1-4.6 1.9-.4.2-.8.3-1.2.1l-2.3-.8c-.5-.2-1.1 0-1.5.4L5.9 8.8c-.4.4-.5 1-.4 1.5l.8 2.3c.1.4.1.8-.1 1.2-.8 1.5-1.5 3-1.9 4.7-.1.4-.4.8-.8 1l-2.1 1.1c-.5.3-.8.8-.8 1.3V26c0 .6.3 1.1.8 1.3l2.1 1.1c.4.2.7.5.8 1 .5 1.6 1.1 3.2 1.9 4.7.2.4.3.8.1 1.2l-.8 2.3c-.2.5 0 1.1.4 1.5L8.8 42c.4.4 1 .5 1.5.4l2.3-.8c.4-.1.8-.1 1.2.1 1.4.8 3 1.5 4.6 1.9.4.1.8.4 1 .8l1.1 2.2c.3.5.8.8 1.3.8h4.1c.6 0 1.1-.3 1.3-.8l1.1-2.2c.2-.4.5-.7 1-.8 1.6-.5 3.2-1.1 4.6-1.9.4-.2.8-.3 1.2-.1l2.3.8c.5.2 1.1 0 1.5-.4l2.9-2.9c.4-.4.5-1 .4-1.5l-.8-2.3c-.1-.4-.1-.8.1-1.2.8-1.5 1.5-3 1.9-4.7.1-.4.4-.8.8-1l2.1-1.1c.5-.3.8-.8.8-1.3v-4.1c.4-.5.1-1.1-.4-1.3zM24 41.5c-9.7 0-17.5-7.8-17.5-17.5S14.3 6.5 24 6.5 41.5 14.3 41.5 24 33.7 41.5 24 41.5z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </>
                :
                <button className="follow-button" onClick={handleFollow}>
                  {followed ? "Unfollow" : "Follow"}
                </button>
              }
            </div>
            <div className="figures">
              <span>
                <b>{posts.length}</b> posts
              </span>
              <span onClick={showFrbox}>
                <b>{followers.length}</b> followers
              </span>
              <span onClick={showFlbox}>
                <b>{followings.length}</b> following
              </span>
            </div>
            <div className="subtitle1">
              <p>{user.subtitle}</p>
            </div>
            <div className="subtitle2">
              <p>{user.work}</p>
            </div>
            <div className="desc">
              <p>{user.desc}</p>
              <a href={user.link}>{user.link}</a>
            </div>
          </div>
        </div>

        <div className="stories">
          <div className="story-box">
            <div className="rounded-image">
              <img src={PF + "U.jpg"} alt="" />
            </div>
            <div className="caption">
              <p>Foods</p>
            </div>
          </div>
          <div className="story-box">
            <div className="rounded-image">
              <img src={PF + "U.jpg"} alt="" />
            </div>
            <div className="caption">
              <p>Foods</p>
            </div>
          </div>
          <div className="story-box">
            <div className="rounded-image">
              <img src={PF + "U.jpg"} alt="" />
            </div>
            <div className="caption">
              <p>Foods</p>
            </div>
          </div>
          <div className="story-box">
            <div className="rounded-image">
              <img src={PF + "U.jpg"} alt="" />
            </div>
            <div className="caption">
              <p>Foods</p>
            </div>
          </div>
          <div className="story-box">
            <div className="rounded-image">
              <img src={PF + "U.jpg"} alt="" />
            </div>
            <div className="caption">
              <p>Foods</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="categories">
          {/* color: #262626, #8e8e8e for icon */}
          <div className="category">
            <svg
              aria-label=""
              className="_8-yf5 "
              color="#262626"
              fill="#262626"
              height="12"
              role="img"
              viewBox="0 0 48 48"
              width="12"
            >
              <path
                clipRule="evenodd"
                d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z"
                fillRule="evenodd"
              ></path>
            </svg>
            <span>Posts</span>
          </div>
          <div className="category">
            <svg
              aria-label=""
              className="_8-yf5 "
              color="#8e8e8e"
              fill="#8e8e8e"
              height="12"
              role="img"
              viewBox="0 0 48 48"
              width="12"
            >
              <path d="M31.5 28.2l-11.2-6.5c-.5-.3-1-.3-1.5 0-.5.2-.8.7-.8 1.3v13c0 .5.3 1 .8 1.3.2.1.5.2.7.2.3 0 .5-.1.8-.2l11.2-6.5c.5-.3.7-.8.7-1.3s-.3-1-.7-1.3zM43.9 4c-2.5-2.4-5.5-4-12.2-4H16.2C9.6 0 6.6 1.6 4 4.1 1.6 6.6 0 9.6 0 16.2v15.5c0 6.6 1.6 9.7 4.1 12.2 2.5 2.4 5.5 4 12.2 4h15.5c6.6 0 9.7-1.6 12.2-4.1 2.4-2.5 4-5.5 4-12.2V16.2c0-6.6-1.6-9.6-4.1-12.2zM31.8 3c6.3 0 8.4 1.6 10 3.2 1.2 1.2 2.3 2.7 2.9 5.8h-9.3l-5.1-9h1.5zM16.2 3h10.5l5.1 9h-12l-5.1-9h1.5zm-10 3.2C7.3 5.1 8.7 4 11.5 3.4l4.9 8.6H3.3C3.9 8.9 5 7.4 6.2 6.2zM45 31.8c0 6.3-1.6 8.4-3.2 10-1.6 1.6-3.8 3.2-10 3.2H16.2c-6.3 0-8.4-1.6-10-3.2C4.6 40.2 3 38 3 31.8V15h42v16.8z"></path>
            </svg>
            <span>Reels</span>
          </div>
          <div className="category">
            <svg
              aria-label=""
              className="_8-yf5 "
              color="#8e8e8e"
              fill="#8e8e8e"
              height="12"
              role="img"
              viewBox="0 0 48 48"
              width="12"
            >
              <path d="M41 10c-2.2-2.1-4.8-3.5-10.4-3.5h-3.3L30.5 3c.6-.6.5-1.6-.1-2.1-.6-.6-1.6-.5-2.1.1L24 5.6 19.7 1c-.6-.6-1.5-.6-2.1-.1-.6.6-.7 1.5-.1 2.1l3.2 3.5h-3.3C11.8 6.5 9.2 7.9 7 10c-2.1 2.2-3.5 4.8-3.5 10.4v13.1c0 5.7 1.4 8.3 3.5 10.5 2.2 2.1 4.8 3.5 10.4 3.5h13.1c5.7 0 8.3-1.4 10.5-3.5 2.1-2.2 3.5-4.8 3.5-10.4V20.5c0-5.7-1.4-8.3-3.5-10.5zm.5 23.6c0 5.2-1.3 7-2.6 8.3-1.4 1.3-3.2 2.6-8.4 2.6H17.4c-5.2 0-7-1.3-8.3-2.6-1.3-1.4-2.6-3.2-2.6-8.4v-13c0-5.2 1.3-7 2.6-8.3 1.4-1.3 3.2-2.6 8.4-2.6h13.1c5.2 0 7 1.3 8.3 2.6 1.3 1.4 2.6 3.2 2.6 8.4v13zM34.6 25l-9.1 2.8v-3.7c0-.5-.2-.9-.6-1.2-.4-.3-.9-.4-1.3-.2l-11.1 3.4c-.8.2-1.2 1.1-1 1.9.2.8 1.1 1.2 1.9 1l9.1-2.8v3.7c0 .5.2.9.6 1.2.3.2.6.3.9.3.1 0 .3 0 .4-.1l11.1-3.4c.8-.2 1.2-1.1 1-1.9s-1.1-1.2-1.9-1z"></path>
            </svg>
            <span>IGTV</span>
          </div>
          <div className="category">
            <svg
              aria-label=""
              className="_8-yf5 "
              color="#8e8e8e"
              fill="#8e8e8e"
              height="12"
              role="img"
              viewBox="0 0 48 48"
              width="12"
            >
              <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
            </svg>
            <span>Saved</span>
          </div>
          <div className="category">
            <svg
              aria-label=""
              className="_8-yf5 "
              color="#8e8e8e"
              fill="#8e8e8e"
              height="12"
              role="img"
              viewBox="0 0 48 48"
              width="12"
            >
              <path d="M41.5 5.5H30.4c-.5 0-1-.2-1.4-.6l-4-4c-.6-.6-1.5-.6-2.1 0l-4 4c-.4.4-.9.6-1.4.6h-11c-3.3 0-6 2.7-6 6v30c0 3.3 2.7 6 6 6h35c3.3 0 6-2.7 6-6v-30c0-3.3-2.7-6-6-6zm-29.4 39c-.6 0-1.1-.6-1-1.2.7-3.2 3.5-5.6 6.8-5.6h12c3.4 0 6.2 2.4 6.8 5.6.1.6-.4 1.2-1 1.2H12.1zm32.4-3c0 1.7-1.3 3-3 3h-.6c-.5 0-.9-.4-1-.9-.6-5-4.8-8.9-9.9-8.9H18c-5.1 0-9.4 3.9-9.9 8.9-.1.5-.5.9-1 .9h-.6c-1.7 0-3-1.3-3-3v-30c0-1.7 1.3-3 3-3h11.1c1.3 0 2.6-.5 3.5-1.5L24 4.1 26.9 7c.9.9 2.2 1.5 3.5 1.5h11.1c1.7 0 3 1.3 3 3v30zM24 12.5c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6 9.6-4.3 9.6-9.6-4.3-9.6-9.6-9.6zm0 16.1c-3.6 0-6.6-2.9-6.6-6.6 0-3.6 2.9-6.6 6.6-6.6s6.6 2.9 6.6 6.6c0 3.6-3 6.6-6.6 6.6z"></path>
            </svg>
            <span>Tagges</span>
          </div>
        </div>
        <div className="posts">
          {posts.map((post) => {
            return <MyPosts post={post} key={post._id} />;
          })}
        </div>
      </div>

      {/* followers */}
      {showFr && (
        <div className="followers">
          <div className="header">
            <span className="heading">Followers</span>
            <Close onClick={hideFrbox} />
          </div>
          <hr className="hr" />
          <div className="peoples">
            {followers.map((follower) => (
              <Followers follower={follower} key={follower._id} />
            ))}
          </div>
        </div>
      )}

      {/* followings */}
      {showFl && (
        <div className="followings">
          <div className="header">
            <span className="heading">Followings</span>
            <Close onClick={hideFlbox} />
          </div>
          <hr className="hr" />
          <div className="peoples">
            {followings.map((following) => (
              <Followings following={following} key={following._id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

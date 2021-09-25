import React, { useContext, useEffect, useState } from "react";
import { MoreHoriz, Delete, Edit } from "@material-ui/icons";
import "./Post.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";

const Posts = ({ post }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(UserContext);
  const [user, setUser] = useState({});
  const [ like, setLike ] = useState(post.likes.length)
  const [ isliked, setIsliked ] = useState(false)

  useEffect(()=>{
    setIsliked(post.likes.includes(currentUser._id))
  },[post.likes, currentUser._id])
  // fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUsers();
  }, [post.userId]);

  // delete post
  const deletePost = async (id) => {
    try {
      await axios.delete(`/posts/${id}`, { userId: currentUser._id })
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  // like & dislike post
  const handleLike = async (id) => {
    try {
      await axios.put(`/posts/${id}/like`, { userId: currentUser._id })
      setLike(isliked ? like - 1 : like + 1 )
      setIsliked(!isliked)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="post-card">
        <div className="card-header">
          <div>
            <Link
              to={`/profile/${user.username}`}
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                color: "#000",
              }}
            >
              <div className="rounded-image">
                <img
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "avatar3.png"
                  }
                  alt=""
                />
              </div>
              <span>{user.username}</span>
            </Link>
          </div>
          <div className="header-menu">
            <MoreHoriz id="deleteButton" />
            {post.userId === currentUser._id &&
              <div className="options">
                <span><Edit /> Edit</span>
                <span onClick={() => deletePost(post._id)}><Delete /> Delete</span>
              </div>
            }
          </div>
        </div>
        <div className="post-image">
          <img src={PF + post.image} alt="" />
        </div>
        <div className="actionButton">
          <div>
            {isliked ?
              <svg aria-label="Unlike" onClick={() => handleLike(post._id)} className="buttons" color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
              :
              <svg
                aria-label="Like"
                className="buttons"
                fill="#262626"
                height="24"
                role="img"
                viewBox="0 0 48 48"
                width="24"
                onClick={() => handleLike(post._id)}
              >
                <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
              </svg>

            }
            <svg
              aria-label="Comment"
              className="buttons"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 48 48"
              width="24"
            >
              <path
                clipRule="evenodd"
                d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
                fillRule="evenodd"
              ></path>
            </svg>
            <svg
              aria-label="Share Post"
              className="buttons"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 48 48"
              width="24"
            >
              <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
            </svg>
          </div>
          <svg
            aria-label="Save"
            className="saved"
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 48 48"
            width="24"
          >
            <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
          </svg>
        </div>
        <div className="card-content">
          <div className="likeCaption">
            <div className="rounded-image">
              <img src={PF + "avatar3.png"} alt="" />
            </div>
            <span>
              Likes <b>{like}</b>
            </span>
          </div>
          <div className="post-desc">
            <p>
              <b>{user.username}</b> {post.desc}
            </p>
            <span className="more"> ...more</span>
          </div>
          <div className="post-comments">
            <p>View all 0 comments</p>
            <div className="comment">
              <p>
                {" "}
                <a href="/" className="tagPeople">
                  @Mukesh_Ambani
                </a>
                ✍
              </p>
            </div>
            <div className="comment">
              <p>
                {" "}
                <a href="/" className="tagPeople">
                  @Mukesh_Ambani
                </a>
                ✍
              </p>
            </div>
          </div>
          <span className="time">19 Hours ago</span>
          <hr className="hr" />
          <div className="input-field">
            <svg
              aria-label="Emoji"
              className="emoji"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 48 48"
              width="24"
            >
              <path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path>
              <path d="M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z"></path>
            </svg>
            <input
              type="text"
              placeholder="Add a comment..."
              className="writeComment"
            />
            <button type="submit">Post</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;

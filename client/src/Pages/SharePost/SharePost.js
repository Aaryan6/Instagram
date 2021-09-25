import React, { useRef, useState } from "react";
import "./SharePost.css";
import axios from "axios";
import { useHistory } from "react-router";

const SharePost = ({ user}) => {
  const history = useHistory();
  const desc = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.image = filename;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.post("/posts", newPost);
      history.push(`/profile/${user.username}`);
    } catch (error) {
      console.log(error);
    }
  };

  const [file, setFile] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <>
      <div className="share-box-container">
        <span className="heading">New Post</span>
        <div className="box-input">
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <textarea placeholder="Description" ref={desc}></textarea>
              <div className="image-box">
                <label htmlFor="file">
                  <img src={file ? URL.createObjectURL(file) : PF+"noimage.png"} alt="" />
                  <input
                    type="file"
                    id="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                  <span className="change-profile">Choose Photo</span>
                </label>
              </div>
            </div>
            <button>Share</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SharePost;

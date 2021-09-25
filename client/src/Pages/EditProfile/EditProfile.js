import "./EditProfile.css";
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { useHistory } from "react-router";

const EditProfile = ({ user }) => {
  const history = useHistory()
  const { dispatch } = useContext(UserContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const name = useRef();
  const username = useRef();
  const email = useRef();
  const desc = useRef();
  const mnumber = useRef();
  const link = useRef();
  const subtitle = useRef();
  const work = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateUser = {
      userId: user._id,
      name: name.current.value,
      username: username.current.value,
      email: email.current.value,
      desc: desc.current.value,
      mnumber: mnumber.current.value,
      link: link.current.value,
      subtitle: subtitle.current.value,
      work: work.current.value,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updateUser.profilePicture = filename;
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axios.put(`/users/${user.username}`, updateUser);
      dispatch({ type: "UPDATE", payload: res.data });
      history.push(`/profile/${user.username}`)
    } catch (error) {
      console.log(error);
    }
  };

  const [file, setFile] = useState(null);

  return (
    <>
      <div className="edit-profile-container">
        <span className="heading">Edit Profile</span>
        <form onSubmit={handleSubmit}>
          <div className="top">
            <div>
              <label htmlFor="file">
                <div className="rounded-image">
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : user.profilePicture
                        ? PF + user.profilePicture
                        : PF + "avatar3.png"
                    }
                    alt=""
                  />
                  <input
                    type="file"
                    id="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>
              </label>
              <span>{user.username}</span>
            </div>
            <div>
              <label htmlFor="file">
                <span className="img-button">Change Profile Picture</span>
              </label>
            </div>
          </div>
          <div className="middle">
            <input
              type="text"
              placeholder="Name"
              defaultValue={user.name}
              ref={name}
            />
            <input
              type="text"
              placeholder="Username"
              defaultValue={user.username}
              ref={username}
            />
            <input
              type="email"
              placeholder="Email"
              defaultValue={user.email}
              ref={email}
            />
            <input
              type="text"
              placeholder="Mobile Number"
              defaultValue={user.mobileNumber}
              ref={mnumber}
            />
            <textarea
              type="text"
              placeholder="Description"
              ref={desc}
            >{user.desc}</textarea>
            <input
              type="text"
              placeholder="Subtitle"
              defaultValue={user.subtitle}
              ref={subtitle}
            />
            <input
              type="text"
              placeholder="Work"
              defaultValue={user.work}
              ref={work}
            />
            <input
              type="text"
              placeholder="Website"
              defaultValue={user.link}
              ref={link}
            />
            <div className="buttons">
              <button className="edit" type="submit">
                Edit
              </button>
              <Link
                to={`/profile/${user.username}`}
                style={{ textDecoration: "none" }}
              >
                <button className="back">Back</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;

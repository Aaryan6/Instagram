import React, { useEffect, useState } from "react";
import TopSlider from "../../Components/Slider/TopSlider";
import Posts from "../../Components/Posts/Posts";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Home.css"
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/posts/`);
      setPosts(res.data.sort((p1, p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }))
    };
    fetchPosts();
  }, [])

  return (
    <>
      <Navbar />
      <div className="container">
        <div>
          <TopSlider />
          {posts.map(post=>(
            <Posts post={post} key={post._id}/>
          ))}
        </div>
        <div>
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default Home;

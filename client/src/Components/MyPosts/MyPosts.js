// import React, { useState, useEffect } from "react";
import "./MyPosts.css"

const MyPosts = ({ post }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <>
            <div className="post">
                <div className="image">
                    <img src={PF+post.image} alt="post" />
                </div>
            </div>
        </>
    )
}

export default MyPosts

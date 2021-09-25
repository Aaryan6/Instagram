import React, { useEffect, useState } from 'react'
import "./Followers.css"
import axios from 'axios'
const Followers = ({ follower }) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get(`/users?username=${follower.username}`)
            setUser(res.data)
        }
        fetchUsers();
    }, [follower.username])

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <>

            <div className="people">
                <div>
                    <div className="rounded-image">
                        <img src={user.profilePicture ? PF + user.profilePicture : PF+"avatar3.png"} alt="" />
                    </div>
                    <span>{user.username}</span>
                </div>
                <button>Follow</button>
            </div>

        </>
    )
}

export default Followers

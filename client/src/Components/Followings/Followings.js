import axios from 'axios'
import { useEffect, useState } from 'react'
import "./Followings.css"
const Followings = ({ following }) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const fetchfollowings = async () => {
            const res = await axios.get(`/users?username=${following.username}`);
            setUser(res.data)
        };
        fetchfollowings()
    }, [following.username])

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <>
            <div className="people">
                <div>
                    <div className="rounded-image">
                        <img src={ user.profilePicture ? PF+user.profilePicture : PF+"avatar3.png"} alt="" />
                    </div>
                    <span>{user.username}</span>
                </div>
                <button>Remove</button>
            </div>

        </>
    )
}

export default Followings

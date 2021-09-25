import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import "../Signup/Signup.css"
import { UserContext } from "../../Context/UserContext"
import { loginCall } from '../../apiCalls'

const Login = () => {
    const email = useRef();
    const password = useRef();
    const { dispatch } = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        loginCall(
            { email: email.current.value, password: password.current.value },
            dispatch
        );
    };

    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    return (
        <>
            <div className="register-page">
                <div className="register-form">
                    <div className="logo">
                        <img src={PF+"logo.png"} alt="" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input type="email" placeholder="Email" ref={email} required/>
                        <input type="password" placeholder="Password" ref={password} required/>
                        <button type="submit">Login</button>
                    </form>
                </div>
                <div className="signin">
                    Don't have an account? <Link to="/register" style={{ textDecoration: "none" }}>Sign up</Link>
                </div>
            </div>
        </>
    )
}

export default Login

import axios from 'axios';
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import "./Signup.css"
import { useHistory } from 'react-router';

const Signup = () => {
    const history = useHistory();

    const email = useRef();
    const name = useRef();
    const username = useRef();
    const password = useRef();
    const cpassword = useRef();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(password.current.value !== cpassword.current.value){
            cpassword.current.setCustomValidity("Password don't match!")
        }
        else{
            const user = {
                name: name.current.value,
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
                cpassword: cpassword.current.value,
            };
            try {
                await axios.post("/auth/register", user);
                history.push("/login")
            } catch (error) {
                console.log(error)
            }
        }
    }

    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <>
            <div className="register-page">
                <div className="register-form">
                <div className="logo">
                    <img src={PF+"logo.png"} alt="" />
                </div>
                <span>Signup to see photos and videos from your friends.</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Full Name" ref={name} required/>
                    <input type="text" placeholder="Username" ref={username} required/>
                    <input type="email" placeholder="Email" ref={email} required/>
                    <input type="password" placeholder="Password" minLength="6" ref={password} required/>
                    <input type="password" placeholder="Confirm Password" minLength="6" ref={cpassword} required/>
                    <button type="submit">Sign up</button>
                </form>
                <p>By signing up, you agree to our Terms , Data <b>Policy</b> and Cookies Policy .</p>
                </div>
                <div className="signin">
                    Have an account? <Link to="/login" style={{textDecoration: "none"}}>Sign in</Link>
                </div>
            </div>
        </>
    )
}

export default Signup

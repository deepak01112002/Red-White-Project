import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "../Css/Login.css"
let initial = {
    email : "",
    password : ""
}
function Login() {
    const [state,setstate] = useState(initial)

    const handleLogin = (e)=>{
        e.preventDefault()
      fetch(`http://localhost:8080/user/login`,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(state)
      }).then((res)=>{
        return res.json()
      }).then((res)=>{
        console.log(res)
        if(res.msg=="Login Successfull"){
        alert("Login Successfull")
        localStorage.setItem("token",res.token)
        localStorage.setItem("userId" , res.userId)
        }else{
          alert("Wrong Credential")
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
    const handleChange = (e)=>{
        const {name,value} = e.target
        setstate({...state,[name]:value})
    }
    const {email,password} = state
  return (
    <div className="login-container">
        <form onSubmit={handleLogin} className="login-form" >
           <input type="email" placeholder='Email' onChange={handleChange} value={email} name='email'  className="login-input"/>
           <input type="text"  placeholder='Password'onChange={handleChange} value={password} name='password' className="login-input"/>
           <input type="submit" className="login-button" value="Login" />
        </form>
        <h6 className="register-link">New User? <Link to={"/register"}>Register</Link></h6>
    </div>
  )
}

export default Login
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import "../Css/Register.css"
let initial = {
    name : "",
    email : "",
    password : ""
}
function Registration() {
    const [state,setstate] = useState(initial)
    const navigate = useNavigate()
    const handleRegistration=(e)=>{
      e.preventDefault()
       fetch(`https://backendredwhite-1lym.onrender.com/user/register`,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(state)
       }).then((res)=>{
        return res.json()
       }).then((res)=>{
            console.log(res)
            alert(res.msg)
            navigate("/")
        
       }).catch((err)=>{
        console.log(err)
       })
    }
    const handleChange=(e)=>{
        const {id,value} = e.target
        setstate({...state,[id]:value})
    }
    const{email,name,password} = state
  return (
    <div className="registration-container">
         <form onSubmit={handleRegistration} className="registration-form">
            <input type="text" placeholder='Name' onChange={handleChange} value={name} id='name' className="registration-input" required />
           <input type="email" placeholder='Email' onChange={handleChange} value={email} id='email' className="registration-input" required/>
           <input type="text"  placeholder='Password'onChange={handleChange} value={password} id='password' className="registration-input" required/>
           <input type="submit" className="registration-button" value="Register" />
        </form>
    </div>
  )
}

export default Registration
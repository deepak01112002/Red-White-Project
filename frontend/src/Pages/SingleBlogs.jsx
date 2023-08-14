import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "../Css/SingleBlog.css"
function SingleBlogs() {
    const params = useParams()
    const [data,setdata] = useState([])
    const token = localStorage.getItem("token")
    useEffect(()=>{
        fetchData(params)
    },[])
    const fetchData = (params)=>{
        fetch(`https://backendredwhite-1lym.onrender.com/blog/${params.id}`,{
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        }).then((res)=>{
            return res.json()
        }).then((res)=>{
            setdata(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div>
        {
            data.map((el)=>(
                <div className="single-blog-container" key={el._id}>
                <div className="blog-info">    
                <h1>Title : {el.heading}</h1>
                <div className="blog-heading">UserId: <span className="blog-user-id">{el.userId}</span></div>
                </div>
                <div className="blog-description">
                <p className="blog-paragraph">Description : {el.description}</p>
                </div>
                </div>
            ))
        }
    </div>
  )
}

export default SingleBlogs
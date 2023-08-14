import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "../Css/Blog.css"
const initial = {
    heading : "",
    description : "",
    category : "" 
}
function Blogs() {
    const token = localStorage.getItem("token")
    const [filter,setfilter] = useState('')
    const [data,setdata] = useState([])
    
    const [state,setstate] = useState(initial)
    useEffect(()=>{
        fetchData()
    },[])
    const handleChange = (e)=>{
        const {name,value} = e.target
        setstate({...state,[name]:value})
    }
    const handleSubmit  = (e)=>{
        
        e.preventDefault()
        fetch("http://localhost:8080/blog/add",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
            body : JSON.stringify(state)
        }).then((res)=>{
            return res.json()
        }).then((res)=>{
            fetchData()
        }).catch((err)=>{
            console.log(err)
        })
    }
    const fetchData = ()=>{
        fetch("http://localhost:8080/blog",{
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
    const handleFilter = (e)=>{
        setfilter(e.target.value);
       
    }
    const {heading,description,category} = state

    console.log(data)
    const filteredData = filter ? data.filter((el) => el.category === filter) : data;
  return (
    <div>
        <div className="post-form" >
            <form onSubmit={handleSubmit}>
                
                    <h3>Heading</h3>
                    <input  className="post-input" type="text" placeholder='heading' onChange={handleChange} name='heading' />
                
                
                    <h3>Description</h3>
                    <input  className="post-input" type="text" placeholder='Description' onChange={handleChange} name='description'/>
                
                
                    <h3>Category</h3>
                    <select className="post-input"   onChange={handleChange} name='category'>
                        <option value="">Select Category</option>
                        <option value="Politics">Politics</option>
                        <option value="Funny">Funny</option>
                        <option value="Drama">Drama</option>
                    </select>
                
                <input className="post-button" type="submit" value="POST"/>
            </form>
        </div>
        <div className="filter-container">
            <h1>Filter Category</h1>
            <select className="filter-select" onChange={handleFilter} name='category'>
                        <option value="">Select Category</option>
                        <option value="Politics">Politics</option>
                        <option value="Funny">Funny</option>
                        <option value="Drama">Drama</option>
             </select>
        </div>
       <div className="blogs-container" >
       {
        filteredData.map((el)=>(
            <Link key={el._id} to={`/blogs/${el._id}`}>
                <div className="blog-card">
                <h1 className="blog-heading">{el.heading}</h1>
                <h3 className="blog-category">Category : {el.category}</h3>
                <span className="blog-author">Author Id : {el.userId}</span>
            </div></Link>
        ))
       }  
       </div>   
    </div>
  )
}

export default Blogs
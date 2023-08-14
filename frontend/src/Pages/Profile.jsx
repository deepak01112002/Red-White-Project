import React, { useEffect, useState } from 'react'
import "../Css/Profile.css"

function Profile(props) {
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    const [editform,seteditform] = useState("")
    const [data,setdata] = useState([])
    const [editData, setEditData] = useState({});
    useEffect(()=>{
     fetchData()
    },[])
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
    const handleDelete = (id)=>{
        fetch(`http://localhost:8080/blog/${id}`,{
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        }).then((res)=>{
            return res.json()
        }).then((res)=>{
            alert(res.msg)
            fetchData()
        }).catch((err)=>{
            console.log(err)
        })
    }
    const handleEdit = (id) => {
        const blogToEdit = data.find((el) => el._id === id);
        setEditData({
            heading: blogToEdit.heading,
            description: blogToEdit.description
        });
        seteditform(id);
      };
    
      const handleSubmitEdit = (id) => {
        fetch(`http://localhost:8080/blog/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(editData)
    })
    .then((res) => res.json())
    .then((res) => {
      alert(res.msg);
      fetchData();
    })
    .catch((err) => {
      console.log(err);
    });
      };
  return (
    <div className="profile-container">
        {data &&
        data.filter((el) => el.userId === userId).map((el) => (
          <div className="blog-card" key={el._id}>
            <h1 className="blog-title">{el.heading}</h1>
            <p className="blog-description">{el.description}</p>
            <div>
              <button className="edit-button" onClick={() => seteditform(el._id)}>Edit</button>
              <button className='delete-button' onClick={() => handleDelete(el._id)}>Delete</button>
            </div>
          </div>
        ))}
        <form className="edit-form" style={{ display: editform ? "" : "none" }}>
            <input
            type="text"
            className="edit-input"
            placeholder="New Heading"
            value={editData.heading || ""}
            onChange={(e) => setEditData({ ...editData, heading: e.target.value })}
            />
            <input
            type="text"
            className="edit-input"
            placeholder="New Description"
            value={editData.description || ""}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            />
            <button
                type="button"
                className="edit-button"
                onClick={() => handleSubmitEdit(editform)}
            >
                Save Changes
            </button>
        </form>
    </div>
  )
}



export default Profile

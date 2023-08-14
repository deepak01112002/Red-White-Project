import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Registration from '../Pages/Registration'
import Blogs from '../Pages/Blogs'
import SingleBlogs from '../Pages/SingleBlogs'
import Profile from '../Pages/Profile'
import Login from '../Pages/Login'
import PrivateRoute from './PrivateRoute'

function MainRoutes() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/register" element={<Registration/>}></Route>
            <Route path="/blogs" element={
            <PrivateRoute>
            <Blogs/>
            </PrivateRoute>
            }></Route>
            <Route path='/blogs/:id' element={<SingleBlogs/>}></Route>
            <Route path='/profile' element={
            <PrivateRoute>
            <Profile/>
            </PrivateRoute>}></Route>

        </Routes>
    </div>
  )
}

export default MainRoutes
import React, { useState } from 'react'
import Layout from '../components/Layout'
import { message } from 'antd';
import axios from 'axios';
import '../styles/LayoutStyle.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice';

const UploadPic = () => {
    const [url,setUrl]=useState("");
    const {user}=useSelector(state=>state.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    // const handleImageChange = (event) => {
    //     const file = event.target.files[0]; // Get the selected file
    //     const maxSizeInBytes = 500 * 1024;
    //     if (file && file.size > maxSizeInBytes) {
    //       // The selected file exceeds the size limit
    //       message.error("Image size exceeds 500KB. Please choose a smaller image.");
    //       event.target.value = null; // Clear the file input field
    //     }
    //     else{
    //     setUrl(event.target.files[0]);
    //     console.log(url);
    //   }
    // };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const maxSizeInBytes = 500 * 1024;
        if (file && file.size > maxSizeInBytes) {
            message.error("Image size exceeds 500KB. Please choose a smaller image.");
            event.target.value = null;
        } else {
            setUrl(file);
        }
    };
    // const submitHandler=async()=>{
    //     try{
    //         const result=await axios.post('/api/v1/user/upload-image',{userId:user._id,image:url},{
    //             headers:{
    //                 Authorization:`Bearer ${localStorage.getItem('token')}`,
    //                 "Content-Type":"multipart/form-data"
    //             }
    //         })
    //         if(result.data.success){
    //             message.success("Uploaded Successfully")
    //         }
    //     }
    //     catch(error){
    //         console.log(error);
    //         message.error("something went wrong")
    //     }
    // }

    const submitHandler = async () => {
        // event.preventDefault();
        try {
            // const formData = new FormData();
            // formData.append('userId', user._id);
            // formData.append('image', url);
            dispatch(showLoading());
            const result = await axios.post('/api/v1/user/upload-image', {userId:user._id,image:url}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            dispatch(hideLoading());
            if (result.data.success) {
                dispatch(setUser({ ...user, profileImage: result.data.profileImage }));
                message.success("Uploaded Successfully");
                navigate("/profile");
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Something went wrong");
        }
    };
  return (
    <div style={{ backgroundColor: 'gray', minHeight: '100vh' }}>
        <div className='card-container'>
        <form onSubmit={submitHandler}>
                        <input  type="file" name="profileImage" accept="image/*" onChange={handleImageChange}/>
                    <button type="submit" className='btn btn-primary m-2' >{user?.ProfileImage==="" ?(<span>UPLOAD</span>) :(<span>UPDATE IMAGE</span>)}</button>
                   
       </form>
       <button className='btn btn-primary'  style={{marginLeft:"350px"}}onClick={()=>navigate(-1)}>Back</button>
        </div>
        </div>
  )
}

export default UploadPic

import React,{ useEffect, useState } from 'react'
import { Form,Input ,message} from 'antd'
import '../styles/RegisterStyle.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading,showLoading } from '../redux/features/alertSlice';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { GoogleOutlined } from '@ant-design/icons';

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate=useNavigate();
    useEffect(() => {
        console.log(window.location.href)
        const token = new URLSearchParams(window.location.search).get('token');
        if (token) {
            localStorage.setItem('token', token);
        }
    }, []);
    const dispatch=useDispatch();
    const onfinishHandler= async (values)=>{
        try{
            dispatch(showLoading());
        const result=await axios.post("/api/v1/user/login",values);
        dispatch(hideLoading());
        if(result.data.success){
            localStorage.setItem("token",result.data.token);
            message.success('login successfully');
            console.log(result);
            navigate('/');
            window.location.reload();
        }
        else{
            message.error(result.data.message);
        }
    }
    catch(error){
        dispatch(hideLoading());
        console.log(error);
        
        message.error("something went wrong");
    }
    }
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
  return (
    <div className='formBody'>
    <div style={{display:"flex",justifyContent:"center",alignItem:"center"}}>
     <div className="formContainer" >
     <div className='register-form'>
        <Form layout="vertical" onFinish={onfinishHandler} >
            <h1 style={{textAlign:"center",margin:"20px"}}>MedEase APP</h1>
            <hr/>
            <h2 style={{textAlign:"center",margin:"30px"}}><b>LOGIN</b></h2>
           
            <Form.Item label={<h6>Email Address</h6>} name="email" className='m-4'>
                <Input type="email" required/>
            </Form.Item>
            <Form.Item label={<h6>Password</h6>} name="password" className='m-4'>
                            <Input
                                type={passwordVisible ? 'text' : 'password'} // Use type based on password visibility state
                                required
                                suffix={
                                    passwordVisible
                                        ? <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
                                        : <EyeTwoTone onClick={togglePasswordVisibility} />
                                }
                            />
                        </Form.Item>
            <div className='m-4'>Doesn't have an account yet?<Link to='/register' className='m-2' style={{color:"purple"}}>Sign Up</Link></div>
           <div style={{margin:"20px",textAlign:"center"}}>
            <button className='btn btn-primary' type="submit" >
                Login
            </button>
            </div>
        </Form>
        <h6 style={{textAlign:'center'}}>OR Login with</h6>
        <form action="http://localhost:8080/api/v1/user/google" method="get" style={{ textAlign: 'center', margin: "20px" }}>
    <button className='btn btn-success'>
        <GoogleOutlined style={{ marginRight: '5px' }} /> SIGN IN WITH GOOGLE
    </button>
</form>
    
     </div>
    </div> 
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                <img src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    style={{ width: "700px", height: "670px" }} className='imgCont'/>
            </div>
    </div>
    </div>
  )
}

export default Login

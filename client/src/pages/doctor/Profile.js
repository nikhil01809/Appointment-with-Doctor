import React, { useEffect, useState } from 'react'
import { Col, Form, Input, Row ,TimePicker} from 'antd';
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import moment from 'moment'
const Profile = () => {
    const {user}=useSelector(state=>state.user);
    const [doctor,setDoctor]=useState(null);
    const [date,setDate]=useState()
    const [date2,setDate2]=useState();
    const params=useParams();
    const navigation =useNavigate();;
    const dispatch=useDispatch();
    const handleUpdate=async(values)=>{
        try{
            dispatch(showLoading);
            const result=await axios.post("/api/v1/doctor/updateDoctorInfo",{...values,userId:user._id,
            timing:[
                date,date2
            ]
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading);
            if(result.data.success){
                message.success("Profile Updated successfully");
                console.log(result);
                setDoctor(result.data.data);
                navigation('/');
            }
    }
        catch(error){
            dispatch(hideLoading);
            console.log(error);
          message.error("something went wrong");
        }
    }
    const getDoctorInfo=async()=>{
        try{
            const result=await axios.post('/api/v1/doctor/getDoctorInfo',{userId:params.id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(result.data.success){
                setDoctor(result.data.data);
                console.log(result.data.data);
            }
        }
        catch(error){
            console.log(error);
            message.error("something went wrong");
        }
    }
    useEffect(()=>{
        getDoctorInfo();
    },[])
  return (
    <Layout>
        <h1 style={{textAlign:"center"}}> MANAGE PROFILE</h1>
        {doctor && (
            <Form layout="vertical" onFinish={handleUpdate} initialValues={{...doctor,timing:[
                moment(doctor.timing[0],'HH:mm'),
                moment(doctor.timing[1],'HH:mm'),
            ]}}>
            <h4 className='m-3'>Personal Deatils</h4>
            <hr/>
            <Row gutter={20 }>
                <Col xs={24} md={24} lg={7} className='m-3'>
                    <Form.Item name="firstname" label="First Name" required rules={[{required:true}]}>
                        <Input placeholder='your name' type="text"/>
                    </Form.Item>
                   
                </Col>
                <Col xs={24} md={24} lg={7} className='m-3'>
                    <Form.Item name="lastname" label="Last Name" required rules={[{required:true}]}>
                        <Input placeholder='your lastname' type="text"/>
                    </Form.Item>
                   
                </Col>
                <Col xs={24} md={24} lg={7} className='m-3'>
                    <Form.Item name="phone" label="Phone No" required rules={[{required:true}]}>
                        <Input placeholder='phone on' type="text"/>
                    </Form.Item>
                   
                </Col>
            
                <Col xs={24} md={24} lg={7} className='m-3'>
                    <Form.Item name="email" label="Email" required rules={[{required:true}]}>
                        <Input placeholder='enter email' type="text"/>
                    </Form.Item>
                   
                </Col>
                <Col xs={24} md={24} lg={7} className='m-3'>
                    <Form.Item name="website" label="Website" >
                        <Input placeholder='your website' type="text"/>
                    </Form.Item>
                   
                </Col>
                <Col xs={24} md={24} lg={7} className='m-3'>
                    <Form.Item name="address" label="Address" required rules={[{required:true}]}>
                        <Input placeholder='your clinic address' type="text"/>
                    </Form.Item>
                   
                </Col>
            </Row>
            <h4 className='m-3'>Proffesional Deatails</h4>
            <hr/>
            <Row gutter={20 } className='m-3'>
                <Col xs={24} md={24} lg={7} className='m-3'>
                    <Form.Item name="specialization" label="Specialization" required rules={[{required:true}]}>
                        <Input placeholder='your specialization' type="text"/>
                    </Form.Item>
                   
                </Col>
                <Col xs={24} md={24} lg={7} className='m-3'>
                    <Form.Item name="experience" label="Experience" required rules={[{required:true}]}>
                        <Input placeholder='your experience' type="text"/>
                    </Form.Item>
                   
                </Col>
                <Col xs={24} md={24} lg={7} className='m-3'>
                    <Form.Item name="feesPerCunsalation" label="Fees" required rules={[{required:true}]}>
                        <Input placeholder='your fees' type="text"/>
                    </Form.Item>
                   
                </Col>
        
                <Col xs={24} md={24} lg={7} className='m-30'>
                    <Form.Item name="timing" label="Timing"  required >
                        <TimePicker.RangePicker format="HH:mm" 
                        onChange={(value) => {
                  if(value) setDate(moment(value[0])?._i.format("HH:mm"));
                  if(value) setDate2(moment(value[1])?._i.format("HH:mm"));
                }}/>
                    </Form.Item>
                   
                </Col>
               
                <Col xs={24} md={24} lg={7} className='m-30'>
                <button className='btn btn-primary form-btn' type="submit" >Update</button>
                </Col>
            </Row>
            
        </Form>
        )}
    </Layout>
  )
}

export default Profile

import { Col, Form, Input, Row ,TimePicker, message} from 'antd';
import Layout from '../components/Layout';
import React from 'react'
import '../styles/LayoutStyle.css'
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
const ApplyDoctor = () => {
    const dispatch=useDispatch();
    const navigation=useNavigate();
    const {user}=useSelector(state=>state.user);
    const handleFinish=async(values)=>{
        try{
            dispatch(showLoading);
            const result=await axios.post("/api/v1/user/apply-doctor",{...values,userId:user._id,profileImage:user.profileImage,
                timing:[
                    moment(values.timing[0])._i.format('HH:mm'),
                    moment(values.timing[1])._i.format('HH:mm'),
                ],
                },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading);
            if(result.data.success){
                message.success("applied successfully");
                console.log(result);
                navigation('/');
            }
        }
        catch(error){
            dispatch(hideLoading);
            console.log(error);
          message.error("something went wrong");
        }
    }
  return (
    <Layout>
        <h1 style={{textAlign:"center"}}>APPLY FOR DOCTOR</h1>
        <Form layout="vertical" onFinish={handleFinish}>
            <h4 className='m-3'>PERSONAL DETAILS</h4>
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
            <h4 className='m-3'>PROFESSIONAL DETAILS</h4>
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
                    <Form.Item name="timing" label="Timing"  required>
                        <TimePicker.RangePicker format="HH:mm"/>
                    </Form.Item>
                   
                </Col>
                <Col xs={24} md={24} lg={7} className='m-30'>
                <button className='btn btn-primary form-btn' type="submit" >Submit</button>
                </Col>
            </Row>
            
        </Form>
    </Layout>
  )
}

export default ApplyDoctor

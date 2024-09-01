import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorList = ({ doctor }) => {
    const navigate = useNavigate();
    //const approvedDoctors = doctors.filter(doctor => doctor.status === "approved");
    if(doctor.status==="approved") {return (
        
            <div className='card m-3 ' style={{ cursor: "pointer", display:"flex",justifyContent:"center",alignContent:"center"}} onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}>
                <div className='card-header' style={{fontSize:"1.1rem"}}>
                   Dr. {doctor.firstname.toUpperCase()} {doctor.lastname.toUpperCase()}
                </div>
                <div className='card-body'>
                    <p><b>SPECIALIZATION :  </b> {doctor.specialization?.toUpperCase()}</p>
                    <p><b>EXPERIENCE :  </b> {doctor.experience?.toUpperCase()}</p>
                    <p><b>FEES :  </b> RS {doctor.feesPerCunsalation}</p>
                    <p><b>TIMINGS :  </b> {doctor.timing[0]}-{doctor.timing[1]}</p>
                    
                </div>
            </div>
      
    );
    }
}

export default DoctorList;

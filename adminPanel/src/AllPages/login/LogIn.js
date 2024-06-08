import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LogInForm from './LogInForm'

const LogIn = () => {
    const navigate = useNavigate();
    useEffect(() => {

        if (localStorage.getItem('Jwt_token')) {
            navigate('/')
        }

        else {
            navigate('/login');
        }

    }, [])
    return (
        <div className='container mt-5'>
            <div className='row px-4'>
	    <h5 className='text-primary text-center mb-4 ' > ॐ श्रीं ल्कीं महालक्ष्मी महालक्ष्मी एह्येहि सर्व सौभाग्यं देहि मे स्वाहा।।  </h5>
	    <div className='col-lg-4 d-none d-lg-block text-center '>
                    <img src="../../uploads/kalash.png" alt="kalash image" width="250"/>
                </div>

	    <div className='col-lg-4'>
	        <div className='card border-primary '>
                        <div className='card-body p-5'>
                            <h2 className='text-center text-primary mb-5'>LOGIN</h2>
                            <LogInForm />
                        </div>
                    </div>

                </div>

	    <div className='col-lg-4 d-none d-lg-block text-center '>
                    <img src="../../uploads/kalash.png" alt="kalash image" width="250"/>
                </div>
                <div className='col-12  fixed-bottom text-primary  opacity-75'>
                    <div className='row'>
                        <div className='col-lg-6'>
                        <h5 className='mb-0'> Developed By- Rahul soni</h5>
                        </div>
                        <div className='col-lg-6'>
                        <h5 className=' float-lg-end '> For any query, contact +91 9729001793</h5>
                        </div>
                    </div>
                    
                    
                </div>
            </div>

        </div>
    )
}

export default LogIn

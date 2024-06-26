import React, { useContext, useEffect } from 'react';
import context from '../ContextApi/Context'
import { useNavigate, Link } from 'react-router-dom';
import Spinner from '../Components/Spinner';


const Home = () => {
  const setDateFunc = (mdate) => {
    let date = new Date(mdate)
    return (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '-' + (date.getMonth() + 1 < 10 ? '0' + parseInt(date.getMonth() + 1) : parseInt(date.getMonth() + 1)) + '-' + date.getFullYear()

  }
  let navigate = useNavigate();
  const a = useContext(context);
  const { spinner, setError, logOutClick,activeStatusUser} = a;

  useEffect(() => {
    if (!localStorage.getItem('Jwt_token') || localStorage.getItem('user_activeStatus') === "false") {
      if (localStorage.getItem('user_activeStatus') === "false") {
        setError({ 'error': <span className='text-center'>YOUR ACCESS IS STOPPED BY ADMIN PLEASE RENEWAL YOUR ACCOUNT</span> })
      }
      logOutClick();
      navigate('/login')
    }
    else{
      activeStatusUser()
    }


  }, [])
  return (
    localStorage.getItem('Jwt_token') && localStorage.getItem('user_activeStatus') === "true" ?
      spinner !== 'true' ?
        <div className='container mt-5'>
          <div className='row px-4'>
            <h5 className='text-primary text-center mb-4 ' > ॐ श्रीं ल्कीं महालक्ष्मी महालक्ष्मी एह्येहि सर्व सौभाग्यं देहि मे स्वाहा।।  </h5>
            <div className='col-lg-3 d-none d-lg-block text-center '>
              <img src="../../uploads/kalash.png" alt="kalash image" width="250" />
            </div>

            <div className='col-lg-6'>
              <div className='card  '>
                <div className='card-body p-lg-5'>
                  <h3 className='text-center text-primary mb-3 text-uppercase'>WELCOME {localStorage.getItem('user_name')}</h3>
                  <h5 className='text-center text-primary mb-4 text-uppercase fw-bold'>Date: {setDateFunc(new Date())}</h5>
                  <div className='row'>
                    <div className='col-lg-6 col-6'>
                      <div className='d-grid'>
                        {/* customer bill */}
                        <Link to="/sale-bill" className='btn btn-danger btn-lg mb-3'>Sale</Link>
                      </div>
                    </div>

                    <div className='col-lg-6 col-6'>
                    <div className='d-grid'>
                        {/* customer bill */}
                        <Link to="/purchase-bill" className='btn btn-danger btn-lg  mb-3'>Purchase</Link>
                      </div>
                    </div>

                  </div>

                  <div className='row'>
                    <div className='col-lg-6 col-6'>
                      <div className='d-grid'>
                        {/* Driver bill */}
                        <Link to="/transport-bill" className='btn btn-danger btn-lg  mb-3'>Transport</Link>
                      </div>
                    </div>

                    <div className='col-lg-6 col-6'>
                      <div className='d-grid'>
                        {/* Labor bill */}
                        <Link to="/labor-bill" className='btn btn-danger btn-lg mb-3'>Labor</Link>
                      </div>
                    </div>

                  </div>

                  
                  <div className='row'>
                    <div className='col-lg-12'>
                      <div className='d-grid'>

                        <Link to="/login" className='btn btn-danger btn-lg ' onClick={() =>logOutClick()}>Log Out</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className='col-lg-3 d-none d-lg-block text-center '>
              <img src="../../uploads/kalash.png" alt="kalash image" width="250" />
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

        : <Spinner /> : ''
  )
}

export default Home

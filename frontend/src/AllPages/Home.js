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
  const { spinner, setError, logOutClick } = a;

  const logOutBtnClick = () => {
    localStorage.removeItem('Jwt_token');
    localStorage.removeItem('user_activeStatus');
    localStorage.removeItem('user_name')

  }

  useEffect(() => {
    if (!localStorage.getItem('Jwt_token') || localStorage.getItem('user_activeStatus') === 'false') {
      if (localStorage.getItem('user_activeStatus') === 'false') {
        setError({ 'error': <span className='text-center'>YOUR ACCESS IS STOPPED BY ADMIN PLEASE RENEWAL YOUR ACCOUNT</span> })
      }
      logOutClick();
      navigate('/login')
    }


  }, [])
  return (
    localStorage.getItem('Jwt_token') && localStorage.getItem('user_activeStatus') === 'true' ?
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

                  {/* <div className='row'>
                    <div className='col-lg-6 col-6'>
                      <div className='d-grid'>
                        <Link to="/item" className='btn btn-danger  mb-3'>Create New Item</Link>

                      </div>
                    </div>
                    <div className='col-lg-6 col-6'>
                      <div className='d-grid'>
                        <Link to="/member" className='btn btn-danger mb-3'>Create New Member</Link>

                      </div>
                    </div>
                  </div> */}

                  <div className='row'>
                    <div className='col-lg-6 col-6'>
                      <div className='d-grid'>
                        {/* customer bill */}
                        <Link to="/sale-bill" className='btn btn-danger  mb-3'>Sale</Link>
                      </div>
                    </div>

                    <div className='col-lg-6 col-6'>
                    <div className='d-grid'>
                        {/* customer bill */}
                        <Link to="/purchase-bill" className='btn btn-danger  mb-3'>Purchase</Link>
                      </div>
                    </div>

                  </div>

                  <div className='row'>
                    <div className='col-lg-6 col-6'>
                      <div className='d-grid'>
                        {/* Driver bill */}
                        <Link to="/driver-bill" className='btn btn-danger  mb-3'>Transport</Link>
                      </div>
                    </div>

                    <div className='col-lg-6 col-6'>
                      <div className='d-grid'>
                        {/* Labor bill */}
                        <Link to="/labor-bill" className='btn btn-danger  mb-3'>Labor</Link>
                      </div>
                    </div>

                  </div>

                  {/* <div className='row'>
                    <div className='col-lg-6 col-6'>
                      <div className='d-grid'>
                        <Link to="/item-sale-numbers" className='btn btn-danger  mb-3'>Check Item's Sale</Link>

                      </div>
                    </div>
                    <div className='col-lg-6 col-6'>
                      <div className='d-grid'>
                        <Link to="/sale-bill-check" className='btn btn-danger  mb-3'>All Sale Entries</Link>
                      </div>
                    </div>

                  </div>
                  <div className='row'>
                    <div className='col-lg-6 col-6'>
                      <div className='d-grid'>
                        <Link to="/driver-bill-check" className='btn btn-danger  mb-3'>All Transport Entries</Link>
                      </div>
                    </div>

                    <div className='col-lg-6 col-6'>
                      <div className='d-grid'>
                        <Link to="/labor-bill-check" className='btn btn-danger  mb-3'>All Labor Entries</Link>
                      </div>
                    </div>

                  </div>

                  <div className='row'>
                    <div className='col-lg-6 col-6'>
                      <div className='d-grid'>
                        <Link to="/bank-transection" className='btn btn-danger  mb-3'>Bank Transection</Link>
                      </div>
                    </div>

                    <div className='col-lg-6 col-6'>
                      <div className='d-grid'>
                        <Link to="/balance-check" className='btn btn-danger  mb-3'>Balance</Link>

                      </div>
                    </div>

                  </div> */}

                  <div className='row'>
                    <div className='col-lg-12'>
                      <div className='d-grid'>

                        <Link to="/login" className='btn btn-danger  mb-3' onClick={() => logOutBtnClick()}>Log Out</Link>
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

import React, { useContext, useEffect} from 'react';
import context from '../ContextApi/Context'
import { useNavigate } from 'react-router-dom';
import SideOffcanvas from './SideOffcanvas'

const Menubtn = () => {
  
  let navigate = useNavigate();
  const a = useContext(context);
  const {setError,logOutClick} = a;
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
    <div className='container'>
      <button className="btn btn-primary rounded-pill position-fixed" style={{zIndex:'1111',bottom:'2%', right:'2%'}} id="menubtn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-dropbox" viewBox="0 0 16 16">
          <path d="M8.01 4.555 4.005 7.11 8.01 9.665 4.005 12.22 0 9.651l4.005-2.555L0 4.555 4.005 2 8.01 4.555Zm-4.026 8.487 4.006-2.555 4.005 2.555-4.005 2.555-4.006-2.555Zm4.026-3.39 4.005-2.556L8.01 4.555 11.995 2 16 4.555 11.995 7.11 16 9.665l-4.005 2.555L8.01 9.651Z" />
        </svg>
      </button>
      <SideOffcanvas />


    </div>:''
  )
}

export default Menubtn

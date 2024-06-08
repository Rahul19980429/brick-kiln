import React from 'react'
import { Link } from "react-router-dom"

const SideOffcanvas = () => {

    const menuBtnClick = () => {
        document.getElementById('closeBtn').click()
    }

    const logOutClick = () => {
        localStorage.removeItem('Jwt_token');
        localStorage.removeItem('user_name')

    }

    return (

        <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            <div className="offcanvas-header justify-content-end">
                <button type="button" className="btn-close me-3 d-none" data-bs-dismiss="offcanvas" aria-label="Close" id="closeBtn"></button>
            </div>
            <div className="offcanvas-body py-0">
                <div className='d-flex px-5 ' style={{ flexFlow: 'column' }}>
                    <Link to="/" className='btn btn-danger btn-lg mb-2' onClick={() => menuBtnClick()}>Home</Link>
                  
                    <Link to="/user" className='btn btn-danger btn-lg mb-2' onClick={() => menuBtnClick()}>Create User</Link>
                   
                   
                    <Link to="/login" className='btn btn-danger btn-lg  ' onClick={() => logOutClick()}>Log Out</Link>
                </div>
            </div>
        </div>


    )
}

export default SideOffcanvas

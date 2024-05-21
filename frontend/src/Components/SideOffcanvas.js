import React from 'react'
import { Link } from "react-router-dom"

const SideOffcanvas = () => {

    const menuBtnClick = () => {
        document.getElementById('closeBtn').click()
    }

    const logOutClick = () => {
        localStorage.removeItem('Jwt_token');
        localStorage.removeItem('user_activeStatus');
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
                    <button className="btn btn-danger btn-lg dropdown-toggle mb-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                       Create New
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark px-2">
                        <li className='mb-2'><Link to="/item" className="dropdown-item bg-danger" onClick={() => menuBtnClick()}>New Item</Link></li>
                        <li><Link to="/member" className="dropdown-item bg-danger"onClick={() => menuBtnClick()}>New Member</Link></li>
                    </ul>
                    <Link to="/sale-bill" className='btn btn-danger btn-lg  mb-2' onClick={() => menuBtnClick()}>Sale</Link>
                    <Link to="/purchase-bill" className='btn btn-danger btn-lg  mb-2' onClick={() => menuBtnClick()}>Purchase</Link>
                    <Link to="/transport-bill" className='btn btn-danger btn-lg  mb-2' onClick={() => menuBtnClick()}>Transport</Link>
                    <Link to="/labor-bill" className='btn btn-danger btn-lg mb-2' onClick={() => menuBtnClick()}>Labor</Link>
                    <button className="btn btn-danger btn-lg dropdown-toggle mb-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                       All Entries
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark px-2">
                        <li className='mb-2'><Link to="/sale-bill-check" className="dropdown-item bg-danger" onClick={() => menuBtnClick()}>Sale Entry</Link></li>
                        <li className='mb-2'><Link to="/purchase-bill-check" className="dropdown-item bg-danger" onClick={() => menuBtnClick()}>Purchase Entry</Link></li>
                        <li className='mb-2'><Link to="/transport-bill-check" className="dropdown-item bg-danger" onClick={() => menuBtnClick()}>Transport Entry</Link></li>
                        <li className='mb-2'><Link to="/labor-bill-check" className="dropdown-item bg-danger" onClick={() => menuBtnClick()}>Labor Entry</Link></li>
                        <li className='mb-2'><Link to="/bank-transection" className="dropdown-item bg-danger" onClick={() => menuBtnClick()}>Bank Entry</Link></li>
                        <li className='mb-2'><Link to="/fuel-check" className="dropdown-item bg-danger" onClick={() => menuBtnClick()}>Fuel Entry</Link></li>
                        <li className='mb-2'><Link to="/item-sale-numbers" className="dropdown-item bg-danger" onClick={() => menuBtnClick()}>Item's Sale Numbers</Link></li>
                    </ul>
                    <Link to="/balance-check" className='btn btn-danger btn-lg  mb-2' onClick={() => menuBtnClick()}>Balance</Link>
                    <Link to="/setting" className='btn btn-danger btn-lg  mb-2' onClick={() => menuBtnClick()}>Setting</Link>
                    <Link to="/login" className='btn btn-danger btn-lg  ' onClick={() => logOutClick()}>Log Out</Link>
                </div>
            </div>
        </div>


    )
}

export default SideOffcanvas

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
                    <Link to="/" className='btn btn-danger mb-1' onClick={() => menuBtnClick()}>Home</Link>
                    <button className="btn btn-danger dropdown-toggle mb-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                       Create New
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark px-2">
                        <li className='mb-2'><Link to="/item" className="dropdown-item bg-danger" onClick={() => menuBtnClick()}>New Item</Link></li>
                        <li><Link to="/member" className="dropdown-item bg-danger"onClick={() => menuBtnClick()}>New Member</Link></li>
                    </ul>
                    <Link to="/sale-bill" className='btn btn-danger  mb-1' onClick={() => menuBtnClick()}>Sale</Link>
                    <Link to="/purchase-bill" className='btn btn-danger  mb-1' onClick={() => menuBtnClick()}>Purchase</Link>
                    <Link to="/driver-bill" className='btn btn-danger  mb-1' onClick={() => menuBtnClick()}>Transport</Link>
                    <Link to="/labor-bill" className='btn btn-danger  mb-1' onClick={() => menuBtnClick()}>Labor</Link>
                    <button className="btn btn-danger dropdown-toggle mb-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                       All Entries
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark px-2">
                        <li className='mb-2'><Link to="/sale-bill-check" className="dropdown-item bg-danger" onClick={() => menuBtnClick()}>Sale Entry</Link></li>
                        <li className='mb-2'><Link to="/driver-bill-check" className="dropdown-item bg-danger" onClick={() => menuBtnClick()}>Transport Entry</Link></li>
                        <li className='mb-2'><Link to="/labor-bill-check" className="dropdown-item bg-danger" onClick={() => menuBtnClick()}>Labor Entry</Link></li>
                        <li className='mb-2'><Link to="/bank-transection" className="dropdown-item bg-danger" onClick={() => menuBtnClick()}>Bank Entry</Link></li>
                    </ul>
                    
                    <Link to="/balance-check" className='btn btn-danger  mb-1' onClick={() => menuBtnClick()}>Balance</Link>
                    <Link to="/login" className='btn btn-danger  ' onClick={() => logOutClick()}>Log Out</Link>


                    {/* <Link to="/item" className='btn btn-danger  mb-2' onClick={() => menuBtnClick()}>Item</Link>
                    <Link to="/member" className='btn btn-danger mb-2' onClick={() => menuBtnClick()}>Member</Link>
                    <Link to="/sale-bill" className='btn btn-danger  mb-2' onClick={() => menuBtnClick()}>Customer Bill</Link>
                    <Link to="/driver-bill" className='btn btn-danger  mb-2' onClick={() => menuBtnClick()}>Driver Bill</Link>
                    <Link to="/labor-bill" className='btn btn-danger  mb-2' onClick={() => menuBtnClick()}>Labor Bill</Link>
                    <Link to="/balance-check" className='btn btn-danger  mb-2' onClick={() => menuBtnClick()}>Balance</Link>
                    <Link to="/item-sale-numbers" className='btn btn-danger  mb-2' onClick={() => menuBtnClick()}>Item Sale Numbers</Link>
                    <Link to="/sale-bill-check" className='btn btn-danger  mb-2' onClick={() => menuBtnClick()}>Customer Bills Check</Link>
                    <Link to="/driver-bill-heck" className='btn btn-danger  mb-2' onClick={() => menuBtnClick()}>Driver Bills Check</Link>
                    <Link to="/labor-bill-check" className='btn btn-danger  mb-2' onClick={() => menuBtnClick()}>Labor Bills Check</Link> */}
                </div>
            </div>
        </div>


    )
}

export default SideOffcanvas

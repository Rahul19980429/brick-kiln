import React, { useContext, useState, useEffect } from 'react';
import context from '../ContextApi/Context'
import { useNavigate } from 'react-router-dom';
import ResetButtonPressModal from '../Components/ResetButtonPressModal';

const Setting = () => {
    let navigate = useNavigate();
    const a = useContext(context);
    const { GetSingleUser, UpdateUser, error, setError, logOutClick ,activeStatusUser} = a;
    const [user, setUser] = useState('')
    const [restModal, setRestModal] = useState({Title:'',DeleteType:''})
    const [Input, setInput] = useState({ _id: '', name: '', contact: '', address: '', oldPassword: '', newPassword: '' });

    const onChange = (e) => {
        setInput({ ...Input, [e.target.name]: e.target.value })
    }

    const keypress = (e) => {
        if (isNaN(e.target.value)) {
            e.target.value = "";
            setInput({ ...Input, [e.target.name]: e.target.value })
        }
    }

    const submit = (e) => {
        e.preventDefault()
        if(Input._id){

            if (!Input.name || !Input.contact || !Input.address || !Input.oldPassword || !Input.newPassword) {
                alert("Empty field is not allowed")
            }
            else {
                UpdateUser(Input)

                clearInput()
                
            }
            
        }
    }

    // const updateMember = (id, data) => {
    //     const { itemName, category , itemRate } = data;
    //     UpdateItem(id, itemName, category,itemRate)
    //     clearInput()
    // }
    const clearInput = () => {
        setInput({ _id: '', name: '', contact: '', address: '', oldPassword: '', newPassword: '' })


    }
    const editUser = (userdata) => {
        setInput({ _id: userdata._id, name: userdata.name, contact: userdata.contact, address: userdata.address, oldPassword: '', newPassword: '' })

    }

    if (error.length !== 0) {
        setTimeout(() => {
            setError('')
        }, 2500);
    }

    useEffect(() => {
        if (!localStorage.getItem('Jwt_token') || localStorage.getItem('user_activeStatus') === false) {
            if (localStorage.getItem('user_activeStatus') === false) {
                setError({ 'error': <span className='text-center'>YOUR ACCESS IS STOPPED BY ADMIN PLEASE RENEWAL YOUR ACCOUNT</span> })
            }
            logOutClick();
            navigate('/login')
        }
        else {
            GetSingleUser().then((data) => setUser(data))
            activeStatusUser()
        }
    }, [])


    return (
        localStorage.getItem('Jwt_token') && localStorage.getItem('user_activeStatus') === 'true' ?
            <div className='container py-3'>
                <div className='row px-3'>
                    <div className='col-lg-12 col-12'>
                        <h3 className='text-center bg-dark text-white mb-0 py-2 mb-0'>Setting</h3>
                        <h4 className='my-4 text-center text-danger'>Here You Can Make Changes In Your Account.</h4>
                    </div>
                    <div className='col-lg-6 '>
                        <form onSubmit={submit} className='px-3 px-lg-0 pe-lg-5 mt-5 mt-lg-0 mt-md-0'>
                            <fieldset id='UserForm' disabled={Input._id === '' ? 'disabled' : ''}>
                                {/* name */}
                                <div className="input-group mb-2  border border-white rounded-1 ">
                                    <span className="bg-opacity-25 input-group-text bg-dark border border-3 border-danger rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus-fill text-danger" viewBox="0 0 16 16">
                                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                                    </svg></span>
                                    <input autoComplete='off' type="text" className="bg-dark text-danger border-0 form-control" placeholder='Enter Name' onChange={onChange} value={Input.name} id="name" name="name" aria-describedby="emailHelp" />
                                </div>

                                {/* contact */}
                                <div className="input-group mb-2 border border-white rounded-1">
                                    <span className="bg-opacity-25 input-group-text bg-dark border border-3 border-danger rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill text-danger" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                    </svg></span>
                                    <input autoComplete='off' onKeyUp={keypress} type="text" className="bg-dark text-danger  border-0 form-control" placeholder='Enter Contact' minLength={10} maxLength={10} onChange={onChange} value={Input.contact} id="contact" name="contact" />
                                </div>

                                {/* address */}
                                <div className="input-group mb-2  border border-white rounded-1 ">
                                    <span className="bg-opacity-25 input-group-text bg-dark border border-3 border-danger rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-building-fill-add text-danger" viewBox="0 0 16 16">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Z" />
                                        <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7.256A4.493 4.493 0 0 0 12.5 8a4.493 4.493 0 0 0-3.59 1.787A.498.498 0 0 0 9 9.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .39-.187A4.476 4.476 0 0 0 8.027 12H6.5a.5.5 0 0 0-.5.5V16H3a1 1 0 0 1-1-1V1Zm2 1.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5Zm3 0v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z" />
                                    </svg></span>
                                    <input autoComplete='off' type="text" className="bg-dark text-danger border-0 form-control" placeholder='Enter Address' onChange={onChange} value={Input.address} id="address" name="address" aria-describedby="emailHelp" />
                                </div>

                                {/*old password */}
                                <div className="input-group mb-2 border border-white rounded-1">
                                    <span className="bg-opacity-25 input-group-text bg-dark border border-3 border-danger rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill text-danger" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                    </svg></span>
                                    <input autoComplete='off' type="text" className="bg-dark text-danger border-0 form-control" placeholder='Enter Old Password' onChange={onChange} value={Input.oldPassword} id="oldPassword" name="oldPassword" aria-describedby="emailHelp" />
                                </div>

                                {/*new password */}
                                <div className="input-group mb-2 border border-white rounded-1">
                                    <span className="bg-opacity-25 input-group-text bg-dark border border-3 border-danger rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill text-danger" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                    </svg></span>
                                    <input autoComplete='off' type="text" className="bg-dark text-danger border-0 form-control" placeholder='Enter New Password' onChange={onChange} value={Input.newPassword} id="newPassword" name="newPassword" aria-describedby="emailHelp" />
                                </div>

                                {/* error display */}
                                <div className="input-group mb-3 text-danger justify-content-center">
                                    <h6>{error.error ? error.error : error}</h6>
                                </div>
                                <div className="d-flex gap-2 mt-2 justify-content-center">
                                    <button className="btn btn-danger text-white fw-bold  mb-4 border-0 " type="submit" disabled={!Input._id || !Input.name || !Input.contact || !Input.address || !Input.oldPassword || !Input.newPassword ? true : false}>SAVE CHANGES</button>
                                    <button className="btn btn-danger text-white fw-bold  mb-4 border-0 " onClick={() => clearInput()} type='button' disabled={!Input.name && !Input.contact && !Input.address && !Input.oldPassword && !Input.newPassword ? true : false} >CANCEL</button>
                                </div>
                            </fieldset>
                        </form>

                    </div>

                    <div className='col-lg-6'>
                        <div className='card bg-dark  border border-3 border-danger'>
                            <div className='card-body  text-uppercase text-white'>
                                <h5 className='py-2 text-danger'>NAME:  {user.name} </h5>
                                <h5 className='py-2 text-danger'>CONTACT: {user.contact}</h5>
                                <h5 className='py-2 text-danger'>ADDRESS: {user.address} </h5>
                            </div>
                            <button className='btn btn-danger btn-sm m-2' onClick={() => editUser(user)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                            </svg></button>
                        </div>

                    </div>
                </div>
                <hr className='border border-4 border-danger' />
                <div className='row px-3'>
                    <div className='col-lg-12 d-flex flex-column flex-lg-row gap-2'>
                        <ResetButtonPressModal Data={restModal}/>
                        <button data-bs-toggle="modal" data-bs-target="#ResetModalButtonPress" onClick={() => setRestModal({Title:'RESET PURCHASE BILL',DeleteType:'purchasebill'})} className="btn btn-sm btn-danger text-white fw-bold   border-0 rounded-2" type='button'>RESET PURCHASE BILL</button>
                        <button data-bs-toggle="modal" data-bs-target="#ResetModalButtonPress" onClick={() => setRestModal({Title:'RESET SALE BILL',DeleteType:'salebill'})} className="btn btn-sm btn-danger text-white fw-bold   border-0 rounded-2" type='button'>RESET SALE BILL</button>
                        <button data-bs-toggle="modal" data-bs-target="#ResetModalButtonPress" onClick={() => setRestModal({Title:'RESET TRANSPORT BILL',DeleteType:'transportbill'})} className="btn btn-sm btn-danger text-white fw-bold   border-0 rounded-2" type='button'>RESET TRANSPORT BILL</button>
                        <button data-bs-toggle="modal" data-bs-target="#ResetModalButtonPress" onClick={() => setRestModal({Title:'RESET LABOR BILL',DeleteType:'laborbill'})} className="btn btn-sm btn-danger text-white fw-bold   border-0 rounded-2" type='button'>RESET LABOR BILL</button>
                        <button data-bs-toggle="modal" data-bs-target="#ResetModalButtonPress" onClick={() => setRestModal({Title:'RESET MEMBER BILL',DeleteType:'member'})} className="btn btn-sm btn-danger text-white fw-bold   border-0 rounded-2" type='button'>RESET MEMBER</button>
                        <button data-bs-toggle="modal" data-bs-target="#ResetModalButtonPress" onClick={() => setRestModal({Title:'RESET ITEM BILL',DeleteType:'item'})} className="btn btn-sm btn-danger text-white fw-bold   border-0 rounded-2" type='button'>RESET ITEM</button>
                        <button data-bs-toggle="modal" data-bs-target="#ResetModalButtonPress" onClick={() => setRestModal({Title:'RESET COMPLETE APPLICATION',DeleteType:'completeapplication'})} className="btn btn-sm btn-danger text-white fw-bold   border-0 rounded-2" type='button'>RESET COMPLETE APPLICATION</button>

                    </div>
                </div>



            </div> : ''
    )
}

export default Setting

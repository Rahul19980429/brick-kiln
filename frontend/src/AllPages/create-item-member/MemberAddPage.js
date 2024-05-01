import React, { useContext, useState, useEffect, useRef } from 'react';
import context from '../../ContextApi/Context'
import { useNavigate } from 'react-router-dom';

const MemberAddPage = () => {
    const [handleUseEffect, setHandleUseEffect] = useState(false)

    const setDateFunc = (mdate) => {
        let date = new Date(mdate)
        return date.getFullYear() + "-" + (date.getMonth() + 1 < 10 ? '0' + parseInt(date.getMonth() + 1) : parseInt(date.getMonth() + 1)) + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())

    }


    let navigate = useNavigate();

    const [search, setSearch] = useState('')

    // useRef init
    const dateInputRef = useRef(null);

    // D-structuring 
    const a = useContext(context);
    const { members, getAllMember, AddNewMember, DeleteMember, error, setError, logOutClick, UpdateMember } = a;
    // useState for inputs
    const [input, setInput] = useState({ name: '', category: 'customer', address: '', contact: '', initialBalance: ''});
    // useState for Member's Balance
    const [memberBalance, setMemberBalance] = useState(0)
    //useState for balance date
    const [balanceDate, setBalanceDate] = useState(setDateFunc(new Date()));
    //useState for member update (id)
    const [memberId, setMemberId] = useState('')

    // useState for All Member
    const [Allmembers, setAllmembers] = useState([]);





    // on change
    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })

    }
    //for date change 
    const handleChange = (e) => {
        setBalanceDate(e.target.value);
    }
    // only number allowed
    const keypress = (e) => {
        if (isNaN(e.target.value)) {
            e.target.value = "";
            setInput({ ...input, [e.target.name]: e.target.value })

        }
        else {
            setInput({ ...input, [e.target.name]: e.target.value })
            if (input.initialBalance) {
                setMemberBalance(input.initialBalance)
            }
        }

    }

    // set Cr Dr
    const initialBalance = (e) => {
        setMemberBalance(e.target.value)
    }
    // on submit
    const submitMember = (e) => {
        e.preventDefault()
        if (!input.name || !input.address || !input.contact) {
            setError({ error: "Empty field is not allowed" })
        }
        else if (input.contact.length !== 10) {
            setError({ error: "Required 10 digit Number " })
        }
        else {
            AddNewMember(input.name.toLowerCase(), input.category, input.contact, input.address, memberBalance, balanceDate)
            setHandleUseEffect(handleUseEffect === false ? true : false)
            clearInput()
        }
    }

    const updateMember = (id, data) => {
        if (!input.name || !input.address || !input.contact) {
            setError({ error: "Empty field is not allowed" })
        }
        else if (input.contact.length !== 10) {
            setError({ error: "Required 10 digit Number " })
        }
        else {
            const { name, category, contact, address } = data;
            UpdateMember(id, name, category, contact, address, memberBalance, balanceDate)
            setHandleUseEffect(handleUseEffect === false ? true : false)
            clearInput()
        }
    }

    const clearInput = () => {
        setInput({ name: '', address: '', contact: '', initialBalance: '', category: 'customer' })
        setBalanceDate(setDateFunc(new Date()));
        setMemberBalance(0)
        setMemberId('')

    }

    const editMember = (memberData) => {

        setInput({
            name: memberData.name, category: memberData.category,
            address: memberData.address, contact: memberData.contact,
            initialBalance: memberData.initialBalance
        })
        setBalanceDate(setDateFunc(memberData.initialBalanceDate))
        setMemberBalance(memberData.initialBalance)
        setMemberId(memberData._id)

    }


    const getCategory = (category) => {
        if (category === 'all') {
            setAllmembers(members)
        }
        else {
            if(category==='labor'){
                let result = members.filter((data) => { return data.category.split('-')[1] === category });
                setAllmembers(result)
            }
            else{

                let result = members.filter((data) => { return data.category === category });
                setAllmembers(result)
            }
            
           
        }

    }

    const deleteMemberFunc = (memberId) => {
        let bool = window.confirm("Are You Sure?")
        if (bool) {
            DeleteMember(memberId).then((data) => {
                if (data === true) {
                    getAllMember().then((data) => setAllmembers(data.result))
                }
            })
        }
    }


    // useEffect
    useEffect(() => {
        if (!localStorage.getItem('Jwt_token') || localStorage.getItem('user_activeStatus') === 'false') {
            if (localStorage.getItem('user_activeStatus') === 'false') {
                setError({ 'error': <span className='text-center'>YOUR ACCESS IS STOPPED BY ADMIN PLEASE RENEWAL YOUR ACCOUNT</span> })
            }
            logOutClick();
            navigate('/login')
        }
        else {
            getAllMember().then((data) => setAllmembers(data.result))
        }
    }, [handleUseEffect])

    if (error.length !== 0) {
        setTimeout(() => {
            setError('')
        }, 2500);
    }
    return (
        localStorage.getItem('Jwt_token') && localStorage.getItem('user_activeStatus') === 'true' ?
            <div className='container py-3'>
                <div className='row px-3'>
                    <div className='col-lg-4 px-5 mt-3 card'>
                        <h4 className='my-3 text-center  text-primary fw-bold'> ADD MEMBER </h4>
                        <div className='row'>
                            <div className='col-12'>

                                <div className="input-group mb-3  border border-white rounded-1 ">
                                    <span className=" input-group-text border-0 rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus-fill text-primary" viewBox="0 0 16 16">
                                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                                    </svg></span>
                                    <input autoComplete='off' type="text" className="form-control" placeholder='Enter Name' onChange={onChange} value={input.name} id="name" name="name" aria-describedby="emailHelp" />
                                </div>
                                <div className="input-group mb-3 border border-white rounded-1">
                                    <span className=" input-group-text  border-0 rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-bounding-box text-primary" viewBox="0 0 16 16">
                                        <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z" />
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    </svg></span>

                                    <select className="form-select" aria-label="Default select example" name='category' value={input.category} onChange={onChange}>
                                        <option value="customer">Customer</option>
                                        <option value="supplier">Supplier</option>
                                        <option value="transport">Transport</option>
                                        <option value="production-labor">Production Labor</option>
                                        <option value="salary-labor">Salary Labor</option>
                                    </select>
                                </div>
                                
                               
                                <div className="input-group mb-3 border border-white rounded-1">
                                    <span className=" input-group-text  border-0 rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill text-primary" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                    </svg></span>
                                    <input autoComplete='off' onKeyUp={keypress} type="text" className="form-control" placeholder='Enter Contact' maxLength={10} minLength={10} onChange={onChange} value={input.contact} id="contact" name="contact" />
                                </div>
                                <div className="input-group mb-3 border border-white rounded-1">
                                    <span className="input-group-text  border-0 rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-add-fill text-primary" viewBox="0 0 16 16">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 1 1-1 0v-1h-1a.5.5 0 1 1 0-1h1v-1a.5.5 0 0 1 1 0Z" />
                                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
                                        <path d="m8 3.293 4.712 4.712A4.5 4.5 0 0 0 8.758 15H3.5A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
                                    </svg></span>
                                    <textarea autoComplete='off' type="text" className="form-control" placeholder='Enter Address' onChange={onChange} value={input.address} id="address" name="address" aria-describedby="emailHelp"></textarea>

                                </div>

                                <div className="input-group mb-3 border border-white rounded-1">
                                    <span className=" input-group-text  border-0 rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-primary bi bi-currency-rupee" viewBox="0 0 16 16">
                                        <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z" />
                                    </svg></span>
                                    <input autoComplete='off' onKeyUp={keypress} type="text" className="form-control" placeholder='Enter Last Balance' onChange={onChange} value={input.initialBalance} id="initialBalance" name="initialBalance" />
                                </div>
                                <div className="input-group mb-3 border border-white rounded-1 justify-content-end">
                                    <div onChange={initialBalance}>
                                        <input type="radio" value={input.initialBalance} name="balance" defaultChecked /><label className='me-3'>Cr</label>
                                        <input type="radio" value={-(input.initialBalance)} name="balance" /><label className='me-2'>Dr</label>
                                    </div>
                                </div>
                                <div className="input-group input-group-sm ">
                                    <span className="input-group-text text-primary" id="inputGroup-sizing-sm">Date</span>
                                    <input type="date" value={balanceDate} name='balanceDate' onChange={handleChange} ref={dateInputRef} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                                </div>


                                <div className="mb-3 text-danger ">
                                    <h6 className='text-center'>{error.error ? error.error : error}</h6>
                                </div>
                                <div className="d-flex gap-2 mt-2">
                                    <button className="btn btn-primary fw-bold  mb-4 " disabled={!input.contact || !input.name || !input.address || memberId ? true : false} onClick={(e) => submitMember(e)}>Create</button>
                                    <button className="btn btn-primary fw-bold  mb-4 " disabled={!memberId || !input.contact || !input.name || !input.address ? true : false} onClick={() => updateMember(memberId, input)} >Update</button>
                                    <button className="btn btn-primary fw-bold  mb-4 " disabled={!input.contact && !input.name && !input.address ? true : false} onClick={() => clearInput()}>Cancel</button>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className='col-lg-7 offset-lg-1'>
                        <div className='row mt-3'>
                            <div className='col-lg-12'>
                                <div className="d-flex gap-2 mt-2">
                                    <button className="btn btn-primary fw-bold ms-3 " onClick={(e) => getCategory('all')}>All</button>
                                    <button className="btn btn-primary fw-bold " onClick={() => getCategory('customer')} >Customer</button>
                                    <button className="btn btn-primary fw-bold " onClick={(e) => getCategory('supplier')}>Supplier</button>
                                    <button className="btn btn-primary fw-bold " onClick={() => getCategory('transport')} >Transport</button>
                                    <button className="btn btn-primary fw-bold " onClick={() => getCategory('labor')}>Labor</button>
                                    <input className=" form-control " value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
                                </div>

                            </div>

                        </div>


                        <hr className='mb-0' />
                        <div className=' px-1 px-lg-3 py-2' style={{ overflowY: 'scroll', height: '70vh' }}>
                            {Allmembers.length === 0 ? <h5 className=' text-center text-primary'>NOT FOUND</h5> :

                                search === '' ?

                                    Allmembers.map((memberData, index) => {

                                        return (
                                            <div className="card mb-2" key={memberData._id}>
                                                <div className="card-body p-2 fw-bold">
                                                    <div className='row'>
                                                        <div className='col-1 d-flex justify-content-center align-items-center'>
                                                            {index + 1}
                                                        </div>
                                                        <div className='col-9'>
                                                            <div className='row'>
                                                                <div className='col-lg-12 p-0'>
                                                                    <p className="mb-0">Name: {memberData.name} #{memberData.contact} #{memberData.category} Address: {memberData.address}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-2'>
                                                            <button className='btn btn-primary btn-sm me-1' onClick={() => editMember(memberData)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                            </svg></button>
                                                            <button className='btn btn-primary btn-sm' onClick={() => deleteMemberFunc(memberData._id, memberData.category)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                            </svg></button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        )

                                    }) : Allmembers.filter((mdata) => mdata.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 || mdata.contact.toLowerCase().indexOf(search.toLowerCase()) !== -1).map((memberData, index) => {

                                        return (
                                            <div className="card mb-2" key={memberData._id}>
                                                <div className="card-body p-2 fw-bold">
                                                    <div className='row'>
                                                        <div className='col-1 d-flex justify-content-center align-items-center'>
                                                            {index + 1}
                                                        </div>
                                                        <div className='col-9'>
                                                            <div className='row'>
                                                                <div className='col-lg-12 p-0'>
                                                                    <p className="mb-0">Name: {memberData.name} #{memberData.contact} #{memberData.category} Address: {memberData.address}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-2'>
                                                            <button className='btn btn-primary btn-sm me-1' onClick={() => editMember(memberData)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                            </svg></button>
                                                            <button className='btn btn-primary btn-sm' onClick={() => deleteMemberFunc(memberData._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                            </svg></button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        )

                                    })}
                        </div>


                    </div>
                </div>

            </div> : ''
    )
}

export default MemberAddPage

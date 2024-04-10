import React, { useContext, useState, useEffect } from 'react';
import context from '../../ContextApi/Context'
import { useNavigate } from 'react-router-dom';

const ItemAddPage = () => {
    let navigate = useNavigate();
    const [search, setSearch] = useState('')
    const [itemId, setItemId] = useState('')
    const a = useContext(context);
    const { items, getAllItem, AddNewItem, error, setError, logOutClick, UpdateItem } = a;
    const [itemInput, setItemInput] = useState({ itemName: '', category: 'good', itemRate:0});

    const onChange = (e) => {
        setItemInput({ ...itemInput, [e.target.name]: e.target.value })
    }
    const keypress = (e) => {
        if (isNaN(e.target.value)) {
            e.target.value = "";
            setItemInput({ ...itemInput, [e.target.name]: e.target.value })

        }
        else {
            setItemInput({ ...itemInput, [e.target.name]: e.target.value })
        }

    }

    const submitItem = (e) => {
        e.preventDefault()

        if (!itemInput.itemName) {
            alert("Empty field is not allowed")
        }
        else {
            AddNewItem(itemInput.itemName.toLowerCase(), itemInput.category, itemInput.itemRate);
            clearInput()

        }

    }

    const updateMember = (id, data) => {
        const { itemName, category , itemRate } = data;
        UpdateItem(id, itemName, category,itemRate)
        clearInput()
    }
    const clearInput = () => {
        setItemInput({ itemName: '', category: 'gold',itemRate: 0 })
        setItemId('')


    }
    const editMember = (itemData) => {
        setItemInput({ itemName: itemData.itemname, category: itemData.category , itemRate: itemData.itemrate })
        setItemId(itemData._id)
    }

    if (error.length !== 0) {
        setTimeout(() => {
            setError('')
        }, 2500);
    }

    useEffect(() => {
        if (!localStorage.getItem('Jwt_token') || localStorage.getItem('user_activeStatus') === 'false') {
            if (localStorage.getItem('user_activeStatus') === 'false') {
                setError({ 'error': <span className='text-center'>YOUR ACCESS IS STOPPED BY ADMIN PLEASE RENEWAL YOUR ACCOUNT</span> })
            }
            logOutClick();
            navigate('/login')
        }
        else {
            getAllItem()
        }
    }, [])


    return (
        localStorage.getItem('Jwt_token') && localStorage.getItem('user_activeStatus') === 'true' ?
            <div className='container py-3'>
                <div className='row px-3'>
                    <div className='col-lg-4 px-5 mt-5 card'>
                        <h4 className='my-3 text-center text-primary fw-bold'> ADD ITEM </h4>
                        <div className='row'>
                            <div className='col-12'>

                                <div className="input-group mb-3  border border-white rounded-1 ">
                                    <span className=" input-group-text border-0 rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-primary bi bi-plus-square-fill" viewBox="0 0 16 16">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                                    </svg></span>
                                    <input autoComplete='off' type="text" className="form-control" placeholder='Enter Name' onChange={onChange} value={itemInput.itemName} id="itemName" name="itemName" aria-describedby="emailHelp" />
                                </div>
                                <div className="input-group mb-3 border border-white rounded-1">
                                    <span className=" input-group-text  border-0 rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-primary bi bi-exclude" viewBox="0 0 16 16">
                                        <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm12 2H5a1 1 0 0 0-1 1v7h7a1 1 0 0 0 1-1V4z" />
                                    </svg></span>

                                    <select className="form-select" aria-label="Default select example" name='category' id="category" value={itemInput.category} onChange={onChange}>
                                        <option value="gold">Good</option>
                                    </select>
                                </div>
                                <div className="input-group mb-3  border border-white rounded-1 ">
                                    <span className=" input-group-text border-0 rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-primary bi bi-currency-rupee" viewBox="0 0 16 16">
                                        <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                                    </svg></span>
                                    <input autoComplete='off'onKeyUp={keypress} type="text" className="form-control" placeholder='Enter Rate' onChange={onChange} value={itemInput.itemRate} id="itemRate" name="itemRate" aria-describedby="emailHelp" />
                                </div>

                                <div className="mb-3 text-danger ">
                                    <h6 className='text-center'>{error.error ? error.error : error}</h6>
                                </div>
                                <div className="d-grid gap-2 mt-2">
                                    <div className="d-flex gap-2 mt-2">
                                        <button className="btn btn-primary fw-bold  mb-4 " disabled={!itemInput.itemName || itemId ? true : false} onClick={(e) => submitItem(e)}>Create</button>
                                        <button className="btn btn-primary fw-bold  mb-4 " disabled={!itemId || !itemInput.itemName ? true : false} onClick={() => updateMember(itemId, itemInput)} >Update</button>
                                        <button className="btn btn-primary fw-bold  mb-4 " disabled={!itemInput.itemName ? true : false} onClick={() => clearInput()}>Cancel</button>
                                    </div>
                                </div>

                                <p className='text-justify fw-bold text-primary'><small>Note: Item Name Must Be Unique</small></p>

                            </div>
                        </div>

                    </div>
                    <div className='col-lg-6 offset-lg-2'>
                        <div className='row mt-3'>
                            <div className='col-lg-12 d-flex'>
                                <input className=" form-control me-5 ms-lg-3 " value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
                            </div>

                        </div>


                        <hr className='mb-0' />
                        <div className=' px-1 px-lg-3 py-2' style={{ overflowY: 'scroll', maxHeight: '40vh' }}>

                            {items.length === 0 ? <h5 className='text-primary text-center'>NOT FOUND</h5> :
                                search === '' ?
                                    items.map((itemData, index) => {

                                        return (
                                            <div className="card mb-2" key={itemData._id}>
                                                <div className="card-body p-2">
                                                    <div className='row'>
                                                        <div className='col-1 d-flex justify-content-center align-items-center'>
                                                            {index + 1}
                                                        </div>
                                                        <div className='col-9'>
                                                            <p className="card-title mb-0 fw-bold px-2  ">Item Name: {itemData.itemname}, Item Rate: {itemData.itemrate}</p>
                                                        </div>
                                                        <div className='col-2'>
                                                            <button className='btn btn-primary btn-sm' onClick={() => editMember(itemData)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                            </svg></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )

                                    }) : items.filter((mdata) => mdata.itemname.toLowerCase().indexOf(search.toLowerCase()) !== -1).map((itemData, index) => {

                                        return (
                                            <div className="card mb-2" key={itemData._id}>
                                                <div className="card-body p-2">
                                                    <div className='row'>
                                                        <div className='col-1 d-flex justify-content-center align-items-center'>
                                                            {index + 1}
                                                        </div>
                                                        <div className='col-lg-9'>
                                                            <p className="card-title mb-0 fw-bold px-2  ">Item Name: {itemData.itemname}, Item Rate: {itemData.itemrate}</p>
                                                        </div>
                                                        <div className='col-2'>
                                                            <button className='btn btn-primary btn-sm' onClick={() => editMember(itemData)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
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

export default ItemAddPage

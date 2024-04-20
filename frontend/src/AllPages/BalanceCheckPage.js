import React, { useContext, useEffect, useState, useRef } from 'react';
import context from '../ContextApi/Context'
import { useNavigate } from 'react-router-dom';
import ReactToPrint from 'react-to-print';

const BalanceCheckPage = () => {
    const componentRef = useRef()
    let navigate = useNavigate();
    const a = useContext(context);
    const { getAllMember, setError, logOutClick } = a;

    let allVariable = {
        totalEntries: 0,
        totalBalance: 0
    }
    // useState
    const [balanceData, setBalanceData] = useState([])
    const [searchInput, setSearchInput] = useState({ textSearch: '', from: '', to: '' })

    const setintDate = (intdate) => {
        let date = new Date(intdate)
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    }


    const onChange = (e) => {
        setSearchInput({ ...searchInput, [e.target.name]: e.target.value })

    }


    const setdateAsgetTime = (date) => {
        let setDate = new Date(date);
        let date1 = new Date(setDate.getFullYear(), setDate.getMonth() + 1, setDate.getDate()).getTime();
        return date1;
    }
    const DateFilterFunction = (from, to, Data) => {
        let data = Data.filter((data) => { return (setdateAsgetTime(data.lastBalanceDate) >= setdateAsgetTime(from)) && (setdateAsgetTime(to) >= setdateAsgetTime(data.lastBalanceDate)) });
        return data;
    }

    const SubmitDateButton = () => {
        if (!searchInput.from || !searchInput.to) {
            document.getElementById('SellBillFilterBtn').disabled = true;
        }
        else {
            let data = DateFilterFunction(searchInput.from, searchInput.to, balanceData);
            setBalanceData(data)

        }

    }
    const RefreshBtn = () => {
        setSearchInput({ textSearch: '', from: '', to: '' })
        getAllMember().then((data) => setBalanceData(data.result))

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

            getAllMember().then((data) => setBalanceData(data.result))
        }
    }, [])

    return (
        localStorage.getItem('Jwt_token') && localStorage.getItem('user_activeStatus') === 'true' ?
            <div className='container-fluid'>

                <div className='row my-3'>
                    {/* text */}
                    <div className='col-lg-3 col-12'>
                        <h5 className='text-center bg-dark text-white mb-0 py-2'>Balance</h5>
                    </div>
                    {/* search */}
                    <div className='col-lg-2 '>
                        <input autoComplete='off' onChange={(e) => onChange(e)} className=" form-control me-5 ms-lg-3 " value={searchInput.textSearch} name="textSearch" id="textSearch" type="search" placeholder="Search" aria-label="Search" />
                    </div>
                    {/* date vise search */}
                    <div className="col-lg-7 d-flex gap-3">
                        <div className="input-group">
                            <span className="input-group-text text-white bg-dark ">Date From</span>
                            <input onChange={(e) => onChange(e)} autoComplete="off" type="date" className="form-control" value={searchInput.from} name="from" id="from" />
                        </div>
                        <div className="input-group">
                            <span className="input-group-text text-white bg-dark ">Date To</span>
                            <input onChange={(e) => onChange(e)} autoComplete="off" type="date" className="form-control" value={searchInput.to} name="to" id="to" />
                        </div>
                        <div className="d-flex gap-2 justify-content-center">
                            <button className="btn btn-dark fw-bold" onClick={() => SubmitDateButton()} id="SellBillFilterBtn" disabled={!searchInput.from || !searchInput.to ? true : false}>OK</button>
                            <button className="btn btn-dark fw-bold" onClick={() => RefreshBtn()}>REFRESH</button>
                        </div>
                        <ReactToPrint
                            trigger={() => {
                                return <button className="btn btn-dark fw-bold">Print</button>;
                            }}
                            content={() => componentRef.current}
                            documentTitle='Sale-Bill-Entry'
                            pageStyle='print'

                        />

                    </div>
                </div>
                <hr className='mb-1' />
                <div className='row'>
                    <div className='col-12' ref={componentRef}>
                        <table className="table table-success table-striped mb-0 mt-2" >
                            <thead className='sticky-top'>
                                <tr>
                                    <th scope="col" className='border-end border-dark'>#</th>
                                    <th scope="col" className='border-end border-dark'>Name</th>
                                    <th scope="col" className='border-end border-dark'>Group</th>
                                    <th scope="col" className='border-end border-dark'>Contact</th>
                                    <th scope="col" className='border-end border-dark'>Address</th>
                                    <th scope="col" className='border-end border-dark'>Balance Left</th>
                                    <th scope="col" className='border-end border-dark'>B.L. Date</th>


                                </tr>
                            </thead>
                            <tbody>
                                {balanceData.length > 0 ?
                                    (balanceData.filter((fdata) => parseFloat(fdata.lastBalance) !== 0)).length > 0 ?
                                        searchInput.textSearch === '' ?
                                            balanceData.filter((fdata) => parseFloat(fdata.lastBalance) !== 0).map((data, index) => {
                                                allVariable.totalEntries = allVariable.totalEntries + 1
                                                allVariable.totalBalance = allVariable.totalBalance + parseInt(data.lastBalance)
                                                return <tr key={data._id} >
                                                    <td className='border-end border-dark'>{index + 1}</td>
                                                    <td className='border-end border-dark'>{data.name}</td>
                                                    <td className='border-end border-dark'>{data.category}</td>
                                                    <td className='border-end border-dark'>{data.contact}</td>
                                                    <td className='border-end border-dark'>{data.address}</td>
                                                    <td className='border-end border-dark'>{Math.floor(data.lastBalance)}</td>
                                                    <td className='border-end border-dark'>{setintDate(data.lastBalanceDate)}</td>
                                                </tr>
                                            })
                                            : balanceData.filter((data) => parseInt(data.lastBalance) !== 0 && (data.contact.toLowerCase().indexOf(searchInput.textSearch.toLowerCase()) !== -1 || data.name.toLowerCase().indexOf(searchInput.textSearch.toLowerCase()) !== -1 || data.category.toLowerCase().indexOf(searchInput.textSearch.toLowerCase()) !== -1)).map((data, index) => {
                                                allVariable.totalEntries = allVariable.totalEntries + 1
                                                allVariable.totalBalance = allVariable.totalBalance + parseInt(data.lastBalance)
                                                return <tr key={data._id} >
                                                    <td className='border-end border-dark'>{index + 1}</td>
                                                    <td className='border-end border-dark'>{data.name}</td>
                                                    <td className='border-end border-dark'>{data.category}</td>
                                                    <td className='border-end border-dark'>{data.contact}</td>
                                                    <td className='border-end border-dark'>{data.address}</td>
                                                    <td className='border-end border-dark'>{Math.floor(data.lastBalance)}</td>
                                                    <td className='border-end border-dark'>{setintDate(data.lastBalanceDate)}</td>
                                                </tr>
                                            })
                                        : <tr><td colSpan={7} className='text-center'>Data Will Display Here </td></tr>
                                    : <tr><td colSpan={7} className='text-center'>Data Will Display Here </td></tr>}
                            </tbody>
                            <tfoot className='sticky-bottom'>
                                <tr>
                                    <th colSpan={3}> Number Of Entries:{allVariable.totalEntries}</th>

                                    <th colSpan={4}> Total Balance: {allVariable.totalBalance} Rs.</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div> : ''
    )
}

export default BalanceCheckPage

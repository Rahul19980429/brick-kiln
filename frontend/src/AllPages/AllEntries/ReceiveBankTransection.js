import React, { useState, useContext, useEffect, useRef } from 'react';
import context from '../../ContextApi/Context'
import { useNavigate,Link } from 'react-router-dom';
import ReactToPrint from 'react-to-print';


const ReceiveBankTransection = () => {
    const componentRef = useRef()
    let navigate = useNavigate();
    let customerData;
    let date;
    let amount = 0;
    let allVariable = {
        recAmountTotal: 0,
        totalEntries: 0,
        totalRecAmount: 0,

    }
    const a = useContext(context);
    const { getAllBills, members, getAllMember, setError, logOutClick, spinner } = a;

    // useState 
    const [bankTransection, setBankTransection] = useState([])
    const [searchInput, setSearchInput] = useState({ textSearch: '', from: '', to: '' })

    const onChange = (e) => {
        setSearchInput({ ...searchInput, [e.target.name]: e.target.value })

    }

    function getcustomerId(data) {
        if (data.contact.toLowerCase().indexOf(searchInput.textSearch.toLowerCase()) !== -1 || data.name.toLowerCase().indexOf(searchInput.textSearch.toLowerCase()) !== -1) {
            return data._id
        }
    }
    const setdateAsgetTime = (date) => {
        let setDate = new Date(date);
        let date1 = new Date(setDate.getFullYear(), setDate.getMonth() + 1, setDate.getDate()).getTime();
        return date1;
    }
    const DateFilterFunction = (from, to, Data) => {
        let data = Data.filter((data) => { return (setdateAsgetTime(data.date) >= setdateAsgetTime(from)) && (setdateAsgetTime(to) >= setdateAsgetTime(data.date)) });
        return data;
    }

    const SubmitDateButton = () => {
        if (!searchInput.from || !searchInput.to) {
            document.getElementById('BankEntryFilterBtn').disabled = true;
        }
        else {
            let data = DateFilterFunction(searchInput.from, searchInput.to, bankTransection);
            setBankTransection(data)

        }

    }
    const RefreshBtn = () => {
        setSearchInput({ textSearch: '', from: '', to: '' })
        getAllBills().then((final) => setBankTransection(final.filter((dataa) => dataa.receiptInfo.find((dataaa) => dataaa.mode === 'online')).sort((a, b) => setDateFunction(a.date) - setDateFunction(b.date))))

    }
    function setDateFunction(fDate) {
        let dateConvert = new Date(fDate);
        return dateConvert.getTime();

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
            // getAllSellBill().then((data) => setBankTransection(data.result.filter((dataa)=>dataa.receiptInfo.find((dataaa)=>dataaa.mode==='online'))))
            getAllMember()
            getAllBills().then((final) => setBankTransection(final.filter((dataa) => dataa.receiptInfo.find((dataaa) => dataaa.mode === 'online')).sort((a, b) => setDateFunction(a.date) - setDateFunction(b.date))))

        }
    }, [])

    if (spinner === true) {
        return (
            <div style={{ height: '100vh' }} className=' d-flex justify-content-center align-items-center'>
                <h2>Loading...</h2>
            </div>
        )
    }

    return (
        localStorage.getItem('Jwt_token') && localStorage.getItem('user_activeStatus') === 'true' ?
            <div className='container-fluid'>
                <div className='row mt-3'>
                    {/* text */}
                    <div className='col-lg-3 col-12'>
                        <h5 className='text-center bg-dark text-white mb-0 py-2'>Bank Transection Entry</h5>
                    </div>
                    {/* search */}
                    <div className='col-lg-2'>
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
                            <button className="btn btn-dark fw-bold" onClick={() => SubmitDateButton()} id="BankEntryFilterBtn" disabled={!searchInput.from || !searchInput.to ? true : false}>OK</button>
                            <button className="btn btn-dark fw-bold" onClick={() => RefreshBtn()}>REFRESH</button>
                        </div>
                        <ReactToPrint
                            trigger={() => {
                                return <button className="btn btn-dark fw-bold">Print</button>;
                            }}
                            content={() => componentRef.current}
                            documentTitle={`Bank-Transection-Entry-${Date.now()}`}
                            pageStyle='print'

                        />

                    </div>
                </div>
                <hr  />

                <div className='row'>
                    <div className='col-10' ref={componentRef} >
                        <table className="table table-success table-striped mb-0" >
                            <thead className='sticky-top'>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Receive From </th>
                                    <th scope="col">Transfer To </th>
                                    {/* <th scope="col">Amount</th> */}
                                    <th scope="col">Bill No.</th>
                                    <th scope="col">Date</th>

                                </tr>
                            </thead>
                            <tbody>

                                {bankTransection.length > 0 && members.length > 0 ?

                                    searchInput.textSearch === '' ?
                                        bankTransection.map((data, index) => {
                                            customerData = members.filter((mdata) => mdata._id === data.customer_id || mdata._id === data.supplier_id || mdata._id === data.transport_id || mdata._id === data.labor_id);
                                            date = new Date(data.date)
                                            allVariable.totalEntries = allVariable.totalEntries + 1
                                            return (<tr key={data._id}>

                                                <><td className='border-end border-dark'>{index + 1}</td>
                                                    <td className='border-end border-dark'>{customerData[0].name} #{customerData[0].contact}</td>
                                                    <td className='border-end border-dark'>
                                                        <table>
                                                            <tbody>
                                                                {data.receiptInfo.length > 0 ? data.receiptInfo.filter((bankData) => bankData.mode === 'online').map((data, index) => {
                                                                    allVariable.recAmountTotal = allVariable.recAmountTotal + parseInt(data.amount)
                                                                    allVariable.totalRecAmount = allVariable.totalRecAmount + parseInt(data.amount)
                                                                    return <tr key={index}>
                                                                        <td>{data.bankName} {data.amount ? data.amount : 0} amount</td>
                                                                    </tr>
                                                                }) : 0}
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    {data.sellBillNumber ? <td className='border-end border-dark'>{data.sellBillNumber} sale bill</td> : ''}
                                                    {data.purchaseBillNumber ? <td className='border-end border-dark'>{data.purchaseBillNumber} purchase bill</td> : ''}
                                                    {data.transportBillNumber ? <td className='border-end border-dark'>{data.transportBillNumber} transport bill</td> : ''}
                                                    {data.laborBillNumber ? <td className='border-end border-dark'>{data.laborBillNumber} labor bill</td> : ''}
                                                    <td className='border-end border-dark'>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} {date.getHours()}:{date.getMinutes()}</td>
                                                    {/* hidden re-initialise amount here */}
                                                    <td className='d-none'>{amount = 0}{allVariable.recAmountTotal = 0}</td></>


                                            </tr>)

                                        })

                                        : <>


                                            {
                                                bankTransection.filter((data) => members.filter(getcustomerId).map((data) => data._id).includes(data.customer_id || data.supplier_id || data.transport_id || data.labor_id)).map((data, index) => {
                                                    customerData = members.filter((mdata) => mdata._id === data.customer_id || mdata._id === data.supplier_id || mdata._id === data.transport_id || mdata._id === data.labor_id);
                                                    date = new Date(data.date)
                                                    allVariable.totalEntries = allVariable.totalEntries + 1
                                                    return (<tr key={data._id}>

                                                        <><td className='border-end border-dark'>{index + 1}</td>
                                                            <td className='border-end border-dark'>{customerData[0].name} #{customerData[0].contact}</td>
                                                            <td className='border-end border-dark'>
                                                                <table>
                                                                    <tbody>
                                                                        {data.receiptInfo.length > 0 ? data.receiptInfo.map((data, index) => {
                                                                            allVariable.recAmountTotal = allVariable.recAmountTotal + parseInt(data.amount)
                                                                            allVariable.totalRecAmount = allVariable.totalRecAmount + parseInt(data.amount)
                                                                            return <tr key={index}>
                                                                                <td>{data.bankName} {data.amount ? data.amount : 0} amount</td>
                                                                            </tr>
                                                                        }) : 0}
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                            {data.sellBillNumber ? <td className='border-end border-dark'>{data.sellBillNumber} sale bill</td> : ''}
                                                            {data.purchaseBillNumber ? <td className='border-end border-dark'>{data.purchaseBillNumber} purchase bill</td> : ''}
                                                            {data.transportBillNumber ? <td className='border-end border-dark'>{data.transportBillNumber} transport bill</td> : ''}
                                                            {data.laborBillNumber ? <td className='border-end border-dark'>{data.laborBillNumber} labor bill</td> : ''}
                                                            <td className='border-end border-dark'>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} {date.getHours()}:{date.getMinutes()}</td>
                                                            {/* hidden re-initialise amount here */}
                                                            <td className='d-none'>{amount = 0}{allVariable.recAmountTotal = 0}</td></>


                                                    </tr>)

                                                })
                                            }
                                        </>

                                    : <tr><td colSpan={5} className='text-center'>Data Will Display Here </td></tr>
                                }
                            </tbody>
                            <tfoot className='sticky-bottom'>
                                <tr>
                                    <th colSpan={2}> Number Of Entries:{allVariable.totalEntries}</th>

                                    <th colSpan={3}> T.Receive: {allVariable.totalRecAmount} Rs.</th>

                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className='col-2 text-center'>
                        <Link to="/bank-transection-receive" className="btn btn-dark fw-bold me-2">Receice</Link>
                        <Link to="/bank-transection-payment" className="btn btn-dark fw-bold ">Payment</Link>
                    </div>
                </div>




            </div> : ''
    )
}

export default ReceiveBankTransection

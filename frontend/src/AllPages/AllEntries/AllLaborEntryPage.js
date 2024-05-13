import React, { useState, useContext, useEffect, useRef } from 'react';
import context from '../../ContextApi/Context'
import { useNavigate } from 'react-router-dom';
import ReactToPrint from 'react-to-print';

const AllLaborEntry = () => {
    const componentRef = useRef()
    let navigate = useNavigate();
    let customerData;
    let date;
    let amount = 0;
    let allVariable = {
        recAmountTotal:0,
        payAmountTotal:0,
        totalEntries: 0,
        totalSaleAmount: 0,
        totalRecAmount: 0,
        totalPayAmount: 0,
        totalDisAmount: 0

    }
    const a = useContext(context);
    const { getAllLaborBill, members, getAllMember, setError, logOutClick, spinner } = a;

    // useState 
    const [laborBill, setLaborBill] = useState([])
    const [searchInput, setSearchInput] = useState({ textSearch: '', from: '', to: '' })

    const onChange = (e) => {
        setSearchInput({ ...searchInput, [e.target.name]: e.target.value })

    }

    function getcustomerId(data) {
        if ((data.category === 'product-labor' ||data.category === 'salary-labor') && ( data.contact.toLowerCase().indexOf(searchInput.textSearch.toLowerCase()) !== -1|| data.name.toLowerCase().indexOf(searchInput.textSearch.toLowerCase()) !== -1)) {
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
            document.getElementById('laborBillFilterBtn').disabled = true;
        }
        else {
            let data = DateFilterFunction(searchInput.from, searchInput.to, laborBill);
            setLaborBill(data)

        }

    }
    const RefreshBtn = () => {
        setSearchInput({ textSearch: '', from: '', to: '' })
        getAllLaborBill().then((data) => setLaborBill(data.result))

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
            getAllLaborBill().then((data) => setLaborBill(data.result))
            getAllMember()

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
                        <h5 className='text-center bg-dark text-white mb-0 py-2'>Labor Bill Entry</h5>
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
                            <button className="btn btn-dark fw-bold" onClick={() => SubmitDateButton()} id="laborBillFilterBtn" disabled={!searchInput.from || !searchInput.to ? true : false}>OK</button>
                            <button className="btn btn-dark fw-bold" onClick={() => RefreshBtn()}>REFRESH</button>
                        </div>
                        <ReactToPrint
                            trigger={() => {
                                return <button className="btn btn-dark fw-bold">Print</button>;
                            }}
                            content={() => componentRef.current}
                            documentTitle={`Purchase-Bill-Entry-${Date.now()}`}
                            pageStyle='print'

                        />

                    </div>
                </div>
                <hr className='mb-1' />
                <div className='row'>
                    <div className='col-12' ref={componentRef} >
                        <table className="table table-success table-striped mb-0" >
                            <thead className='sticky-top'>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">labor</th>
                                    <th scope="col">last Bal.</th>
                                    <th scope="col" className='w-25'>Item Detail</th>
                                    <th scope="col">Bill No.</th>
                                    <th scope="col">Rec.Info.</th>
                                    <th scope="col">Pay.Info.</th>
                                    <th scope="col">Discount</th>
                                    <th scope="col">Bal. Now</th>
                                    <th scope="col">Date</th>

                                </tr>
                            </thead>
                            <tbody>
                                {laborBill.length > 0 && members.length > 0 ?
                                    searchInput.textSearch === '' ?
                                        laborBill.map((data, index) => {
                                            customerData = members.filter((mdata) => mdata._id === data.labor_id);
                                            date = new Date(data.date)
                                            allVariable.totalEntries = allVariable.totalEntries + 1
                                            allVariable.totalDisAmount = allVariable.totalDisAmount + parseInt(data.discountInfo.amount)
                                            return (<tr key={data._id}><td className='border-end border-dark'>{index + 1}</td>
                                                    <td className='border-end border-dark'>{customerData[0].name} #{customerData[0].contact}</td>
                                                    <td className='border-end border-dark'>{Math.floor(data.laborLastBalance)}</td>
                                                    
                                                    <td className='border-end border-dark'>
                                                        {data.itemsArray.map((data, index) => {
                                                            amount = amount + parseFloat(data.amount)
                                                            allVariable.totalSaleAmount = allVariable.totalSaleAmount + data.amount
                                                            return <h6 key={index}> {data.from?'from: '+data.from+', ':'Item: '+data.item+', '}
                                                            {data.to?'to: '+data.to+', ':'Quantity: '+data.quantity+', '} 
                                                            {data.chuti?'Chuti: '+data.chuti+', ':''}
                                                            {data.rate?'Rate: '+data.rate+', ':''}
                                                            {data.monthSalary?'MonthSalary: '+data.monthSalary+', ':''}
                                                            {data.numberOfDays?'NumberOfDays: '+data.numberOfDays+', ':''} 
                                                            {data.other?'other: '+data.other+', ':''}                                                                   
                                                            {data.amount?'amount: '+data.amount+', ':''} 
                                                        </h6>
                                                        })}
                                                    </td>
                                                    <td className='border-end border-dark'>{data.laborBillNumber}</td>
                                                    <td className='border-end border-dark'>
                                                        <table>
                                                            <tbody>
                                                            {data.receiptInfo.length>0? data.receiptInfo.map((data,index) => {
                                                                allVariable.recAmountTotal=allVariable.recAmountTotal+parseInt(data.amount)
                                                                allVariable.totalRecAmount = allVariable.totalRecAmount + parseInt(data.amount)
                                                                return <tr key={index}><td>{data.amount?data.amount:0} {data.mode?data.mode:''} {data.naration?data.naration:''}</td></tr>
                                                            }):0}
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td className='border-end border-dark'><table>
                                                            <tbody>
                                                            {data.paymentInfo.length>0? data.paymentInfo.map((data,index) => {
                                                                 allVariable.payAmountTotal=allVariable.payAmountTotal+parseInt(data.amount)
                                                                 allVariable.totalPayAmount = allVariable.totalPayAmount + parseInt(data.amount)
                                                                return <tr key={index}><td>{data.amount?data.amount:0} {data.mode?data.mode:''} {data.naration?data.naration:''}</td></tr>
                                                            }):0}
                                                            </tbody>
                                                        </table></td>
                                                    
                                                   
                                                    <td className='border-end border-dark'>{data.discountInfo.amount} {data.discountInfo.naration === 'naration' ? '' : data.discountInfo.naration}</td>
                                                    <td className='border-end border-dark'>{Math.floor(parseFloat(-amount) + parseFloat(data.laborLastBalance) + parseFloat(allVariable.payAmountTotal) - parseFloat(allVariable.recAmountTotal) + parseFloat(data.discountInfo.amount))}</td>
                                                    <td className='border-end border-dark'>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} {date.getHours()}:{date.getMinutes()}</td>
                                                    {/* hidden re-initialise amount here */}
                                                    <td className='d-none'>{amount = 0} {allVariable.payAmountTotal=0} {allVariable.recAmountTotal=0}</td></tr>)

                                        })

                                        : <>


                                            {
                                                laborBill.filter((data) => members.filter(getcustomerId).map((data) => data._id).includes(data.labor_id)).map((data, index) => {
                                                    customerData = members.filter((mdata) => mdata._id === data.labor_id);
                                                    date = new Date(data.date)
                                                    allVariable.totalEntries = allVariable.totalEntries + 1
                                                    allVariable.totalDisAmount = allVariable.totalDisAmount + parseInt(data.discountInfo.amount)
                                                    return (<tr key={data._id}><td className='border-end border-dark'>{index + 1}</td>
                                                            <td className='border-end border-dark'>{customerData[0].name} #{customerData[0].contact}</td>
                                                            <td className='border-end border-dark'>{Math.floor(data.laborLastBalance)}</td>
                                                            <td className='border-end border-dark'>
                                                                {data.itemsArray.map((data, index) => {
                                                                    amount = amount + parseFloat(data.amount)
                                                                    allVariable.totalSaleAmount = allVariable.totalSaleAmount + data.amount
                                                                    return <h6 key={index}> Item:{data.item}, Qt:{data.netWeight}, Rate:{data.rate},
                                                                        BillNo:{data.billNo} Other:{data.other}, Amount:{data.amount} </h6>
                                                                })}
                                                            </td>
                                                            <td className='border-end border-dark'>{data.laborBillNumber}</td>
                                                            <td className='border-end border-dark'>
                                                                <table>
                                                                    <tbody>
                                                                    {data.receiptInfo.length>0? data.receiptInfo.map((data,index) => {
                                                                        allVariable.recAmountTotal=allVariable.recAmountTotal+parseInt(data.amount)
                                                                        allVariable.totalRecAmount = allVariable.totalRecAmount + parseInt(data.amount)
                                                                        return <tr key={index}><td>{data.amount?data.amount:0} {data.mode?data.mode:''} {data.naration?data.naration:''}</td></tr>
                                                                    }):0}
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                            <td className='border-end border-dark'><table>
                                                                    <tbody>
                                                                    {data.paymentInfo.length>0? data.paymentInfo.map((data,index) => {
                                                                         allVariable.payAmountTotal=allVariable.payAmountTotal+parseInt(data.amount)
                                                                         allVariable.totalPayAmount = allVariable.totalPayAmount + parseInt(data.amount)
                                                                        return <tr key={index}><td>{data.amount?data.amount:0} {data.mode?data.mode:''} {data.naration?data.naration:''}</td></tr>
                                                                    }):0}
                                                                    </tbody>
                                                                </table></td>
                                                            
                                                           
                                                            <td className='border-end border-dark'>{data.discountInfo.amount} {data.discountInfo.naration === 'naration' ? '' : data.discountInfo.naration}</td>
                                                            <td className='border-end border-dark'>{Math.floor(parseFloat(-amount) + parseFloat(data.laborLastBalance) + parseFloat(allVariable.payAmountTotal) - parseFloat(allVariable.recAmountTotal) + parseFloat(data.discountInfo.amount))}</td>
                                                            <td className='border-end border-dark'>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} {date.getHours()}:{date.getMinutes()}</td>
                                                            {/* hidden re-initialise amount here */}
                                                            <td className='d-none'>{amount = 0} {allVariable.payAmountTotal=0} {allVariable.recAmountTotal=0}</td></tr>)

                                                })
                                            }
                                        </>

                                    : <tr><td colSpan={10} className='text-center'>Data Will Display Here </td></tr>
                                }
                            </tbody>
                            <tfoot className='sticky-bottom'>
                                <tr>
                                    <th colSpan={3}> Number Of Entries:{allVariable.totalEntries}</th>
                                    <th> T.Purchase: {allVariable.totalSaleAmount} Rs.</th>
                                     <th colSpan={2}> T.Receive: {allVariable.totalRecAmount} Rs.</th>
                                    <th colSpan={2}> T.Pay: {allVariable.totalPayAmount} Rs.</th>
                                    <th colSpan={2}> T.Discount: {allVariable.totalDisAmount} Rs.</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>




            </div> : ''
    )
}

export default AllLaborEntry

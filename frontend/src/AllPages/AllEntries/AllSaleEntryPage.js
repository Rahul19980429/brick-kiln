import React, { useState, useContext, useEffect } from 'react';
import context from '../../ContextApi/Context'
import { useNavigate } from 'react-router-dom';

const AllSaleEntry = () => {
    let navigate = useNavigate();
    let customerData;
    let date;
    let amount = 0;
    let allVariable = {
        totalEntries: 0,
        totalSaleAmount: 0,
        totalRecAmount: 0,
        totalPayAmount: 0,
        totalDisAmount: 0

    }
    const a = useContext(context);
    const { sellBill, getAllSellBill, members, getAllMember, setError, logOutClick, spinner } = a;

    // useState 

    const [searchInput, setSearchInput] = useState({ textSearch: '', from: '', to: '' })

    const onChange = (e) => {
        setSearchInput({ ...searchInput, [e.target.name]: e.target.value })

    }

    function getcustomerId(data) {
        if (data.category === 'customer' && data.name.toLowerCase().indexOf(searchInput.textSearch.toLowerCase()) !== -1) {
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
        /////////////////////////////////////////// continue here
    }

    const SubmitDateButton = () => {
        if (!searchInput.from || !searchInput.to) {
            document.getElementById('SellBillFilterBtn').disabled = true;
        }
        else {
            sellBill.sellBillData.filter((data) => data)

        }

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
            getAllSellBill()
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
                        <h5 className='text-center bg-dark text-white mb-0 py-2'>Customer Bill Entry</h5>
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
                            <button className="btn btn-dark fw-bold" onClick={() => setSearchInput({ textSearch: '', from: '', to: '' })}>REFRESH</button>
                        </div>
                        <button className="btn btn-dark fw-bold">Print</button>
                    </div>
                </div>
                <hr className='mb-1' />
                <div className='row'>
                    <div className='col-12' style={{ overflowY: 'scroll', height: '85vh' }}>
                        <table className="table table-success table-striped mb-0" >
                            <thead className='sticky-top'>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Customer</th>
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

                                {sellBill !== '' && members.length > 0 ?
                                    sellBill.sellBillData.length > 0 ?
                                        searchInput.textSearch === '' ?
                                            sellBill.sellBillData.map((data, index) => {
                                                customerData = members.filter((mdata) => mdata._id === data.customer_id);
                                                date = new Date(data.date)
                                                allVariable.totalEntries = allVariable.totalEntries + 1
                                                allVariable.totalRecAmount = allVariable.totalRecAmount + parseInt(data.receiptInfo.amount)
                                                allVariable.totalPayAmount = allVariable.totalPayAmount + parseInt(data.paymentInfo.amount)
                                                allVariable.totalDisAmount = allVariable.totalDisAmount + parseInt(data.discountInfo.amount)
                                                return (<tr key={data._id}>

                                                    <><td className='border-end border-dark'>{index + 1}</td>
                                                        <td className='border-end border-dark'>{customerData[0].name} #{customerData[0].contact}</td>
                                                        <td className='border-end border-dark'>{Math.floor(data.customerLastBalance)}</td>
                                                        <td className='border-end border-dark'>
                                                            {data.itemsArray.map((data, index) => {
                                                                amount = amount + parseFloat(data.amount)
                                                                allVariable.totalSaleAmount = allVariable.totalSaleAmount + data.amount
                                                                return <h6 key={index}> Item:{data.item}, Qt:{data.quentity}, Rate:{data.rate},
                                                                    VNo:{data.vehicleNo}, RefNo:{data.refNo}, Other:{data.other},
                                                                    Amount:{data.amount} </h6>
                                                            })}
                                                        </td>
                                                        <td className='border-end border-dark'>{data.sellBillNumber}</td>
                                                        <td className='border-end border-dark'>{data.receiptInfo.amount},{data.receiptInfo.naration === 'naration' ? '' : data.receiptInfo.naration}</td>
                                                        <td className='border-end border-dark'>{data.paymentInfo.amount},{data.paymentInfo.naration === 'naration' ? '' : data.paymentInfo.naration}</td>
                                                        <td className='border-end border-dark'>{data.discountInfo.amount},{data.discountInfo.naration === 'naration' ? '' : data.discountInfo.naration}</td>
                                                        <td className='border-end border-dark'>{Math.floor(parseFloat(amount) + parseFloat(data.customerLastBalance) + parseFloat(data.paymentInfo.amount) - parseFloat(data.receiptInfo.amount) - parseFloat(data.discountInfo.amount))}</td>
                                                        <td className='border-end border-dark'>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} {date.getHours()}:{date.getMinutes()}</td>
                                                        {/* hidden re-initialise amount here */}
                                                        <td className='d-none'>{amount = 0}</td></>


                                                </tr>)

                                            })

                                            : <>


                                                {
                                                    sellBill.sellBillData.filter((data) => members.filter(getcustomerId).map((data) => data._id).includes(data.customer_id)).map((data, index) => {
                                                        customerData = members.filter((mdata) => mdata._id === data.customer_id);
                                                        date = new Date(data.date)
                                                        allVariable.totalEntries = allVariable.totalEntries + 1
                                                        allVariable.totalRecAmount = allVariable.totalRecAmount + parseInt(data.receiptInfo.amount)
                                                        allVariable.totalPayAmount = allVariable.totalPayAmount + parseInt(data.paymentInfo.amount)
                                                        allVariable.totalDisAmount = allVariable.totalDisAmount + parseInt(data.discountInfo.amount)
                                                        return (<tr key={data._id}>

                                                            <><td className='border-end border-dark'>{index + 1}</td>
                                                                <td className='border-end border-dark'>{customerData[0].name} #{customerData[0].contact}</td>
                                                                <td className='border-end border-dark'>{Math.floor(data.customerLastBalance)}</td>
                                                                <td className='border-end border-dark'>
                                                                    {data.itemsArray.map((data, index) => {
                                                                        amount = amount + parseFloat(data.amount)
                                                                        allVariable.totalSaleAmount = allVariable.totalSaleAmount + data.amount
                                                                        return <h6 key={index}> Item:{data.item}, Qt:{data.quentity}, Rate:{data.rate},
                                                                            VNo:{data.vehicleNo}, RefNo:{data.refNo}, Other:{data.other},
                                                                            Amount:{data.amount} </h6>
                                                                    })}
                                                                </td>
                                                                <td className='border-end border-dark'>{data.sellBillNumber}</td>
                                                                <td className='border-end border-dark'>{data.receiptInfo.amount},{data.receiptInfo.naration === 'naration' ? '' : data.receiptInfo.naration}</td>
                                                                <td className='border-end border-dark'>{data.paymentInfo.amount},{data.paymentInfo.naration === 'naration' ? '' : data.paymentInfo.naration}</td>
                                                                <td className='border-end border-dark'>{data.discountInfo.amount},{data.discountInfo.naration === 'naration' ? '' : data.discountInfo.naration}</td>
                                                                <td className='border-end border-dark'>{Math.floor(parseFloat(amount) + parseFloat(data.customerLastBalance) + parseFloat(data.paymentInfo.amount) - parseFloat(data.receiptInfo.amount) - parseFloat(data.discountInfo.amount))}</td>
                                                                <td className='border-end border-dark'>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} {date.getHours()}:{date.getMinutes()}</td>
                                                                {/* hidden re-initialise amount here */}
                                                                <td className='d-none'>{amount = 0}</td></>


                                                        </tr>)

                                                    })
                                                }
                                            </>

                                        : <tr><td colSpan={10} className='text-center'>Data Will Display Here </td></tr>
                                    : <tr><td colSpan={10} className='text-center'>Data Will Display Here </td></tr>}
                            </tbody>
                            <tfoot className='sticky-bottom' style={{ backgroundColor: 'black' }}>
                                <tr>
                                    <th colSpan={3}> Number Of Entries:{allVariable.totalEntries}</th>
                                    <th> Total Sale's Amount:{allVariable.totalSaleAmount}</th>
                                    <th colSpan={2}> T.Receive Amount:{allVariable.totalRecAmount}</th>
                                    <th colSpan={2}> T.Pay Amount:{allVariable.totalPayAmount}</th>
                                    <th colSpan={2}> T.Discount Amount:{allVariable.totalDisAmount}</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>




            </div> : ''
    )
}

export default AllSaleEntry
import React, { useContext, useEffect } from 'react';
import context from '../ContextApi/Context'
import { useNavigate } from 'react-router-dom';



const AllSaleEntry = () => {
    let navigate = useNavigate();
    let customerData;
    let date;
    let amount = 0;
    const a = useContext(context);
    const { sellBill, getAllSellBill, members, getAllMember, setError, logOutClick, spinner } = a;
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
            <div>
                <h5 className='text-center py-2 bg-dark text-white mb-0'>Customer Bill Entry</h5>
                <table className="table table-success table-striped mb-0" >
                    <thead className='sticky-top'>
                        <tr>
                            <th scope="col" className='border-end border-dark'>#</th>
                            <th scope="col" className='border-end border-dark'>Customer</th>
                            <th scope="col" className='border-end border-dark'>last Bal.</th>
                            <th scope="col" className='border-end border-dark w-25'>Item Detail</th>
                            <th scope="col" className='border-end border-dark'>Bill No.</th>
                            <th scope="col" className='border-end border-dark'>Rec.Info.</th>
                            <th scope="col" className='border-end border-dark'>Pay.Info.</th>
                            <th scope="col" className='border-end border-dark'>Discount</th>
                            <th scope="col" className='border-end border-dark'>Bal. Now</th>
                            <th scope="col" className='border-end border-dark'>Date</th>

                        </tr>
                    </thead>
                    <tbody>

                        {sellBill !== '' && members.length > 0 ?
                            sellBill.sellBillData.length > 0 ?
                                sellBill.sellBillData.map((data, index) => {
                                    customerData = members.filter((mdata) => mdata._id === data.customer_id);
                                    date = new Date(data.date)

                                    return <tr key={data._id}  >
                                        <td className='border-end border-dark'>{index + 1}</td>
                                        <td className='border-end border-dark'>{customerData.map((cdata, index) => {
                                            return <h6 key={index}>{cdata.name} #{cdata.contact}</h6>
                                        })} </td>
                                        <td className='border-end border-dark'>{Math.floor(data.customerLastBalance)}</td>
                                        <td className='border-end border-dark'>{data.itemsArray.map((data, index) => {

                                            amount = amount + parseFloat(data.amount)
                                            return <h6 key={index}> Item:{data.item}, Qt:{data.quentity}, Rate:{data.rate},
                                                VNo:{data.vehicleNo}, RefNo:{data.refNo}, Other:{data.other},
                                                Amount:{data.amount} </h6>
                                        })}
                                        </td>
                                        <td className='border-end border-dark'>{data.sellBillNumber}</td>
                                        <td className='border-end border-dark'>{data.receiptInfo.amount},{data.receiptInfo.naration}</td>
                                        <td className='border-end border-dark'>{data.paymentInfo.amount},{data.paymentInfo.naration}</td>
                                        <td className='border-end border-dark'>{data.discountInfo.amount},{data.discountInfo.naration}</td>
                                        <td className='border-end border-dark'>{Math.floor(parseFloat(amount) + parseFloat(data.customerLastBalance) + parseFloat(data.paymentInfo.amount) - parseFloat(data.receiptInfo.amount)- parseFloat(data.discountInfo.amount))}</td>
                                        <td className='border-end border-dark'>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} {date.getHours()}:{date.getMinutes()}</td>
                                        {/* hidden re-initialise amount here */}
                                        <td className='d-none'>{amount = 0}</td>


                                    </tr>

                                }) : <tr><td colSpan={10} className='text-center'>Data Will Display Here </td></tr>
                            : <tr><td colSpan={10} className='text-center'>Data Will Display Here </td></tr>}
                    </tbody>
                </table>
            </div> : ''
    )
}

export default AllSaleEntry

import React, { useState, useContext, useEffect, useRef } from 'react';
import context from '../../ContextApi/Context'
import { useNavigate } from 'react-router-dom';
import ReactToPrint from 'react-to-print';

const FuelEntry = () => {
    const componentRef = useRef()
    let navigate = useNavigate();
    let customerData;
    let date;
    let amount = 0;
    let allVariable = {
        totalPurchasefuel: 0,
        totalDistributionFuel: 0,

    }
    const a = useContext(context);
    const { getAllPurchaseBill, getAllTransportBill, members, getAllMember, setError, logOutClick, spinner } = a;

    // useState 
    const [purchaseFuel, setPurchaseFuel] = useState([])
    const [provideFuel, setProvideFuel] = useState([])
   
    useEffect(() => {
        if (!localStorage.getItem('Jwt_token') || localStorage.getItem('user_activeStatus') === 'false') {
            if (localStorage.getItem('user_activeStatus') === 'false') {
                setError({ 'error': <span className='text-center'>YOUR ACCESS IS STOPPED BY ADMIN PLEASE RENEWAL YOUR ACCOUNT</span> })
            }
            logOutClick();
            navigate('/login')
        }
        else {
            getAllPurchaseBill().then((data) => setPurchaseFuel(data.result.filter((dataa) => dataa.itemsArray.find((fueldata) => fueldata.item === 'fuel'))))
            getAllTransportBill().then((data) => setProvideFuel(data.result.filter((dataa) => dataa.fuel)))
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
                   
                    <div className='col-lg-11 col-12'>
                        <h5 className='text-center bg-dark text-white mb-0 py-2'>Fuel Entry</h5>
                    </div>
                   
                    <div className="col-lg-1 d-flex gap-3">
                        
                        <ReactToPrint
                            trigger={() => {
                                return <button className="btn btn-dark fw-bold">Print</button>;
                            }}
                            content={() => componentRef.current}
                            documentTitle={`Fuet-Data-Entry-${Date.now()}`}
                            pageStyle='print'

                        />

                    </div>
                </div>
                <hr className='mb-1' />
                <div className='row' ref={componentRef}>
                    <div className='col-6'  >
                        <table className="table table-success table-striped mb-0" >
                            <thead className='sticky-top'>
                                <tr>
                                    <th scope="col">SUPPLIER </th>
                                    <th scope="col">PURCHASE FUEL </th>
                                    <th scope="col">BILL NO.</th>
                                    <th scope="col">DATE</th>
                                </tr>
                            </thead>
                            <tbody>

                                {purchaseFuel.length > 0 && members.length > 0 ?
                                    purchaseFuel.map((data) => {
                                        customerData = members.filter((mdata) => mdata._id === data.supplier_id);
                                        date = new Date(data.date)
                                        return<tr key={data._id}> 
                                            <td className='border-end border-dark'>{customerData[0].name} #{customerData[0].contact}</td>
                                            <td className='border-end border-dark'>
                                                {data.itemsArray.map((data, index) => {
                                                    allVariable.totalPurchasefuel = allVariable.totalPurchasefuel + parseInt(data.netWeight)
                                                    return <h6 key={index}>{data.netWeight} ltr</h6>
                                                })}
                                            </td>
                                            <td className='border-end border-dark'>{data.purchaseBillNumber}</td>
                                            <td className='border-end border-dark'>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} {date.getHours()}:{date.getMinutes()}</td>
                                            </tr>
                                    })
                                    : <tr><td colSpan={4} className='text-center'>Data Will Display Here </td></tr>
                                }
                            </tbody>
                        </table>
                        <h6 className='text-center bg-dark text-white mb-0 py-2'>Total Purchase Fuel: {allVariable.totalPurchasefuel} ltr </h6>
                    </div>

                    <div className='col-6'>
                        <table className="table table-success table-striped mb-0" >
                            <thead className='sticky-top'>
                                <tr>
                                    <th scope="col">TRANSPORT</th>
                                    <th scope="col">DISTRIBUTION FUEL </th>
                                    <th scope="col">BILL NO. </th>
                                    <th scope="col">DATE</th>
                                </tr>
                            </thead>
                            <tbody>

                                {provideFuel.length > 0 && members.length > 0 ?
                                    provideFuel.map((data) => {
                                        customerData = members.filter((mdata) => mdata._id === data.transport_id);
                                        allVariable.totalDistributionFuel = allVariable.totalDistributionFuel + parseInt(data.fuel)
                                        date = new Date(data.date)
                                        return<tr key={data._id}>
                                            <td className='border-end border-dark'>{customerData[0].name} #{customerData[0].contact}</td>
                                            <td className='border-end border-dark'><h6>{data.fuel} ltr</h6></td>
                                            <td className='border-end border-dark'>{data.transportBillNumber} </td>
                                            <td className='border-end border-dark'>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} {date.getHours()}:{date.getMinutes()}</td>
                                        </tr>
                                    })
                                    : <tr><td colSpan={4} className='text-center'>Data Will Display Here </td></tr>
                                }
                            </tbody>
                        </table>
                        <h6 className='text-center bg-dark text-white mb-0 py-2'>Total Provide Fuel: {allVariable.totalDistributionFuel} ltr</h6>
                    </div>
                </div>
            </div> : ''
    )
}

export default FuelEntry

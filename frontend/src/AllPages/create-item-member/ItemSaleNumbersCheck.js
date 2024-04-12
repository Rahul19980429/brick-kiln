import React, { useContext, useEffect, useState } from 'react';
import context from '../../ContextApi/Context'
import { useNavigate } from 'react-router-dom';


const ItemSaleNumbersCheck = () => {
    let SalesNumbers;
    let navigate = useNavigate();
    const a = useContext(context);
    const { getAllItem, getAllSellBill, getAllPurchaseBill, setError, logOutClick } = a;

    const [itemData, setItemData] = useState([])

    const [saleBillData, setSaleBillData] = useState([])
    const [purchaseBillData, setPurchaseBillData] = useState([])

    

    const itemSaleNumbers = (ItemName) => {
        let ItemSalesNumber = {
            TAmount: 0,
            TQuantity: 0
        };
        let ItemArray = [];
        ItemArray = saleBillData.map((data) => data.itemsArray.filter(arr => arr.item === ItemName));
        ItemArray.map((data) => {
            if (data.length > 0) {
                data.map((data) => {
                    ItemSalesNumber.TQuantity = ItemSalesNumber.TQuantity + parseFloat(data.quantity);
                    ItemSalesNumber.TAmount = ItemSalesNumber.TAmount + parseFloat(data.amount)-parseInt(data.other);
                })
            }
        })
        return (ItemSalesNumber)
    }

    const itemPurchaseNumbers = (ItemName) => {
        let ItemSalesNumber = {
            TAmount: 0,
            TQuantity: 0
        };
        let ItemArray = [];
        ItemArray = purchaseBillData.map((data) => data.itemsArray.filter(arr => arr.item === ItemName));
        ItemArray.map((data) => {
            if (data.length > 0) {
                data.map((data) => {
                    ItemSalesNumber.TQuantity = ItemSalesNumber.TQuantity + parseFloat(data.netWeight);
                    ItemSalesNumber.TAmount = ItemSalesNumber.TAmount + parseFloat(data.amount)-parseInt(data.other);
                })
            }
        })
        return (ItemSalesNumber)
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
            getAllItem().then((data) => setItemData(data))
            getAllSellBill().then((data) => setSaleBillData(data.result))
            getAllPurchaseBill().then((data) => setPurchaseBillData(data.result))
        }
    }, [])

    return (
        localStorage.getItem('Jwt_token') && localStorage.getItem('user_activeStatus') === 'true' ?
            <div className='container-fluid'>
                <div className='row mt-3'>
                    {/* text */}
                    <div className='col-lg-13 col-12'>
                        <h5 className='text-center bg-dark text-white mb-0 py-2'>Item's Numbers detail</h5>
                    </div>

                </div>
                <div className='row'>
                    <div className='col-4 py-2'>
                        <h6 className='text-center bg-dark text-white py-2 mb-0'>Item's Sale Detail</h6>
                        <table className="table table-success table-striped mb-0" >
                            <thead className='sticky-top'>
                                <tr>
                                    <th scope="col" className='border-end border-dark'>#</th>
                                    <th scope="col" className='border-end border-dark'>Item Name</th>
                                    <th scope="col" className='border-end border-dark'>Total Quantity Of Item Sale</th>
                                    <th scope="col" className='border-end border-dark'>Total Amount Of Item Sale</th>
                                </tr>
                            </thead>
                            <tbody>

                                {itemData.length > 0 ?
                                    itemData.filter((item) => item.category === 'sale').map((data, index) => {
                                        SalesNumbers = saleBillData ? saleBillData.length > 0 ? itemSaleNumbers(data.itemname) : '' : ''
                                        return (
                                            <tr key={data._id}  >
                                                <td className='border-end border-dark'>{index + 1}</td>
                                                <td className='border-end border-dark'>{data.itemname}</td>
                                                <td className='border-end border-dark'>{SalesNumbers.TQuantity}</td>
                                                <td className='border-end border-dark'>{SalesNumbers.TAmount}</td>
                                            </tr>
                                        )

                                    })

                                    : <tr><td colSpan={4} className='text-center'>Data Will Display Here </td></tr>}
                            </tbody>
                        </table>
                    </div>

                    <div className='col-4 py-2'>
                        <h6 className='text-center bg-dark text-white py-2 mb-0'>Item's Purchase Detail</h6>
                        <table className="table table-success table-striped mb-0" >
                            <thead className='sticky-top'>
                                <tr>
                                    <th scope="col" className='border-end border-dark'>#</th>
                                    <th scope="col" className='border-end border-dark'>Item Name</th>
                                    <th scope="col" className='border-end border-dark'>Total Quantity Of Item Purchase</th>
                                    <th scope="col" className='border-end border-dark'>Total Amount Of Item Purchase</th>
                                </tr>
                            </thead>
                            <tbody>

                                {itemData.length > 0 ?
                                    itemData.filter((item) => item.category === 'good').map((data, index) => {
                                        SalesNumbers = purchaseBillData ? purchaseBillData.length > 0 ? itemPurchaseNumbers(data.itemname) : '' : ''
                                        return (
                                            <tr key={data._id}  >
                                                <td className='border-end border-dark'>{index + 1}</td>
                                                <td className='border-end border-dark'>{data.itemname}</td>
                                                <td className='border-end border-dark'>{SalesNumbers.TQuantity}</td>
                                                <td className='border-end border-dark'>{SalesNumbers.TAmount}</td>
                                            </tr>
                                        )

                                    })

                                    : <tr><td colSpan={4} className='text-center'>Data Will Display Here </td></tr>}
                            </tbody>
                        </table>
                    </div>

                    <div className='col-4 py-2'>
                        <h6 className='text-center bg-dark text-white py-2 mb-0'>Item's Labor Production Detail</h6>
                        <table className="table table-success table-striped mb-0" >
                            <thead className='sticky-top'>
                                <tr>
                                    <th scope="col" className='border-end border-dark'>#</th>
                                    <th scope="col" className='border-end border-dark'>Item Name</th>
                                    <th scope="col" className='border-end border-dark'>Total Quantity Of Item Sale</th>
                                    <th scope="col" className='border-end border-dark'>Total Amount Of Item Sale</th>
                                </tr>
                            </thead>
                            <tbody>

                                {itemData.length > 0 ?
                                    itemData.filter((item) => item.category === 'sale').map((data, index) => {
                                        SalesNumbers = false ? itemSaleNumbers(data.itemname) : '' 
                                        return (
                                            <tr key={data._id}  >
                                                <td className='border-end border-dark'>{index + 1}</td>
                                                <td className='border-end border-dark'>{data.itemname}</td>
                                                <td className='border-end border-dark'>{SalesNumbers.TQuantity}</td>
                                                <td className='border-end border-dark'>{SalesNumbers.TAmount}</td>
                                            </tr>
                                        )

                                    })

                                    : <tr><td colSpan={4} className='text-center'>Data Will Display Here </td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div> : ''
    )
}

export default ItemSaleNumbersCheck

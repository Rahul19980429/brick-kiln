import React, { useContext, useEffect } from 'react';
import context from '../../ContextApi/Context'
import { useNavigate } from 'react-router-dom';


const ItemSaleNumbersCheck = () => {
    let SalesNumbers;
    let navigate = useNavigate();
    const a = useContext(context);
    const { items, getAllItem, sellBill, getAllSellBill, setError, logOutClick } = a;


    const itemSaleNumbers = (ItemName) => {
        let ItemSalesNumber = {
            TAmount: 0,
            TQuantity: 0
        };
        let ItemArray = [];

        ItemArray = sellBill.sellBillData.map((data) => data.itemsArray.filter(arr => arr.item === ItemName));
        ItemArray.map((data) => {
            if (data.length > 0) {
                data.map((data) => {
                    ItemSalesNumber.TQuantity = ItemSalesNumber.TQuantity + parseFloat(data.quentity);
                    ItemSalesNumber.TAmount = ItemSalesNumber.TAmount + parseFloat(data.amount);
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
            getAllItem()
            getAllSellBill()
        }
    }, [])

    return (
        localStorage.getItem('Jwt_token') && localStorage.getItem('user_activeStatus') === 'true' ?
            <div className='container-fluid'>
                <div className='row'>
                <h5 className='text-center py-2 bg-dark text-white mb-0'>Item Sale Numbers Check</h5>
                </div>
                <table className="table table-success table-striped mb-0 mt-2" >
                    <thead className='sticky-top'>
                        <tr>
                            <th scope="col" className='border-end border-dark'>#</th>
                            <th scope="col" className='border-end border-dark'>Iem Name</th>
                            <th scope="col" className='border-end border-dark'>Total Quentity Of Item Sale</th>
                            <th scope="col" className='border-end border-dark'>Total Amount Of Item Sale</th>
                        </tr>
                    </thead>
                    <tbody>

                        {items.length > 0 ?
                            items.map((data, index) => {
                                SalesNumbers = sellBill ? sellBill.sellBillData.length > 0 ? itemSaleNumbers(data.itemname) : '' : ''
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
            </div> : ''
    )
}

export default ItemSaleNumbersCheck

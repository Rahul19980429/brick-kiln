import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';


const BillPrint = (props) => {

    const componentRef = useRef()
    const { nameData, bno, bdate, billitems, recData, payData, finalAmount, discountData } = props;

    const setDateFormat = (intdate) => {
        let date = new Date(intdate)
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    }

    return (
        <>

            {/* <!-- Modal --> */}

            <div className="modal fade" id="staticBackdrop7" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

                <div className="modal-dialog">
                    <div ref={componentRef} className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Bill Print</h1>
                            <ReactToPrint
                                trigger={() => {
                                    return <button className='btn btn-primary ms-5'>Print out!</button>;
                                }}
                                content={() => componentRef.current}
                                documentTitle={`Sale-Bill-${Date.now()}`}
                                pageStyle='print'

                            />
                            <button type="button" className="btn-close" id="NameModalClose" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'scroll' }}>
                            <div className='row'>
                                <p className='text-capitalize mb-2'>Name: {nameData.name}</p>
                                <div className='col-12'>
                                    <div className='row'>
                                        <div className='col-8'>
                                            <p className='mb-1'>Contact: {nameData.contact}</p>
                                            <p className='mb-1'>Address: {nameData.address}</p>
                                        </div>
                                        <div className='col-4'>
                                            <p className='mb-1'>Bill No:{bno}</p>
                                            <p className='mb-1'>Date:{setDateFormat(bdate)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className='my-1' />
                            <div className=' p-0 table-responsive' >
                                <table className="table table-success table-striped mb-0" >
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Item</th>
                                            <th scope="col">Qty/Wt</th>
                                            <th scope="col">Rate</th>
                                            <th scope="col">VNo.</th>
                                            <th scope="col">RefNo.</th>
                                            <th scope="col">Other</th>
                                            <th scope="col">Amount</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {billitems.length > 0 ?
                                            //get all customers from billitems
                                            billitems.map((data, index) => {
                                                return <tr key={index}  >
                                                    <td>{index + 1}</td>
                                                    <td><small>{data.item}</small></td>
                                                    <td>{data.quantity}</td>
                                                    <td>{data.rate}</td>
                                                    <td>{data.vehicleNo}</td>
                                                    <td>{data.refNo}</td>
                                                    <td>{data.other}</td>
                                                    <td>{data.amount}</td>


                                                </tr>
                                            }) : null}
                                    </tbody>

                                    <tfoot>
                                        <tr className='table-dark text-start'>
                                            <th scope="col" colSpan={4}>T.Item: {billitems.length}</th>

                                            <th scope="col" colSpan={4}>T.Amount: {finalAmount}</th>

                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <table className="table table-success table-striped mb-2">
                                <tbody>
                                    <tr className='table-light text-start'>
                                        <th scope="col" >Last Balance</th>
                                        <th scope="col" colSpan={2}>{nameData.balance}</th>
                                    </tr>

                                    <tr className='table-light text-start'>
                                        <th scope="col" >Final Amount</th>
                                        <th scope="col" colSpan={2}>{parseInt(finalAmount ? finalAmount : 0) + parseInt(nameData.balance ? nameData.balance : 0)}</th>
                                    </tr>

                                    {recData.recAmount.length > 0 ? recData.recAmount.map((recData,index) => {
                                        return <tr className='table-light text-start' key={index}>
                                            <th scope="col">Receive</th>
                                            <th scope="col">{recData.amount}</th> 
                                            <th scope="col">{recData.mode}</th> 
                                             </tr>
                                    }) :<tr className='table-light text-start'>
                                            <th scope="col">Receive</th>
                                            <th scope="col" colSpan={2}>{0}</th>
                                         </tr>

                                    }
                                    

                                    {payData.payAmount.length > 0 ? payData.payAmount.map((payData,index) => {
                                        return <tr className='table-light text-start' key={index}>
                                            <th scope="col">pay</th>
                                            <th scope="col">{payData.amount}</th> 
                                            <th scope="col">{payData.mode}</th>  
                                            </tr>
                                    }) :<tr className='table-light text-start'>
                                            <th scope="col">pay</th>
                                            <th scope="col" colSpan={2}>{0}</th> 
                                         </tr>

                                    }
                                    <tr className='table-light text-start'>
                                        <th scope="col">Discount</th>
                                        <th scope="col" colSpan={2}>{discountData.discount.amount}</th>
                                    </tr>


                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <table className="table table-success table-striped mb-2">
                                <tbody>
                                    <tr className='table-light text-start'>
                                        <th scope="col">Current Balance</th>
                                        <th scope="col">{
                                            parseInt(finalAmount)
                                            + parseInt(nameData.balance ? nameData.balance : 0)
                                            + parseInt(payData.payAmountVariable ? payData.payAmountVariable : 0)
                                            - parseInt(recData.recAmountVariable ? recData.recAmountVariable : 0)
                                            - parseInt(discountData.discount.amount ? discountData.discount.amount : 0)
                                        }
                                        </th>

                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BillPrint
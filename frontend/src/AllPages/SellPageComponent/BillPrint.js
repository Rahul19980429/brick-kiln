import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';


const BillPrint = (props) => {

    const componentRef = useRef()
    const { nameData, bno, bdate, billitems, recData, payData, bhav, fine, finalAmount } = props;

    const setDateFormat = (intdate) => {
        let date = new Date(intdate)
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    }

    return (
        <>

            {/* <!-- Modal --> */}

            <div className="modal fade" id="staticBackdrop10" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

                <div className="modal-dialog">
                    <div ref={componentRef} className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Bill Print</h1>
                            <ReactToPrint
                                trigger={() => {
                                    return <button className='btn btn-primary ms-5'>Print out!</button>;
                                }}
                                content={() => componentRef.current}
                                documentTitle='new document'
                                pageStyle='print'

                            />
                            <button type="button" className="btn-close" id="NameModalClose" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: '70vh' , overflowY: 'scroll' }}>
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
                                        <th scope="col">Wt</th>
                                        <th scope="col">Tnch</th>
                                        <th scope="col">Rate</th>
                                        <th scope="col">Lbr</th>
                                        <th scope="col">Fine</th>
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
                                                <td>{data.weight}</td>
                                                <td>{data.tnch}</td>
                                                <td>{data.rate}</td>
                                                <td>{parseInt(data.labour) + parseInt(data.other)}</td>
                                                <td>{data.fine}</td>
                                                <td>{data.amount}</td>


                                            </tr>
                                        }) : null}
                                </tbody>

                                <tfoot>
                                    <tr className='table-dark text-start'>
                                        <th scope="col" colSpan={2}>T.Item: {billitems.length}</th>
                                        <th scope="col" colSpan={2}>G.Fine: {fine.goldFine}</th>
                                        <th scope="col" colSpan={2}>S.Fine: {fine.silverFine}</th>
                                        <th scope="col" colSpan={2}>T.Amount: {finalAmount}</th>

                                    </tr>
                                </tfoot>
                            </table>
                            </div>
                            <table className="table table-success table-striped mb-2">
                                <thead >
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Gold</th>
                                        <th scope="col">Silver</th>
                                        <th scope="col">Amount</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='table-light text-start'>
                                        <th scope="col">Receive</th>
                                        <th scope="col">{parseFloat(recData.recMetal.gold) * parseFloat(recData.recMetal.gtnch / 100).toFixed(3)}</th>
                                        <th scope="col">{parseFloat(recData.recMetal.silver) * parseFloat(recData.recMetal.stnch / 100).toFixed(3)}</th>
                                        <th scope="col">{recData.recAmount.amount}</th>

                                    </tr>
                                    <tr className='table-light text-start'>
                                        <th scope="col">Payment</th>
                                        <th scope="col">{parseFloat(payData.payMetal.gold) * parseFloat(payData.payMetal.gtnch / 100).toFixed(3)}</th>
                                        <th scope="col">{parseFloat(payData.payMetal.silver) * parseFloat(payData.payMetal.stnch / 100).toFixed(3)}</th>
                                        <th scope="col">{payData.payAmount.amount}</th>

                                    </tr>
                                    <tr className='table-light text-start'>
                                        <th scope="col">Gold Bhav</th>
                                        <th scope="col" colSpan={2}>({parseFloat(fine.goldFine - parseFloat(recData.recMetal.gold) * parseFloat(recData.recMetal.gtnch / 100).toFixed(3)).toFixed(3)} *{parseFloat(bhav.goldMetalBhav / 10)})</th>
                                        <th scope="col"> {Math.floor((parseFloat(fine.goldFine) - parseFloat(recData.recMetal.gold) * parseFloat(recData.recMetal.gtnch / 100).toFixed(3)).toFixed(3) * parseFloat(bhav.goldMetalBhav / 10))}</th>

                                    </tr>
                                    <tr className='table-light text-start'>
                                        <th scope="col">Silver Bhav</th>
                                        <th scope="col" colSpan={2}>({parseFloat(fine.silverFine - parseFloat(recData.recMetal.silver) * parseFloat(recData.recMetal.stnch / 100).toFixed(3)).toFixed(3)} *{parseFloat(bhav.silverMetalBhav / 10)})</th>
                                        <th scope="col">{Math.floor((parseFloat(fine.silverFine) - parseFloat(recData.recMetal.silver) * parseFloat(recData.recMetal.stnch / 100).toFixed(3)).toFixed(3) * parseFloat(bhav.silverMetalBhav / 10))}</th>

                                    </tr>

                                    <tr className='table-light text-start'>
                                        <th scope="col" colSpan={3}>Last Balance</th>
                                        <th scope="col">{nameData.balance}</th>

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
                                            Math.floor(parseFloat(finalAmount)
                                                + parseFloat(payData.payAmount.amount ? payData.payAmount.amount : 0)
                                                + parseFloat(parseFloat((parseFloat(fine.silverFine) - parseFloat(recData.recMetal.silver) * parseFloat(recData.recMetal.stnch / 100).toFixed(3)).toFixed(3) * parseFloat(bhav.silverMetalBhav / 10)).toFixed(3))
                                                + parseFloat(parseFloat((parseFloat(fine.goldFine) - parseFloat(recData.recMetal.gold) * parseFloat(recData.recMetal.gtnch / 100).toFixed(3)).toFixed(3) * parseFloat(bhav.goldMetalBhav / 10)).toFixed(3))
                                                + parseFloat(nameData.balance ? nameData.balance : 0)
                                                - parseFloat(recData.recAmount.amount ? recData.recAmount.amount : 0)
                                            )}
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
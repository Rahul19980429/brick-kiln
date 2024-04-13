import React, { useContext, useEffect, useState } from 'react';
import context from '../../ContextApi/Context'
import CustomerItems from './CustomerItems';
import ReceiptCashpage from '../../Components/Receiptpage';
import PaymentCashpage from '../../Components/Paymentpage';
import CustomerNameList from '../../Components/CustomerNameList';
import ItemNameList from '../../Components/ItemNameList';
import { useNavigate } from 'react-router-dom';
import BillPrint from './BillPrint';
import Discountpage from '../../Components/Discount';
import { Link } from "react-router-dom"
const LaborPage = ({ btnColor }) => {

  let navigate = useNavigate();
  const [lastBill, setLastBill] = useState('')
  const [billId, setBillId] = useState('')

  let customeKaBalanveAfterCalculation = 0;

  let finalTotalAmount = 0;

  //useState for date
  const [date, setDate] = useState(new Date())

  // useState for bill number Input
  const [inputBillNumber, setInputBillNumber] = useState('')

  // input field k liye useState initallize
  const [itemInput, setItemInput] = useState({ Quantity: '', Rate: '', Other: '' })

  let fullYear = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  // context d-Structuring
  const a = useContext(context);
  const { recAmount, setRecAmount, payAmount, setPayAmount, discount, setDiscount, getAllLaborBill,
    customerItems, setCustomerItems, selectedCustomer, setSelectedCustomer, sellBill,
    setSellBill, ADDNewPurchaseBill, members, billNumberForNextBtn, setItemName, setFinalAmount,
    DeletePurchaseBill, setError, logOutClick, finalAmount, spinner } = a;

  //  save btn click function
  const billSaveBtn = () => {
    if ((selectedCustomer.name || selectedCustomer.address || selectedCustomer.contact) === '') {
      return alert("Customer Name And Customer Detail Field Can't be empty")
    }

    else {
      // console.log(selectedCustomer._id, sellBill.SellBillNumber, customerItems, recAmount, payAmount,recMetal,payMetal,goldMetalBhav,silverMetalBhav,selectedCustomer.balance, balance)
      ADDNewPurchaseBill(selectedCustomer._id, sellBill.SellBillNumber, customerItems, recAmount, payAmount, discount, selectedCustomer.balance, customeKaBalanveAfterCalculation);
      clearAll();
    }
  }

  // cancel btn click function 
  const clearAll = () => {
    setSelectedCustomer({ _id: '', name: '', address: '', contact: '', balance: '' })
    setItemInput({ NetWeight: '', Rate: '', BillNo: '', Other: '' })
    setRecAmount(0)
    setPayAmount(0)
    setDiscount(0)
    setCustomerItems([])
    setItemName('')
    setFinalAmount(0)
    setLastBill('')
    setBillId('')
  }

  // previous btn click function
  const previousBtnClick = () => {
    clearAll()
    let number = sellBill.SellBillNumber - 1;
    if (number >= 1) {
      if (number === 1) {
        document.getElementById('preBtn').disabled = true;
      }
      setSellBill({ ...sellBill, SellBillNumber: number })
      let result = sellBill.sellBillData.filter((data) => data.purchaseBillNumber === number);
      if (result.length > 0) {
        let customerData = members.filter((cdata) => cdata._id === result[0].supplier_id)
        setDate(new Date(result[0].date))
        setBillId(result[0]._id)
        setSelectedCustomer({ _id: result[0].supplier_id, name: customerData[0].name, address: customerData[0].address, contact: customerData[0].contact, balance: result[0].supplierLastBalance, category: customerData[0].category })
        setRecAmount(result[0].receiptInfo)
        setPayAmount(result[0].paymentInfo)
        setDiscount(result[0].discountInfo)
        setCustomerItems(result[0].itemsArray)
        setLastBill(result[0].lastPurchaseBillNumber)
        result[0].itemsArray.map((data) => {
          return (
            setFinalAmount(finalTotalAmount = parseFloat(finalTotalAmount) + (parseFloat(data.amount)))
          )
        })
      }
      else {
        setDate(new Date())
        clearAll()
      }
    }

  }

  // next btn click function
  const nextBtnClick = () => {
    clearAll()
    let number = sellBill.SellBillNumber + 1;
    if (number < billNumberForNextBtn) {
      setSellBill({ ...sellBill, SellBillNumber: number })
      let result = sellBill.sellBillData.filter((data) => data.purchaseBillNumber === number);
      if (result.length > 0) {
        let customerData = members.filter((cdata) => cdata._id === result[0].supplier_id)
        setDate(new Date(result[0].date))
        setBillId(result[0]._id)
        setSelectedCustomer({ _id: result[0].supplier_id, name: customerData[0].name, address: customerData[0].address, contact: customerData[0].contact, balance: result[0].supplierLastBalance, category: customerData[0].category })
        setRecAmount(result[0].receiptInfo)
        setPayAmount(result[0].paymentInfo)
        setDiscount(result[0].discountInfo)
        setCustomerItems(result[0].itemsArray)
        setLastBill(result[0].lastPurchaseBillNumber)
        result[0].itemsArray.map((data) => {
          return (
            setFinalAmount(finalTotalAmount = parseFloat(finalTotalAmount) + (parseFloat(data.amount)))
          )
        })
      }
      else {
        setDate(new Date())
        clearAll()
      }
      document.getElementById('preBtn').disabled = false;
    }
    else {
      document.getElementById('nextBtn').disabled = true;
    }


  }


  // new button click function
  const NewbtnClick = () => {
    clearAll();
    setSellBill({ ...sellBill, SellBillNumber: billNumberForNextBtn })
    setDate(new Date())
    document.getElementById('preBtn').disabled = false;
  }


  // bill number input change
  const enterBillNumberSearch = (e) => {
    if (isNaN(e.target.value) || e.target.value.length < 1) {
      e.target.value = '';
      NewbtnClick()
    }
    setInputBillNumber(e.target.value)
    let number = parseInt(e.target.value);
    if (number >= 1) {
      if (number === 1) {
        document.getElementById('preBtn').disabled = true;
      }

      let result = sellBill.sellBillData.filter((data) => data.purchaseBillNumber === number);
      if (result.length > 0) {
        clearAll()
        setSellBill({ ...sellBill, SellBillNumber: number })
        let customerData = members.filter((cdata) => cdata._id === result[0].supplier_id)
        setDate(new Date(result[0].date))
        setBillId(result[0]._id)
        setSelectedCustomer({ _id: result[0].supplier_id, name: customerData[0].name, address: customerData[0].address, contact: customerData[0].contact, balance: result[0].supplierLastBalance, category: customerData[0].category })
        setRecAmount(result[0].receiptInfo)
        setPayAmount(result[0].paymentInfo)
        setDiscount(result[0].discountInfo)
        setCustomerItems(result[0].itemsArray)
        setLastBill(result[0].lastPurchaseBillNumber)
        result[0].itemsArray.map((data) => {
          return (
            setFinalAmount(finalTotalAmount = parseFloat(finalTotalAmount) + (parseFloat(data.amount)))
          )
        })
      }
      else {
        setDate(new Date())
        clearAll()
        setSellBill({ ...sellBill, SellBillNumber: parseInt(sellBill.sellBillData[sellBill.sellBillData.length - 1].purchaseBillNumber) + 1 })
      }
    }
  }

  const DeleteBill = (billId) => {
    let bool = window.confirm("Are You Sure?")
    if (bool) {
      DeletePurchaseBill(billId);
      clearAll();
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
      // api call function get all customer
      getAllLaborBill().then((data)=>console.log(data))

      //clear page first
      clearAll()
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
      <div className='container'>
        {/* part first bill search row */}
        <div className='row my-1'>
          <div className='col-lg-4 col-12'>
            <h5 className='text-center py-2 bg-dark text-white'>Labor Production Bill</h5>
          </div>
          <div className='col-lg-5 col-12 text-center py-1'>
            <Link to="/member" className={`btn btn-${btnColor} btn-sm mx-1`}>Create New Member</Link>
            <Link to="/item" className={`btn btn-${btnColor} btn-sm mx-1`}>Create New Item</Link>
          </div>
          <div className='col-lg-3 col-12'>
            <div className="input-group input-group-sm mb-2 border border-white rounded-1">
              <button className={`btn btn-${btnColor}`}> <span className={`py-0 input-group-text  border-0 rounded-0 bg-${btnColor} text-white rounded-start`} id="basic-addon1">Bill No.</span></button>
              <input value={inputBillNumber} onChange={enterBillNumberSearch} autoComplete='off' type="text" className="form-control " id="billNumber" name="billNumber" placeholder='Enter Bill Number' />
            </div>
          </div>
        </div>
        {/* part second customer detail row */}
        <div className='row '>
          <div className='d-flex d-lg-none'>
            <h5 className='p-2'> Bill : <span className='border border rounded-2 py-1 px-3'>{sellBill.SellBillNumber ? sellBill.SellBillNumber : 1}</span></h5>
            <h5 className='ms-auto p-2 my-0' > Date: <span className='border border rounded-2 py-1 px-3'>{day > 9 ? day : '0' + day}/{month > 9 ? month : '0' + month}/{fullYear}</span> </h5>
          </div>
          <hr className='d-lg-none' />
          <div className='col-lg-6'>
            <div className="row g-3">
              <div className='d-flex '>
                <div className='col-3'><h6 className='pt-2'>Labor Name:</h6></div>
                <div className='col-9'>
                  <div className='d-flex'>
                    <button type="button" className={`btn btn-${btnColor} btn-sm mx-1`} id="HiddenBtnCustomer" data-bs-toggle="modal" data-bs-target="#staticBackdrop3">
                      Labor
                    </button>
                    <input type="text" value={selectedCustomer.name} placeholder='Labor Name' className='form-control' name="supplierName" autoComplete='off' readOnly />
                  </div>
                </div>
              </div>
              <div className='col-12 mt-0 mt-lg-2'>
                {/* customer address and contact show */}
                <div className='d-flex '>
                  <div className='col-3'>
                    <h6 className='pt-2'>Supplier Detail:</h6>
                  </div>
                  <div className='col-9'>
                    <input type="text" readOnly value={selectedCustomer.address && selectedCustomer.contact && selectedCustomer.category ?
                      selectedCustomer.address + " #" + selectedCustomer.contact + " #" + selectedCustomer.category : ''} className='form-control' name="customerName" autoComplete='off' placeholder='Supplier Detail' />
                  </div>
                </div>
              </div>

            </div>

          </div>
          <div className='col-3 d-lg-block d-none'>
            {/* here get bill numver update and customer's last balance  */}
            <h5 className='p-2'> Bill :<span className='border border rounded-2 py-1 px-3'>{sellBill.SellBillNumber}</span></h5>
            <h5 className='p-2'> Date: <span className='border border rounded-2 py-1 px-3'>{(day > 9 ? day : '0' + day)}/{month > 9 ? month : '0' + month}/{fullYear}</span> </h5>
          </div>
          <div className='col-3 d-lg-block d-none'>
            <h6>Last Bill No:{lastBill ? lastBill : 'XXXX'}</h6>
            <h6>Last Balance: {selectedCustomer.balance ? selectedCustomer.balance : 0}</h6>
          </div>

        </div>

        {/* part three show customer's add items data and list component */}
        <CustomerItems btnColor={btnColor} initalvalues={{ itemInput, setItemInput }} />
        {/* part forth rec,pay,discount and other functionality (all buttons) */}

        <div className='row mt-2'>
          <div className='col-lg-5'>
            <div className='d-flex' style={{ flexWrap: 'wrap' }}>
              <ReceiptCashpage btnColor={btnColor} />
              <PaymentCashpage btnColor={btnColor} />
              <Discountpage btnColor={btnColor} />
            </div>
            <hr className='mt-2 mb-1' />
            <div className='d-flex' style={{ flexWrap: 'wrap' }}>
              <button className={`col me-2 btn btn-${btnColor}  mt-2`} onClick={() => clearAll()}>Cancel</button>
              <button className={`col me-2 btn btn-${btnColor}  mt-2`} id="preBtn" disabled={sellBill.SellBillNumber === 1 ? true : false} onClick={() => previousBtnClick()}>Prev </button>
              <button className={`col me-2 btn btn-${btnColor}  mt-2`} disabled={billNumberForNextBtn < sellBill.SellBillNumber + 2 ? true : false} onClick={() => nextBtnClick()}>Next</button>
              <button className={`col me-2 btn btn-${btnColor}  mt-2`} onClick={() => NewbtnClick()}>New</button>
              <button className={`col me-2 btn btn-${btnColor}  mt-2`} disabled={billId ? false : true} onClick={() => DeleteBill(billId)}>Delete</button>
              <button className={`col me-2 btn btn-${btnColor}  mt-2`} disabled={billId ? false : true} id="HiddenBtnPrint" data-bs-toggle="modal" data-bs-target="#staticBackdrop7">Print</button>
              <button className={`col me-2 btn btn-${btnColor}  mt-2`} onClick={billSaveBtn} disabled='true'>Save</button>
            </div>
            <hr className='d-lg-none' />
          </div>

          {/* billing table part */}
          <div className='col-lg-7'>
            <div className='row border rounded-2'>
              <div className='col-lg-12'>
                <table className="table mb-0">
                  <tbody>
                    <tr>
                      <th scope="row">Final Amount : {- parseInt(finalAmount)
                        + (parseInt(selectedCustomer.balance ? selectedCustomer.balance : 0))} </th>
                      <th>T.Amount:({finalAmount ? -finalAmount : 0}) + Last Balance:({selectedCustomer.balance ? selectedCustomer.balance : 0}) </th>
                      <td></td>

                    </tr>

                    <tr>
                      <th scope="row">Pay Amount: {payAmount.amount ? payAmount.amount : 0}</th>

                      <td>{payAmount.naration ? payAmount.naration : 'Naration'}</td>
                      <td className='p-0 pt-1'>{parseInt(payAmount.amount ? payAmount.amount : 0) !== 0 ?
                        <button className="btn btn-danger btn-sm py-0 px-1" onClick={() => setPayAmount({ amount: 0, mode: 'cash', naration: 'naration' })}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-octagon-fill pb-1" viewBox="0 0 16 16">
                          <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                        </svg></button>
                        : ''
                      }</td>
                    </tr>
                    <tr>
                      <th scope="row">Receive Amount: {recAmount.amount ? recAmount.amount : 0}</th>

                      <td>{recAmount.naration ? recAmount.naration : 'Naration'}</td>
                      <td className='p-0 pt-1'> {parseInt(recAmount.amount ? recAmount.amount : 0) !== 0 ?
                        <button className="btn btn-danger btn-sm py-0 px-1" onClick={() => setRecAmount({ amount: 0, mode: 'cash', naration: 'naration' })}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-octagon-fill pb-1" viewBox="0 0 16 16">
                          <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                        </svg></button>
                        : ''
                      }</td>
                    </tr>

                    <tr>
                      <th scope="row">Discount: {discount.amount ? discount.amount : 0}</th>
                      <td>{discount.naration ? discount.naration : 'Naration'}</td>
                      <td className='p-0 pt-1'>{parseInt(discount.amount ? discount.amount : 0) !== 0 ?
                        <button className="btn btn-danger btn-sm py-0 px-1" onClick={() => setDiscount({ amount: 0, naration: 'naration' })}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-octagon-fill pb-1" viewBox="0 0 16 16">
                          <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                        </svg></button>
                        : ''
                      }</td>
                    </tr>

                  </tbody>
                </table>
              </div>

            </div>
            <div className='row'>
              <table className="table table-btnColor table-striped mb-2">
                <tfoot>
                  <tr className='table-dark text-start'>
                    <th scope="col" >Left Balance: 
                       { customeKaBalanveAfterCalculation = - parseInt(finalAmount)
                        + parseInt(selectedCustomer.balance ? selectedCustomer.balance : 0)
                          - parseInt(recAmount.amount ? recAmount.amount : 0)
                          + parseInt(payAmount.amount ? payAmount.amount : 0)
                          + parseInt(discount.amount ? discount.amount : 0)}</th>


                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        <div className='row'>
          <CustomerNameList memberType="labor" />
          <ItemNameList initalvalues={{ itemInput, setItemInput }} itemType="sale" />
          <BillPrint nameData={selectedCustomer} bdate={date}
            bno={sellBill.SellBillNumber ? sellBill.SellBillNumber : null}
            billitems={customerItems} recData={{ recAmount}}
            payData={{ payAmount}}
            discountData={{discount}}
            finalAmount={finalAmount}
          />
        </div>
      </div> : ''
  )
}

export default LaborPage
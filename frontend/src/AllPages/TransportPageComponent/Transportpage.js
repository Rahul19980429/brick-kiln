import React, { useContext, useEffect, useState } from 'react';
import context from '../../ContextApi/Context'
import SalaryData from './Salary/DriverSalaryEntry';
import TransportData from './Transportation/TransportItems';
import ReceiptCashpage from '../../Components/Receiptpage';
import PaymentCashpage from '../../Components/Paymentpage';
import CustomerNameList from '../../Components/CustomerNameList';
import ItemNameList from '../../Components/ItemNameList';
import { useNavigate } from 'react-router-dom';
import BillPrint from './BillPrint';
import Discountpage from '../../Components/Discount';
import { Link } from "react-router-dom"
import FuelAddToTransport from './FuelAddToTransport';
const TransportPage = ({ btnColor }) => {

  let navigate = useNavigate();
  const [lastBill, setLastBill] = useState('')
  const [billId, setBillId] = useState('')
  const [transportFuel, setTransportFuel] = useState(0)

  let payAmountVariable = 0;
  let recAmountVariable = 0;
  let customeKaBalanveAfterCalculation = 0;

  let finalTotalAmount = 0;

  //useState for date
  const [date, setDate] = useState(new Date())

  //useState for date
  const [mode, setMode] = useState('Transport')

  // useState for bill number Input
  const [inputBillNumber, setInputBillNumber] = useState('')

  // input field k liye useState initallize
  const [itemInput, setItemInput] = useState({ Quantity: '', Rate: '',RefNo:'', Other: '',Amount:0 })
  const [salaryInput, setSalaryInput] = useState({ From:'',To:'', Chuti:0 , MonthSalary:0, NumberOfDays:0, Other:0 ,Amount:0 })

  let fullYear = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  // context d-Structuring
  const a = useContext(context);
  const { recAmount, setRecAmount, payAmount, setPayAmount, discount, setDiscount, getAllTransportBill,
    customerItems, setCustomerItems, selectedCustomer, setSelectedCustomer, sellBill,
    setSellBill, ADDNewTransportBill, members, billNumberForNextBtn, setItemName, setFinalAmount,
    DeleteTransportBill, setError, logOutClick, finalAmount, spinner } = a;

  //  save btn click function
  const billSaveBtn = () => {
    if ((selectedCustomer.name || selectedCustomer.address || selectedCustomer.contact) === '') {
      return alert("Customer Name And Customer Detail Field Can't be empty")
    }

    else {
     
      ADDNewTransportBill(selectedCustomer._id, sellBill.SellBillNumber, customerItems, recAmount, payAmount, discount,transportFuel, selectedCustomer.balance, customeKaBalanveAfterCalculation);
      clearAll();
    }
  }

  // cancel btn click function 
  const clearAll = () => {
    setSelectedCustomer({ _id: '', name: '', address: '', contact: '', balance: '' })
    setSalaryInput({ From:'',To:'',Chuti:0,MonthSalary:0, NumberOfDays:0, Other:0,Amount:0 })
    setItemInput({ Quantity: '', Rate: '',RefNo:'', Other: '',Amount:0 })
    setRecAmount([])
    setPayAmount([])
    setDiscount(0)
    setCustomerItems([])
    setItemName('')
    setFinalAmount(0)
    setLastBill('')
    setBillId('')
    setTransportFuel(0)
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
      let result = sellBill.sellBillData.filter((data) => data.transportBillNumber === number);
      if (result.length > 0) {
        let customerData = members.filter((cdata) => cdata._id === result[0].transport_id)
        setDate(new Date(result[0].date))
        setBillId(result[0]._id)
        setSelectedCustomer({ _id: result[0].transport_id, name: customerData[0].name, address: customerData[0].address, contact: customerData[0].contact, balance: result[0].transportLastBalance, category: customerData[0].category })
        setRecAmount(result[0].receiptInfo)
        setPayAmount(result[0].paymentInfo)
        setDiscount(result[0].discountInfo)
        setTransportFuel(result[0].fuel)
        setCustomerItems(result[0].itemsArray)
        setLastBill(result[0].lastTransportBillNumber)
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
      let result = sellBill.sellBillData.filter((data) => data.transportBillNumber === number);
      if (result.length > 0) {
        let customerData = members.filter((cdata) => cdata._id === result[0].transport_id)
        setDate(new Date(result[0].date))
        setBillId(result[0]._id)
        setSelectedCustomer({ _id: result[0].transport_id, name: customerData[0].name, address: customerData[0].address, contact: customerData[0].contact, balance: result[0].transportLastBalance, category: customerData[0].category })
        setRecAmount(result[0].receiptInfo)
        setPayAmount(result[0].paymentInfo)
        setDiscount(result[0].discountInfo)
        setTransportFuel(result[0].fuel)
        setCustomerItems(result[0].itemsArray)
        setLastBill(result[0].lastTransportBillNumber)
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

      let result = sellBill.sellBillData.filter((data) => data.transportBillNumber === number);
      if (result.length > 0) {
        clearAll()
        setSellBill({ ...sellBill, SellBillNumber: number })
        let customerData = members.filter((cdata) => cdata._id === result[0].transport_id)
        setDate(new Date(result[0].date))
        setBillId(result[0]._id)
        setSelectedCustomer({ _id: result[0].transport_id, name: customerData[0].name, address: customerData[0].address, contact: customerData[0].contact, balance: result[0].transportLastBalance, category: customerData[0].category })
        setRecAmount(result[0].receiptInfo)
        setPayAmount(result[0].paymentInfo)
        setDiscount(result[0].discountInfo)
        setTransportFuel(result[0].fuel)
        setCustomerItems(result[0].itemsArray)
        setLastBill(result[0].lastTransportBillNumber)
        result[0].itemsArray.map((data) => {
          return (
            setFinalAmount(finalTotalAmount = parseFloat(finalTotalAmount) + (parseFloat(data.amount)))
          )
        })
      }
      else {
        setDate(new Date())
        clearAll()
        setSellBill({ ...sellBill, SellBillNumber: parseInt(sellBill.sellBillData[sellBill.sellBillData.length - 1].transportBillNumber) + 1 })
      }
    }
  }

  const DeleteBill = (billId) => {
    let bool = window.confirm("Are You Sure?")
    if (bool) {
      DeleteTransportBill(billId);
      clearAll();
    }
  }
  const removeAmountEntry = (amountData, From) => {
    if (From === "recAmount") {
      let result = recAmount.filter((data, index) => index !== amountData);
      setRecAmount(result);
    }
    if (From === "payAmount") {
      let result = payAmount.filter((data, index) => index !== amountData);
      setPayAmount(result);
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
      getAllTransportBill()

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
            <h5 className='text-center py-2 bg-dark text-white'>Transport Driver Bill</h5>
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
                <div className='col-3'><h6 className='pt-2'>Driver Name:</h6></div>
                <div className='col-9'>
                  <div className='d-flex'>
                    <button type="button" className={`btn btn-${btnColor} btn-sm mx-1`} id="HiddenBtnCustomer" data-bs-toggle="modal" data-bs-target="#staticBackdrop3">
                      Driver
                    </button>
                    <input type="text" value={selectedCustomer.name} placeholder='Driver Name' className='form-control' name="driverName" autoComplete='off' readOnly />
                  </div>
                </div>
              </div>
              <div className='col-12 mt-0 mt-lg-2'>
                {/* customer address and contact show */}
                <div className='d-flex '>
                  <div className='col-3'>
                    <h6 className='pt-2'>Driver Detail:</h6>
                  </div>
                  <div className='col-9'>
                    <input type="text" readOnly value={selectedCustomer.address && selectedCustomer.contact && selectedCustomer.category ?
                      selectedCustomer.address + " #" + selectedCustomer.contact + " #" + selectedCustomer.category : ''} className='form-control' name="driverName" autoComplete='off' placeholder='Driver Detail' />
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
            <button className={`btn btn-${btnColor} btn-sm mx-1`} onClick={()=>setMode('Transport')}> Transport</button>
            <button className={`btn btn-${btnColor} btn-sm mx-1`} onClick={()=>setMode('Salary')}> Salary</button>
          </div>

        </div>
        
        {/* part three show customer's add items data and list component */}
        {mode==='Salary' || (customerItems.length>0 && customerItems[0].from)?<SalaryData btnColor={btnColor} initalvalues={{salaryInput, setSalaryInput  ,transportFuel}} />
        :<TransportData btnColor={btnColor} initalvalues={{itemInput, setItemInput  ,transportFuel}} />}
        {/* part forth rec,pay,discount and other functionality (all buttons) */}

        <div className='row mt-2'>
          <div className='col-lg-5'>
            <div className='d-flex' style={{ flexWrap: 'wrap' }}>
              <ReceiptCashpage btnColor={btnColor} />
              <PaymentCashpage btnColor={btnColor} />
              <Discountpage btnColor={btnColor} />
             <FuelAddToTransport  btnColor={btnColor} fuelValue={{ setTransportFuel}} />
            </div>
            <hr className='mt-2 mb-1' />
            <div className='d-flex' style={{ flexWrap: 'wrap' }}>
              <button className={`col me-2 btn btn-${btnColor}  mt-2`} onClick={() => clearAll()}>Cancel</button>
              <button className={`col me-2 btn btn-${btnColor}  mt-2`} id="preBtn" disabled={sellBill.SellBillNumber === 1 ? true : false} onClick={() => previousBtnClick()}>Prev </button>
              <button className={`col me-2 btn btn-${btnColor}  mt-2`} disabled={billNumberForNextBtn < sellBill.SellBillNumber + 2 ? true : false} onClick={() => nextBtnClick()}>Next</button>
              <button className={`col me-2 btn btn-${btnColor}  mt-2`} onClick={() => NewbtnClick()}>New</button>
              <button className={`col me-2 btn btn-${btnColor}  mt-2`} disabled={billId ? false : true} onClick={() => DeleteBill(billId)}>Delete</button>
              <button className={`col me-2 btn btn-${btnColor}  mt-2`} disabled={billId ? false : true} id="HiddenBtnPrint" data-bs-toggle="modal" data-bs-target="#staticBackdrop8">Print</button>
              <button className={`col me-2 btn btn-${btnColor}  mt-2`} onClick={billSaveBtn}>Save</button>
            </div>
            <hr className='d-lg-none' />
          </div>

          {/* billing table part */}
          <div className='col-lg-7'>
            <div className='row border rounded-2'>
            <div className='col-lg-12 table-responsive' id="data" style={{ height: '20vh' }}>
                <table className="table mb-0">
                  <tbody>
                    {/* Final amount */}
                    <tr>
                      <th scope="row">Final Amount : {- parseInt(finalAmount)
                        + (parseInt(selectedCustomer.balance ? selectedCustomer.balance : 0))} </th>
                      <th colSpan={3}>T.Amount:({finalAmount ? -finalAmount : 0}) + Last Balance:({selectedCustomer.balance ? selectedCustomer.balance : 0}) </th>
                    </tr>

                    {/* Payment*/}
                    {payAmount.length > 0 ? payAmount.map((payData, index) => {
                      payAmountVariable = payAmountVariable + parseInt(payData.amount)
                      return <tr key={index}>
                        <th scope="row">pay Amount: {payData.amount ? payData.amount : 0}</th>
                        <td>{payData.mode ? payData.mode : ''}</td>
                        <td>{payData.naration ? payData.naration : ''}</td>
                        <td className='p-0 pt-1'>
                          {parseInt(payData.amount ? payData.amount : 0) !== 0 ?
                            <button className="btn btn-danger btn-sm py-0 px-1" onClick={() => removeAmountEntry(index, 'payAmount')}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-octagon-fill pb-1" viewBox="0 0 16 16">
                              <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                            </svg></button>
                            : ''}
                        </td>
                      </tr>
                    }) :
                      <tr>
                        <th scope="row" colSpan={4}>Pay Amount: {0}</th>
                      </tr>
                    }

                    {/* Receive */}
                    {recAmount.length > 0 ? recAmount.map((recData, index) => {
                      recAmountVariable = recAmountVariable + parseInt(recData.amount)
                      return <tr key={index}>
                        <th scope="row">Receive Amount: {recData.amount ? recData.amount : 0}</th>
                        <td>{recData.mode ? recData.mode : ''}</td>
                        <td>{recData.naration ? recData.naration : ''}</td>
                        <td className='p-0 pt-1'>
                          {parseInt(recData.amount ? recData.amount : 0) !== 0 ?
                            <button className="btn btn-danger btn-sm py-0 px-1" onClick={() => removeAmountEntry(index, 'recAmount')}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-octagon-fill pb-1" viewBox="0 0 16 16">
                              <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                            </svg></button>
                            : ''}
                        </td>
                      </tr>
                    }) :
                      <tr>
                        <th scope="row" colSpan={4}>Receive Amount: {0}</th>
                      </tr>
                    }
                    {/*Discount  */}
                    <tr>
                      <th scope="row">Discount: {discount.amount ? discount.amount : 0}</th>
                      <td colSpan={2}>{discount.naration ? discount.naration : ''}</td>
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
                      {customeKaBalanveAfterCalculation = - parseInt(finalAmount)
                        + parseInt(selectedCustomer.balance ? selectedCustomer.balance : 0)
                        - parseInt(recAmountVariable ? recAmountVariable:0)
                        + parseInt(payAmountVariable ? payAmountVariable:0)
                        + parseInt(discount.amount ? discount.amount : 0)}</th>


                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        <div className='row'>
          <CustomerNameList memberType="transport" />
          <ItemNameList initalvalues={{ itemInput, setItemInput }} itemType="sale" />
          <BillPrint nameData={selectedCustomer} bdate={date}
            bno={sellBill.SellBillNumber ? sellBill.SellBillNumber : null}
            billitems={customerItems} recData={{ recAmount,recAmountVariable }}
            payData={{ payAmount,payAmountVariable }}
            discountData={{ discount }}
            fuel ={{transportFuel}}
            finalAmount={finalAmount}
          />
        </div>
      </div> : ''
  )
}

export default TransportPage
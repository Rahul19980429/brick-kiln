import React, { useState, useContext } from 'react';
import context from '../ContextApi/Context';


const PaymentCashpage = (props) => {
  const { btnColor } = props;
  // destructuring of conetxt 
  const a = useContext(context);
  const { payAmount, setPayAmount } = a;
  // useState for payment form 
  const [payment, setPayment] = useState({ amount: '', mode: 'cash', naration: '', bankName: '' })

  const onchangefunction = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value })

  }
  const keypress = (e) => {
    if (isNaN(e.target.value)) {
      e.target.value = "";
    setPayment({ ...payment, [e.target.name]: e.target.value })

    }
    else{
      if(payment.mode==='cash'){
        setPayment({...payment,bankName:''})
      }
    }

  }
  const paymentClick = (e) => {
    e.preventDefault();
    setPayAmount(payAmount.concat(payment));
    setPayment({ amount: '', mode: 'cash', naration: '', bankName: '' });
    // close modal
    document.getElementById('paymentCloseBtn').click()

  } 
  const clearState = () => {
    setPayment({ amount: '', mode: 'cash', naration: '', bankName: '' });
  }
  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <button type="button" className={`btn btn-${btnColor}  me-3 mt-2`} data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
        Pay
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">

            <form className='form' onSubmit={paymentClick}>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Pay Amount</h1>
                <button type="button" id="paymentCloseBtn" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => clearState()}></button>
              </div>
              <div className="modal-body">

                <div className="input-group">
                  <div className='row'>
                    <div className='col-3'>
                      <select className="form-select" aria-label="Default select example" name='mode' value={payment.mode} onChange={onchangefunction}>
                        <option value="cash">Cash</option>
                        <option value="online">Online</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className='col-3 px-1 '>
                      <input type='text' autoComplete='off' onKeyUp={keypress} onChange={onchangefunction} value={payment.amount} className="form-control" id='amount' name='amount' placeholder='Enter Amount' />
                    </div>
                    <div className='col-6'>
                      <div className="input-group">
                        <span className="input-group-text">Transfer From</span>
                        <input type='text' autoComplete='off' onChange={onchangefunction} value={payment.bankName} className="form-control" id='bankName' name='bankName' placeholder='Bank Name' disabled={payment.mode !== 'online' ? true : false} />
                      </div>

                    </div>
                  </div>


                </div>
                <div className="input-group mt-4">
                  <span className="input-group-text">naration</span>
                  <textarea autoComplete='off' onChange={onchangefunction} value={payment.naration} className="form-control" aria-label="With textarea" id='naration' name='naration' placeholder='Enter Naration'></textarea>
                </div>

              </div>
              <div className="modal-footer">
                <button type="submit" className={`btn btn-${btnColor}`}  disabled={payment.amount === '' || (payment.mode==='online' && payment.bankName==='') ? true : false}>save</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => clearState()}>cancel</button>

              </div>
            </form>
          </div>
        </div>
      </div>


    </div>
  )
}

export default PaymentCashpage

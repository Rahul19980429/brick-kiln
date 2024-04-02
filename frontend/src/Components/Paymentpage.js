import React, { useState, useContext } from 'react';
import context from '../ContextApi/Context';


const PaymentCashpage = (props) => {
  const { btnColor } = props;
  // destructuring of conetxt 
  const a = useContext(context);
  const { setPayAmount } = a;
  // useState for receipt form 
  const [payment, setPayment] = useState({ amount: '', mode: 'cash', naration: '' })

  const onchangefunction = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value })

  }
  const keypress = (e) => {
    if (isNaN(e.target.value)) {
      e.target.value = "";
    }
  }
  const paymentClick = (e) => {
    e.preventDefault();
    setPayAmount(payment);
    setPayment({ amount: '', mode: 'cash', naration: '' });
    // close modal
    document.getElementById('paymentCloseBtn').click()

  }
  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <button type="button" className={`btn btn-${btnColor} me-3 mt-2`} data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
        Pay
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">

            <form className='form' onSubmit={paymentClick}>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Pay Amount</h1>
                <button type="button" id="paymentCloseBtn" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <div className="input-group">
                  <select className="form-select" aria-label="Default select example" name='mode' value={payment.mode} onChange={onchangefunction}>
                    <option value="cash">Cash</option>
                    <option value="online">Online</option>
                    <option value="other">Other</option>
                  </select>
                  <input type='text' autoComplete='off' onKeyUp={keypress} onChange={onchangefunction} value={payment.amount} className="form-control" id='amount' name='amount' placeholder='Enter Amount' />
                </div>
                <div className="input-group mt-4">
                  <span className="input-group-text">naration</span>
                  <textarea autoComplete='off' onChange={onchangefunction} value={payment.naration} className="form-control" aria-label="With textarea" id='naration' name='naration' placeholder='Enter Naration'></textarea>
                </div>

              </div>
              <div className="modal-footer">
                <button type="submit" className={`btn btn-${btnColor}`}>save</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">cancel</button>

              </div>
            </form>
          </div>
        </div>
      </div>


    </div>
  )
}

export default PaymentCashpage

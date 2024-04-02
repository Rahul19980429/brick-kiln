import React, { useState, useContext } from 'react';
import context from '../ContextApi/Context';

const ReceiptCashpage = (props) => {
  const { btnColor } = props;
  // destructuring of conetxt 
  const a = useContext(context);
  const { setRecAmount } = a;
  // useState for receipt form 
  const [receipt, setReceipt] = useState({ amount: '', mode: 'cash', naration: '' })

  const onchangefunction = (e) => {
    setReceipt({ ...receipt, [e.target.name]: e.target.value })

  }
  const keypress = (e) => {
    if (isNaN(e.target.value)) {
      e.target.value = "";
    }
  }
  const receiptClick = (e) => {
    e.preventDefault();
    setRecAmount(receipt);
    setReceipt({ amount: '', mode: 'cash', naration: '' });
    // close modal
    document.getElementById('receiptCloseBtn').click()

  }
  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <button type="button" className={`btn btn-${btnColor} me-3 mt-2`} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Receive
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <form className='form' onSubmit={receiptClick}>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Receive Amount</h1>
                <button type="button" id="receiptCloseBtn" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="input-group">
                  <select className="form-select" aria-label="Default select example" name='mode' value={receipt.mode} onChange={onchangefunction}>
                    <option value="cash">Cash</option>
                    <option value="online">Online</option>
                    <option value="other">Other</option>
                  </select>

                  <input type='text' autoComplete='off' onKeyUp={keypress} onChange={onchangefunction} value={receipt.amount} className="form-control" id='amount' name='amount' placeholder='Enter Amount' />
                </div>
                <div className="input-group mt-4">
                  <span className="input-group-text">naration</span>
                  <textarea autoComplete='off' onChange={onchangefunction} value={receipt.naration} className="form-control" aria-label="With textarea" id='naration' name='naration' placeholder='Enter Naration'></textarea>
                </div>

              </div>
              <div className="modal-footer">
                <button type="submit" className={`btn btn-${btnColor}`} disabled={receipt.amount===''?true:false}>save</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">cancel</button>

              </div>
            </form>
          </div>
        </div>
      </div>


    </div>
  )
}

export default ReceiptCashpage

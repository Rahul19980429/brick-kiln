import React,{useState,useContext}from 'react';
import context from '../ContextApi/Context';


const Discountpage = (props) => {
  const {btnColor} = props;
   // destructuring of conetxt 
   const a = useContext(context);
   const {setDiscount} = a;
   // useState for receipt form 
   const [discount, setDiscountV] = useState({amount:'' , naration:''})

   const onchangefunction = (e)=>{
       setDiscountV({...discount,[e.target.name]: e.target.value})

   }
   const keypress = (e) => {
       if (isNaN(e.target.value)) {
           e.target.value = "";
       }
   }
   const discountClick=(e)=>{
       e.preventDefault();
       setDiscount(discount);
       setDiscountV({amount:'' , naration:''});
       // close modal
       document.getElementById('discountCloseBtn').click()

   }
  return (
    <div>
       {/* <!-- Button trigger modal --> */}
       <button type="button" className={`btn btn-${btnColor} me-3 mt-2`} data-bs-toggle="modal" data-bs-target="#staticBackdrop5">
            Discount
          </button>

          {/* <!-- Modal --> */}
          <div className="modal fade" id="staticBackdrop5" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                
              <form className='form' onSubmit={discountClick}>
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">Discount Amount</h1>
                  <button type="button" id="discountCloseBtn" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                 
                    <div className="input-group">
                      <span className="input-group-text">Cash</span>
                      <input type='text' autoComplete='off' onKeyUp={keypress}  onChange={onchangefunction} value={discount.amount} className="form-control" id='amount' name='amount' placeholder='Enter Amount'/> 
                    </div>
                    <div className="input-group mt-4">
                      <span className="input-group-text">naration</span>
                      <textarea autoComplete='off' onChange={onchangefunction} value={discount.naration} className="form-control" aria-label="With textarea" id='naration' name='naration' placeholder='Enter Naration'></textarea>
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

export default Discountpage

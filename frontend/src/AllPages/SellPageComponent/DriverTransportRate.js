import React, { useState, useContext } from 'react';
import context from '../../ContextApi/Context';

const DriverTransportRate = (props) => {
  
    const { btnColor ,quantity} = props;
    // destructuring of conetxt 
    const a = useContext(context);
    const {members } = a;
    // useState for receipt form 
    const [transport,setTransport] = useState({ name: '', vehicleNo:'', rate:'',amount: '' })

    const onchangefunction = (e) => {
        setTransport({ ...transport, [e.target.name]: e.target.value })
    }

    const keypress = (e) => {
        if (isNaN(e.target.value)) {
            e.target.value = "";
            setTransport({ ...transport, [e.target.name]: e.target.value })
        }
        else {
            if (transport.rate && quantity) {
                setTransport({...transport,amount: parseInt(quantity ) * (parseFloat(transport.rate)/1000)})
            }
            else {
                setTransport({...transport,amount:0})
            }
        }
    }
    const TransportSaveClick = (e) => {
        e.preventDefault();
        console.log(transport,quantity)
        // setRecAmount(recAmount.concat(receipt));
        setTransport({ name: '', vehicleNo:'', rate:'', amount: '' });
        // close modal
        document.getElementById('driverTransportationCloseBtn').click()

    }
    const clearState = () => {
        setTransport({ name: '', vehicleNo:'', rate:'', amount: '' });
    }
   
    
    return (
        <div>
            {/* <!-- Button trigger modal --> */}
            <button type="button" className={`btn btn-${btnColor}  me-3 mt-2`} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Receive
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop6" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form className='form' onSubmit={TransportSaveClick}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Driver Transportation Entry</h1>
                                <button type="button" id="driverTransportationCloseBtn" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => clearState()}></button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group">
                                    <div className='row'>
                                        <div className='col-4'>
                                            <select className="form-select" aria-label="Default select example" name='name' value={transport.name} onChange={onchangefunction}>
                                            <option value=''>Select Driver</option>
                                                { members.filter((drivers)=>drivers.category==='transport').map((driver)=>{
                                                    return <option value={driver._id} key={driver._id} className='text-capitalize'>{driver.name}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className='col-4'>
                                            <input type='text' autoComplete='off' onKeyUp={keypress} onChange={onchangefunction} value={transport.vehicleNo} className="form-control" id='vehicleNo' name='vehicleNo' placeholder='Vehicle No.' />
                                        </div>
                                        <div className='col-4'>
                                            <input type='text' autoComplete='off' onKeyUp={keypress} onChange={onchangefunction} value={transport.rate} className="form-control" id='rate' name='rate' placeholder='Rate' />
                                        </div>
                                    </div>
                                </div>



                                <div className='row mt-4'>
                                    <div className='col-6'>
                                        <div className='input-group'>
                                            <span className="input-group-text">Quantity</span>
                                            <input type='text' autoComplete='off' onChange={onchangefunction} value={quantity} className="form-control"  placeholder='Quantity' readOnly/>
                                        </div>
                                    </div>

                                    <div className='col-6'>
                                        <div className='input-group'>
                                            <span className="input-group-text">Amount</span>
                                            <input type='text' autoComplete='off' onChange={onchangefunction} value={transport.amount} className="form-control" placeholder='Amount' />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="submit" className={`btn btn-${btnColor}`} disabled={!transport.name || !transport.vehicleNo  || !transport.rate ||quantity==='' ? true : false}>save</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => clearState()}>cancel</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default DriverTransportRate

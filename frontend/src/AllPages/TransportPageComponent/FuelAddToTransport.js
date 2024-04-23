import React, { useState, useContext } from 'react';



const FuelAddToTransport = (props) => {
    const { btnColor,fuelValue } = props;
    const {setTransportFuel} = fuelValue;
    // destructuring of conetxt 
   
    // useState for payment form 
    const [fuel, setFuel] = useState(0)

    const OnChange = (e)=>{
        if (!isNaN(e.target.value)) {
        setFuel(e.target.value)
        }
    }
    
    const fuelClick = (e) => {
        e.preventDefault();
        setTransportFuel(fuel);
        setFuel(0);
        // close modal
        document.getElementById('fuelCloseBtn').click()

    }
    const clearState = () => {
        setFuel(0);
    }
    return (
        <div>

            {/* <!-- Button trigger modal --> */}
            <button type="button" className={`btn btn-${btnColor}  me-3 mt-2`} data-bs-toggle="modal" data-bs-target="#staticBackdrop6">
                Fuel
            </button>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop6" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <form className='form' onSubmit={fuelClick}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Fuel</h1>
                                <button type="button" id="fuelCloseBtn" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => clearState()}></button>
                            </div>
                            <div className="modal-body">

                                <div className="input-group">

                                    <div className="input-group">
                                        <span className="input-group-text">Fuel</span>
                                        <input type='text' autoComplete='off' onChange={OnChange} value={fuel} className="form-control" id='Fuel' name='Fuel' placeholder=''/>
                                    </div>

                                </div>
                              

                            </div>
                            <div className="modal-footer">
                                <button type="submit" className={`btn btn-${btnColor}`}>save</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => clearState()}>cancel</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default FuelAddToTransport

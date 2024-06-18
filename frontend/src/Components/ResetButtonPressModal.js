import React,{useState,useContext} from 'react'
import context from '../ContextApi/Context'

const ResetButtonPressModal = ({Data}) => {
    const a = useContext(context);
    const { ResetAction ,error,setError} = a;
    const [password, setPassword] = useState('')

    const SubmitPassword = ()=>{
        ResetAction(password,Data.DeleteType)
        setPassword('')
    }

    if (error.length !== 0) {
        setTimeout(() => {
            setError('')
        }, 2500);
    }

    return (
        <div>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="ResetModalButtonPress" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{Data.Title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setPassword('')}></button>
                        </div>
                        <div className="modal-body">
                        <div className="input-group mb-2 border border-white rounded-1">
                                    <span className="bg-opacity-25 input-group-text bg-dark border border-3 border-danger rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill text-danger" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                    </svg></span>
                                    <input value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete='off' type="text" className="bg-dark text-danger border-0 form-control" placeholder='Enter Password'  id="newPassword" name="newPassword" aria-describedby="emailHelp" />
                                </div>
                                <div className="input-group mb-3 text-danger justify-content-center">
                                    <h6>{error.error ? error.error : error}</h6>
                                </div>
                                {Data.DeleteType==="member"?<p className='mb-0'><strong>Note: Reset Member Will Also Reset Purchase, Sale, Transport, Labor. Are You Sure? </strong></p>:''}
                                {Data.DeleteType==="item"?<p className='mb-0'><strong>Note: Reset Item Will Reset Item Details. Are You Sure? </strong></p>:''}
                                {Data.DeleteType==="salebill"?<p className='mb-0'><strong>Note: Reset Sale Bill Will Also Reset Bank Entry And Item Sale Numbers. Are You Sure? </strong></p>:''}
                                {Data.DeleteType==="purchasebill"?<p className='mb-0'><strong>Note: Reset Purchase Bill Will Also Reset Purchase Fuel Entry And Item Sale Entry. Are You Sure? </strong></p>:''}
                                {Data.DeleteType==="transportbill"?<p className='mb-0'><strong>Note: Reset Transport Bill Will Also Reset Provide Fuel Entry And Item Purchase Entry. Are You Sure? </strong></p>:''}
                                {Data.DeleteType==="laborbill"?<p className='mb-0'><strong>Note: Reset Labor Bill Will Also Reset Item Production Entry. Are You Sure? </strong></p>:''}
                                {Data.DeleteType==="completeapplication"?<p className='mb-0'><strong>Note: It Will Reset Complete Application. Are You Sure? </strong></p>:''}

                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={()=>SubmitPassword()} disabled={password===''?true:false}>Verify</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>setPassword('')}>Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ResetButtonPressModal

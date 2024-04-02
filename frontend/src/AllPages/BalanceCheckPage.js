import React, { useContext, useEffect } from 'react';
import context from '../ContextApi/Context'
import { useNavigate } from 'react-router-dom';


const BalanceCheckPage = () => {
    let navigate = useNavigate();
    const a = useContext(context);
    const { members, getAllMember,setError,logOutClick} = a;


    const setintDate = (intdate)=>{
        let date = new Date(intdate)
        return  date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
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
        
        getAllMember()
          }
    }, [])

    return (
        localStorage.getItem('Jwt_token') && localStorage.getItem('user_activeStatus') === 'true' ?
        <div className='container-fluid'>
            <div className='row'>
                 <h5 className='text-center py-2 bg-dark text-white mb-0'>Balance Check</h5>
            </div>
            <table className="table table-success table-striped mb-0 mt-2" >
                <thead className='sticky-top'>
                    <tr>
                        <th scope="col" className='border-end border-dark'>#</th>
                        <th scope="col" className='border-end border-dark'>Name</th>
                        <th scope="col" className='border-end border-dark'>Group</th>
                        <th scope="col" className='border-end border-dark'>Contact</th>
                        <th scope="col" className='border-end border-dark'>Address</th>
                        <th scope="col" className='border-end border-dark'>Balance Left</th>
                        <th scope="col" className='border-end border-dark'>B.L. Date</th>
                      

                    </tr>
                </thead>
                <tbody>
                    {members.length > 0 ?
                        (members.filter((fdata) => parseFloat(fdata.lastBalance) !== 0)).length>0?members.filter((fdata) => parseFloat(fdata.lastBalance) !== 0).map((data, index) => {
                            

                            return <tr key={data._id}  >
                                <td className='border-end border-dark'>{index+1}</td>
                                <td className='border-end border-dark'>{data.name}</td>
                                <td className='border-end border-dark'>{data.category}</td>
                                <td className='border-end border-dark'>{data.contact}</td>
                                <td className='border-end border-dark'>{data.address}</td>
                                <td className='border-end border-dark'>{Math.floor(data.lastBalance)}</td>
                                <td className='border-end border-dark'>{setintDate(data.lastBalanceDate)}</td>
                                



                            </tr>
                        }) : <tr><td colSpan={7} className='text-center'>Data Will Display Here </td></tr>
                        : <tr><td colSpan={7} className='text-center'>Data Will Display Here </td></tr>}
                </tbody>
            </table>
        </div>:''
    )
}

export default BalanceCheckPage

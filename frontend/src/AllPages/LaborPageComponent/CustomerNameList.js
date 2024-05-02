import React, { useContext, useEffect ,useState} from 'react';
import context from '../../ContextApi/Context'

const CustomerNameList = (props) => {
    const [search, setSearch] = useState('')
    const a = useContext(context);
    const { setSelectedCustomer, members, getAllMember } = a;

    const handelClick = (data) => {
        setSelectedCustomer({ _id: data._id, name: data.name, address: data.address, contact: data.contact, balance: data.lastBalance, category: data.category, completeData: data })
        document.getElementById('NameModalClose').click()

    }

    useEffect(() => {
        getAllMember()
    }, [])

    return (
        <>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Customer List</h1>
                            <button type="button" className="btn-close" id="NameModalClose" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{ height: '70vh', overflowY: 'scroll' }}>
                            <div className='row pe-3'>
                                <div className='col-lg-12'>
                                    <input className=" form-control ms-lg-3 " value={search} onChange={(e)=>setSearch(e.target.value)} name="search"  type="search" placeholder="Search" aria-label="Search" autoComplete='off' />
                                </div>
                            </div>
                            <hr />
                            <ul className='p-0'>
                                {members.length > 0 ?
                                    search===''?
                                    //get all customers from members
                                    members.filter((mdata) => (props.memberType ? mdata.category.split('-')[1] === props.memberType : mdata)).map((data) => {
                                        return <li onClick={() => handelClick(data)} className="dropdown-item py-1  ps-3 border-top fs-6 text-capitalize" style={{ cursor: 'pointer' }} key={data._id} ><small>{data.name}</small> # {data.contact}</li>
                                    }) :  members.filter((mdata) => (props.memberType ? mdata.category.split('-')[1] === props.memberType && (mdata.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 || mdata.contact.toLowerCase().indexOf(search.toLowerCase()) !== -1) : mdata)).map((data) => {
                                        return <li onClick={() => handelClick(data)} className="dropdown-item py-1 ps-3 border-top fs-6 text-capitalize" style={{ cursor: 'pointer' }} key={data._id} ><small>{data.name}</small> # {data.contact}</li>
                                    })
                                :<h5 className='text-center'>Not Found</h5>}
                                
                            </ul>
                        </div>
                        <div className="modal-footer">


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerNameList

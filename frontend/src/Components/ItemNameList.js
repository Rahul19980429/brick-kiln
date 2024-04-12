import React, { useContext,useEffect,useState} from 'react';
import context from '../ContextApi/Context'

const ItemNameList = (props) => {
    const { initalvalues,itemType } = props;
    const {itemInput, setItemInput} = initalvalues
    const [search, setSearch] = useState('')
    const a = useContext(context);
    const {getAllItem,items,setItemName} = a;
   
    const handelClick=(data)=>{
    setItemName({_id:data._id,iname:data.itemname,category:data.category,irate:data.itemrate})
    setItemInput({...itemInput,Rate:data.itemrate})
    document.getElementById('ItemModalClose').click()
    }

    useEffect(() => {
      getAllItem()
   
    }, [])
    return (
        <>
           

            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop4" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Item List</h1>
                            <button type="button" className="btn-close" id="ItemModalClose" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{height:'70vh',overflowY:'scroll'}}>
                        <div className='row pe-3'>
                                <div className='col-lg-12'>
                                    <input className=" form-control me-5 ms-lg-3 "  value={search} onChange={(e)=>setSearch(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
                                </div>
                            </div>
                            <hr />
                            <ul className='p-0'>
                                {items.length>0?
                                 search===''?
                                items.filter((Idata) => (itemType ? Idata.category === itemType : Idata)).map((data) => {
                                    return <li onClick={()=>handelClick(data)} className="dropdown-item py-1 ps-3 border-top fs-5 text-capitalize"  style={{cursor:'pointer'}} key={data._id} >{data.itemname} Rate: {data.itemrate}</li>
                                }): items.filter((Idata) => (itemType ? Idata.category === itemType : Idata) && (Idata.itemname.toLowerCase().indexOf(search.toLowerCase()) !== -1 )).map((data) => {
                                    return <li onClick={() => handelClick(data)} className="dropdown-item py-1 ps-3 border-top fs-5 text-capitalize" style={{ cursor: 'pointer' }} key={data._id} >{data.itemname} Rate: {data.itemrate}</li>
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

export default ItemNameList

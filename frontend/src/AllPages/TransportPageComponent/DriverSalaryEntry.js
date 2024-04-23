import React, { useContext, useState } from 'react';
import context from '../../ContextApi/Context'
import "../../App.css"
const DriverSalaryPage = (props) => {
    const { btnColor, initalvalues } = props;
    const { itemInput, setItemInput,transportFuel } = initalvalues;


    // context d-Structuring
    const a = useContext(context);
    const { customerItems, setCustomerItems,
        setFinalAmount, finalAmount } = a;

    // function for remove item from the customer items list
    const removeItemFromList = (item) => {
        setFinalAmount(finalAmount - customerItems[item].amount)
        let result = customerItems.filter((data, index) => index !== item);
        setCustomerItems(result);
    }

    const editItemFromList = (data, index) => {
        setItemInput(
            {
                From: data.from,
                To: data.to,
                Chuti: data.chuti,
                MonthSalary:data.monthSalary,
                Other: data.other,
                NumberOfDays:data.numberOfDays,
                Amount:data.amount

            })

        removeItemFromList(index);

    }

   

    // onchange function on Intput field
    const inputValueChange = (e) => {
        setItemInput({ ...itemInput, [e.target.name]: e.target.value });
    }

    // check input value is interger 
    const keypress = (e) => {
        if (isNaN(e.target.value) || e.target.value === " ") {
            e.target.value = "";
            setItemInput({ ...itemInput, [e.target.name]: e.target.value });
        }
        else {
            if (itemInput.From && itemInput.To &&!itemInput.MumberOfDays) {
                let date1 = new Date(itemInput.From).getTime();
                let date2 = new Date(itemInput.To).getTime();
                let Difference_In_Time = date2 - date1;
                let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
                if (itemInput.Chuti !== 0) {
                    Difference_In_Days = Difference_In_Days - parseInt(itemInput.Chuti?itemInput.Chuti:0)
                    setItemInput({ ...itemInput, NumberOfDays: Difference_In_Days,Amount:Difference_In_Days*(parseFloat(itemInput.MonthSalary?itemInput.MonthSalary:0)/30) })
                }
                else {
                    setItemInput({ ...itemInput, NumberOfDays: Difference_In_Days,Amount:Difference_In_Days*(parseFloat(itemInput.MonthSalary?itemInput.MonthSalary:0)/30) })
                }
            }
          

        }

    }


    // on clean button click
    const clearForm = () => {
        setItemInput({ From: '', To: '', Chuti: 0, MonthSalary: 0, NumberOfDays: 0, Other: 0, Amount: 0 })

    }

    // onform submit function run
    const AddItemToCustomer = (e) => {
        e.preventDefault();
        const newItemAdd = {
            "from": itemInput.From,
            "to": itemInput.To,
            "chuti": itemInput.Chuti,
            "monthSalary": itemInput.MonthSalary,
            "numberOfDays": itemInput.NumberOfDays,
            "other": itemInput.Other,
            "amount": itemInput.Amount,
        }
        setFinalAmount(parseFloat(finalAmount) + parseFloat(itemInput.Amount));
        setCustomerItems(customerItems.concat(newItemAdd).reverse());
        clearForm()

    }



    return (
        <>
            <div className='row'>
                <div className='col-12 border text-center  p-0 table-responsive' id="data" style={{ height: '22vh' }}>
                    <table className="table table-success table-striped mb-0" >
                        <thead className='sticky-top'>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">STARTING</th>
                                <th scope="col">CLOSEING</th>
                                <th scope="col">CHUTI</th>
                                <th scope="col">SALARY(30DAYS)</th>
                                <th scope="col">OTHER</th>
                                <th scope="col">NO.Of WORKING DAYS</th>
                                <th scope="col">AMOUNT</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {customerItems.length > 0 ?
                                customerItems.map((data, index) => {

                                    return <tr key={index}  >
                                        <td>{customerItems.length - index}</td>
                                        <td>{data.from}</td>
                                        <td>{data.to}</td>
                                        <td>{data.chuti}</td>
                                        <td>{data.monthSalary}</td>
                                        <td>{data.other}</td>
                                        <td>{data.numberOfDays}</td>
                                        <td>{data.amount}</td>
                                        <td>
                                            <button className='btn btn-sm btn-danger py-0 border-none' onClick={() => removeItemFromList(index)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                            </svg></button>
                                            <button className='ms-2 btn btn-sm btn-danger py-0 border-none' onClick={() => editItemFromList(data, index)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg></button>
                                        </td>

                                    </tr>
                                }) : <tr><td colSpan={9}>Items Will Display Here </td></tr>}
                        </tbody>
                    </table>
                </div>
                <table className="table table-success table-striped mb-2">
                    <tfoot>
                        <tr className='table-dark text-start'>
                            <th scope="col" colSpan={4}>T.Items: {customerItems.length}</th>
                            <th scope="col" colSpan={3}>T.Amount: {finalAmount}</th>
                            <th scope="col" colSpan={3}>Fuel: {transportFuel}</th>

                        </tr>
                    </tfoot>
                </table>
            </div>

            <div className='row'>
                <div className='col-12 border '>
                    <form onSubmit={AddItemToCustomer}>
                        <div className={`row  text-${btnColor} pt-2`}>
                            <div className='col-lg-2 col-md-2 col-9 px-1'>
                                <h6 className='fw-bold text-lg-center mb-1'>FROM</h6>
                                <div className=" input-group mb-4">
                                    <input onChange={inputValueChange} onKeyUp={keypress} autoComplete="off" type="date" className="form-control" value={itemInput.From} name="From" id="From" />
                                </div>
                            </div>
                            <div className='col-lg-2 col-md-2 col-9 px-1'>
                                <h6 className='fw-bold text-lg-center mb-1'>TO</h6>
                                <div className=" input-group mb-4">
                                    <input onChange={inputValueChange} onKeyUp={keypress} autoComplete="off" type="date" className="form-control" value={itemInput.To} name="To" id="To" />
                                </div>
                            </div>
                            <div className='col-lg-1 col-md-2 col-3 px-1'>
                                <h6 className='fw-bold text-lg-center mb-1'>CHUTI</h6>
                                <div className=" input-group mb-4">
                                    <input value={itemInput.Chuti} onKeyUp={keypress} onChange={inputValueChange} step='0.1' autoComplete='off' type="text" className="form-control" id="Chuti" name="Chuti" placeholder='Chuti' />
                                </div>
                            </div>
                            <div className='col-lg-1 col-md-2 col-3 px-1'>
                                <h6 className='fw-bold text-lg-center mb-1'>SALARY</h6>
                                <div className=" input-group mb-4">
                                    <input value={itemInput.MonthSalary} onKeyUp={keypress} onChange={inputValueChange} autoComplete='off' type="text" className="form-control" id="MonthSalary" name="MonthSalary" placeholder='(30 Days) Salary' />
                                </div>
                            </div>

                            <div className='col-lg-1 col-md-2 col-3 px-1'>
                                <h6 className='fw-bold text-lg-center mb-1'>OTHER</h6>
                                <div className=" input-group mb-4">
                                    <input value={itemInput.Other} onKeyUp={keypress} onChange={inputValueChange} autoComplete='off' type="text" className="form-control" id="Other" name="Other" placeholder='Other' />
                                </div>
                            </div>
                            <hr className='border border-warning border-2 d-block d-lg-none' />
                            <div className='col-lg-1 col-md-2 col-3 px-1'>
                                <h6 className='fw-bold text-lg-center mb-1'>WORKDAYS</h6>
                                <div className=" input-group mb-3">
                                    <input value={itemInput.NumberOfDays} onKeyUp={keypress} onChange={inputValueChange} autoComplete='off' type="text" className="form-control" id="NumberOfDays" name="NumberOfDays" placeholder='' />
                                </div>
                            </div>
                            <div className='col-lg-1 col col-md-4 px-1'>
                                <h6 className='fw-bold text-lg-center mb-1'>AMOUNT</h6>
                                <div className=" input-group mb-3">
                                    <input autoComplete='off' type="none" className="form-control" id="Amount" name="Amount" value={itemInput.Amount} readOnly />
                                </div>
                            </div>
                            <div className='col-lg-2 col  d-flex d-lg-block align-items-center'>
                                <button className={`btn btn-${btnColor}  fw-bold  mt-lg-4 me-2 btn-sm`} disabled={!itemInput.From || !itemInput.To || !itemInput.MonthSalary ? true : false}>Add</button>
                                <button className={`btn btn-${btnColor}  fw-bold  mt-lg-4 btn-sm`} disabled={!itemInput.From && !itemInput.To && !itemInput.Chuti && !itemInput.MonthSalary && !itemInput.Other ? true : false} onClick={clearForm}>Clear</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default DriverSalaryPage
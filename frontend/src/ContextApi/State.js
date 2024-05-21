import React, { useState } from 'react'
import context from './Context';

const host = "http://localhost:3002"


const States = (props) => {
  //  usestate for sipnner 
  const [spinner, setSpinner] = useState(false)
  // usestate for errors
  const [error, setError] = useState('')

  // useState for Members
  const [members, setMembers] = useState([])
  // useState for items 
  const [items, setItems] = useState([])

  // useState for CustomerItems array of items display in table
  const [customerItems, setCustomerItems] = useState([])

  // useState for items Final amount
  const [finalAmount, setFinalAmount] = useState(0)

  // useState for receipt amount
  const [recAmount, setRecAmount] = useState([])

  // useState for payment amount
  const [payAmount, setPayAmount] = useState([])

  // useState for payment amount
  const [discount, setDiscount] = useState(0)

  // Item name useState 
  const [itemName, setItemName] = useState({ _id: '', iname: '', category: '', irate: '' })

  // useState for selected customer's data show on page
  const [selectedCustomer, setSelectedCustomer] = useState({ _id: '', name: '', address: '', contact: '', balance: '', category: '' })

  // useState for sell bill data
  const [sellBill, setSellBill] = useState('')

  // 
  const [billNumberForNextBtn, setBillNumberForNextBtn] = useState(0)






  // // // // // // // // // // //
  // Api calls 
  // // // // // // // // // // //

  // api call to gel all customers
  const getAllMember = async () => {
    // setSpinner(true)
    const response = await fetch(`${host}/api/member/getMember`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('Jwt_token')
      },

    });
    let data = await response.json();
    if (data.success) {
      setMembers(data.result);
      setSpinner()
      return data
    }
    else {
      setError(data)
      // setSpinner(false)
    }


  }

  // api call for create New Member
  const AddNewMember = async (name, category, contact, address, memberBalance, balanceDate) => {
    const response = await fetch(`${host}/api/member/createMember`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('Jwt_token')
      },
      body: JSON.stringify({ name, category, contact, address, initialBalance: memberBalance, initialBalanceDate: balanceDate, lastBalance: memberBalance, lastBalanceDate: balanceDate })
    });
    let data = await response.json();
    if (data.success) {
      getAllMember()
      setError(data.msg)
    }
    else {
      setError(data)

    }
  }

  // api call for update Member
  const UpdateMember = async (mId, name, category, contact, address, memberBalance, balanceDate) => {
    const response = await fetch(`${host}/api/member/updateMember/${mId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('Jwt_token')
      },
      body: JSON.stringify({ name, category, contact, address, initialBalance: memberBalance, initialBalanceDate: balanceDate, lastBalance: memberBalance, lastBalanceDate: balanceDate })
    });
    let data = await response.json();
    if (data.success) {
      getAllMember()
      setError(data.msg)

    }
    else {
      setError(data)

    }
  }

  // api call for Delete Member
  const DeleteMember = async (mId) => {
    const response = await fetch(`${host}/api/member/deleteMember/${mId}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('Jwt_token')
      }
    });
    let data = await response.json();
    if (data.success) {
      setError(data.msg)
      return true

    }
    else {
      setError(data.msg)
      return false
    }
  }




  // api call to get All Item
  const getAllItem = async () => {
    const response = await fetch(`${host}/api/item/getItems`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('Jwt_token')
      },

    });
    let data = await response.json();
    if (data.success) {
      setItems(data.result);
      return data.result
    }
    else {
      setError(data)
    }
  }

  //  api call for Create NEW Item
  const AddNewItem = async (itemname, category, itemrate) => {
    const response = await fetch(`${host}/api/item/createItem`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('Jwt_token')
      },
      body: JSON.stringify({ itemname, category, itemrate })
    });
    let data = await response.json();
    if (data.success) {
      getAllItem();
      setError(data.msg)
    }
    else {
      setError(data)
    }
  }

  //  api call for Update Item
  const UpdateItem = async (itemId, itemname, category, itemrate) => {
    const response = await fetch(`${host}/api/item/updateItem/${itemId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('Jwt_token')
      },
      body: JSON.stringify({ itemname, category, itemrate })
    });
    let data = await response.json();
    if (data.success) {
      getAllItem();
      setError(data.msg)
    }
    else {
      setError(data)
    }
  }



  // api call to get all sells bill
  const getAllSellBill = async () => {
    setSpinner(true)
    const response = await fetch(`${host}/api/bill/getSellBill`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('Jwt_token')
      },

    });
    let data = await response.json();
    if (data.success) {
      let number = data.result.length > 0 ? data.result[(data.result.length) - 1].sellBillNumber + 1 : 1;
      setSellBill({ sellBillData: data.result, SellBillNumber: number })
      setBillNumberForNextBtn(number)
      setSpinner(false);
      return data
    }
    // else{
    //     setError(data)
    // }
  }

  // api call for creating new sell bill
  const ADDNewSellBill = async (customer_id, sellBillNumber, itemsArray, receiptInfo, paymentInfo, discountInfo, customerLastBalance, balance) => {
    setSpinner(true)
    const response = await fetch(`${host}/api/bill/createSellBill`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('Jwt_token')
      },
      body: JSON.stringify({ customer_id, sellBillNumber, itemsArray, receiptInfo, paymentInfo, discountInfo, customerLastBalance, balance })

    });
    let data = await response.json();
    if (data.success) {
      getAllSellBill();
      getAllMember();
      setSpinner(false);
    }
    // else{
    //     setError(data)
    // }
  }

  // delete sell Bill
  const DeleteSaleBill = async (billId) => {
    setSpinner(true)
    const response = await fetch(`${host}/api/bill/deleteSaleBill/${billId}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('Jwt_token')
      },
    });
    let data = await response.json();
    if (data.success) {
      getAllSellBill();
      setError(data.msg)
      setSpinner(false)
    }
    else {
      setError(data)
      setSpinner(false)
    }

  }



  // api call to get all Purchase bill
  const getAllPurchaseBill = async () => {
    setSpinner(true)
    const response = await fetch(`${host}/api/bill/getPurchaseBill`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('Jwt_token')
      },
    });
    let data = await response.json();
    if (data.success) {
      let number = data.result.length > 0 ? data.result[(data.result.length) - 1].purchaseBillNumber + 1 : 1;
      setSellBill({ sellBillData: data.result, SellBillNumber: number })
      setBillNumberForNextBtn(number)
      setSpinner(false)
      return data;
    }
    else {
      setError(data)
      setSpinner(false)
    }
  }

  // api call for creating new Purchase bill
  const ADDNewPurchaseBill = async (supplier_id, purchaseBillNumber, itemsArray, receiptInfo, paymentInfo, discountInfo, supplierLastBalance, balance) => {
    setSpinner(true)
    // console.log(supplier_id,purchaseBillNumber,itemsArray,receiptInfo,paymentInfo,discountInfo,supplierLastBalance,balance)
    const response = await fetch(`${host}/api/bill/createPurchaseBill`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('Jwt_token')
      },
      body: JSON.stringify({ supplier_id, purchaseBillNumber, itemsArray, receiptInfo, paymentInfo, discountInfo, supplierLastBalance, balance })

    });
    let data = await response.json();
    if (data.success) {
      getAllPurchaseBill();
      getAllMember();
      setError(data.msg)
      setSpinner(false)

    }
    else {
      setError(data)
      setSpinner(false)
    }
  }

  // delete Purchase Bill
  const DeletePurchaseBill = async (billId) => {
    setSpinner(true)
    const response = await fetch(`${host}/api/bill/deletePurchaseBill/${billId}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('Jwt_token')
      },
    });
    let data = await response.json();
    if (data.success) {
      getAllPurchaseBill();
      setError(data.msg);
      setSpinner(false)
    }
    else {
      setError(data)
      setSpinner(false)
    }

  }

  // api call to get all Transport bill
  const getAllTransportBill = async () => {
    setSpinner(true)
    const response = await fetch(`${host}/api/bill/getTransportBill`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('Jwt_token')
      },

    });
    let data = await response.json();
    if (data.success) {
      let number = data.result.length > 0 ? data.result[(data.result.length) - 1].transportBillNumber + 1 : 1;
      setSellBill({ sellBillData: data.result, SellBillNumber: number })
      setBillNumberForNextBtn(number)
      setSpinner(false);
      return data
    }
    // else{
    //     setError(data)
    // }
  }

  // api call for creating new transport bill
  const ADDNewTransportBill = async (transport_id, transportBillNumber, itemsArray, receiptInfo, paymentInfo, discountInfo, fuel, transportLastBalance, balance) => {
    setSpinner(true)
    // console.log(transport_id,transportBillNumber,itemsArray,receiptInfo,paymentInfo,discountInfo,transportLastBalance,balance)
    const response = await fetch(`${host}/api/bill/createTransportBill`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('Jwt_token')
      },
      body: JSON.stringify({ transport_id, transportBillNumber, itemsArray, receiptInfo, paymentInfo, discountInfo, fuel, transportLastBalance, balance })

    });
    let data = await response.json();
    if (data.success) {
      getAllTransportBill();
      getAllMember();
      setError(data.msg)
      setSpinner(false)

    }
    else {
      setError(data)
      setSpinner(false)
    }
  }

  // delete Transport Bill
  const DeleteTransportBill = async (billId) => {
    setSpinner(true)
    const response = await fetch(`${host}/api/bill/deleteTransportBill/${billId}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('Jwt_token')
      },
    });
    let data = await response.json();
    if (data.success) {
      getAllTransportBill();
      setError(data.msg);
      setSpinner(false)
    }
    else {
      setError(data)
      setSpinner(false)
    }

  }

  // api call to get all Labor bill
  const getAllLaborBill = async () => {
    setSpinner(true)
    const response = await fetch(`${host}/api/bill/getLaborBill`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('Jwt_token')
      },
    });
    let data = await response.json();
    if (data.success) {
      let number = data.result.length > 0 ? data.result[(data.result.length) - 1].laborBillNumber + 1 : 1;
      setSellBill({ sellBillData: data.result, SellBillNumber: number })
      setBillNumberForNextBtn(number)
      setSpinner(false)
      return data;
    }
    else {
      setError(data)
      setSpinner(false)
    }
  }

  // api call for creating new Labor bill
  const ADDNewLaborBill = async (labor_id, laborBillNumber, itemsArray, receiptInfo, paymentInfo, discountInfo, laborLastBalance, balance) => {
    setSpinner(true)
    // console.log(labor_id,laborBillNumber,itemsArray,receiptInfo,paymentInfo,discountInfo,laborLastBalance,balance)
    const response = await fetch(`${host}/api/bill/createLaborBill`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('Jwt_token')
      },
      body: JSON.stringify({ labor_id, laborBillNumber, itemsArray, receiptInfo, paymentInfo, discountInfo, laborLastBalance, balance })

    });
    let data = await response.json();
    if (data.success) {
      getAllLaborBill();
      getAllMember();
      setError(data.msg)
      setSpinner(false)

    }
    else {
      setError(data)
      setSpinner(false)
    }
  }

  // delete Labor Bill
  const DeleteLaborBill = async (billId) => {
    setSpinner(true)
    const response = await fetch(`${host}/api/bill/deleteLaborBill/${billId}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('Jwt_token')
      },
    });
    let data = await response.json();
    if (data.success) {
      getAllLaborBill();
      setError(data.msg);
      setSpinner(false)
    }
    else {
      setError(data)
      setSpinner(false)
    }

  }



  const logInUser = async (contact, password) => {
    const response = await fetch(`${host}/api/auth/loginUser`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contact, password })
    });
    let data = await response.json();

    return data;
  }
  // Log out functionality
  const logOutClick = () => {
    localStorage.removeItem('Jwt_token');
    localStorage.removeItem('user_activeStatus');
    localStorage.removeItem('user_name')

  }


  // Get user By Token
  const GetSingleUser = async () => {
    const response = await fetch(`${host}/api/auth/getUser`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('Jwt_token')
      },
    });
    let data = await response.json();
    if (data.success) {
      return data.result
    }
  }



  return (
    <context.Provider value={{

      members, items, customerItems, finalAmount, recAmount,
      payAmount, selectedCustomer, itemName,
      sellBill, billNumberForNextBtn, discount, spinner, error,
      setItems, getAllItem, AddNewItem, UpdateItem,
      setMembers, getAllMember, AddNewMember, UpdateMember, DeleteMember,
      setDiscount, setSellBill, setItemName,
      setSelectedCustomer, setPayAmount, setRecAmount,
      setFinalAmount, setCustomerItems,
      getAllSellBill, ADDNewSellBill, DeleteSaleBill,
      getAllPurchaseBill, ADDNewPurchaseBill, DeletePurchaseBill,
      getAllTransportBill, ADDNewTransportBill, DeleteTransportBill,
      getAllLaborBill, ADDNewLaborBill, DeleteLaborBill,
      setError, logInUser, logOutClick,
      GetSingleUser

    }}>

      {props.children}
    </context.Provider>
  )
}

export default States

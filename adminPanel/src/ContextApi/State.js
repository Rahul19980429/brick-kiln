import React, { useState } from 'react'
import context from './Context';

const host = "http://localhost:3002"


const States = (props) => {
  //  usestate for sipnner 
  const [spinner, setSpinner] = useState(false)
  // usestate for errors
  const [error, setError] = useState('')

  // // // // // // // // // // //
  // Api calls 
  // // // // // // // // // // //


  // api call to gel all users
  const getAllUser = async () => {
  const response = await fetch(`${host}/api/admin/getallusers`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('Jwt_token')
      },

    });
    let data = await response.json();
    if (data.success) {
      return data
    }
    else {
      setError(data)
    }
  }

  // api call for create New user
  const AddNewUser = async (name,  address, contact, password) => {
    const response = await fetch(`${host}/api/admin/createUser`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('Jwt_token')
      },
      body: JSON.stringify({ name,  address, contact, password})
    });
    let data = await response.json();
    if (data.success) {
      setError(data.msg)
    }
    else {
      setError(data)
    }
  }

  // api call for update Member
  const editActiveStatus = async (Id,bool) => {
    const response = await fetch(`${host}/api/admin/user_active_update/${Id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('Jwt_token')
      },
      body: JSON.stringify({ bool})
    });
    let data = await response.json();
    if (data.success) {
     
      setError(data.msg)

    }
    else {
      setError(data)

    }
  }

  
  // user log in 
  const logInUser = async (contact, password) => {
    const response = await fetch(`${host}/api/admin/loginAdmin`, {
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




  


 
  return (
    <context.Provider value={{

     spinner, error,
     getAllUser, AddNewUser,
      setError, logInUser, logOutClick,
      editActiveStatus
      
    }}>

      {props.children}
    </context.Provider>
  )
}

export default States


import State from "./ContextApi/State"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LogIn from "./AllPages/login/LogIn";
import Menubtn from "./Components/MenuBtn";
import Home from './AllPages/Home'
import CreateUser from "./AllPages/CreateUser";




function App() {
  return (
    <>
      <State>

        <BrowserRouter>
          {/* this is menu Button */}
          <Menubtn />
          <Routes>

            {/*<Home/> */}
            <Route exact path="/" element={<Home />} />

             {/*<CreateUser/> */}
             <Route exact path="/user" element={<CreateUser/>} />

            <Route path="*" element={<Navigate to="/login" />} />

            <Route exact path='/login' element={<LogIn />} />



          </Routes>
        </BrowserRouter>

      </State>
    </>
  );
}

export default App;

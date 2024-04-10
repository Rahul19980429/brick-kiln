
import Sellpage from "./AllPages/SellPageComponent/Sellpage";
import State from "./ContextApi/State"
import Home from './AllPages/Home'
import { BrowserRouter,Route,Routes,Navigate} from "react-router-dom";
import MemberAddPage from "./AllPages/create-item-member/MemberAddPage";
import ItemAddPage from "./AllPages/create-item-member/ItemAddPage";
import BalanceCheckPage from "./AllPages/BalanceCheckPage";
import AllSaleEntryPage from "./AllPages/AllEntries/AllSaleEntryPage";
import Menubtn from "./Components/MenuBtn";
import LogIn from "./AllPages/login/LogIn";
import ItemSaleNumbersCheck from "./AllPages/create-item-member/ItemSaleNumbersCheck";
import Purchasepage from "./AllPages/PurchasePageComponent/Purchasepage";



function App() {
  return (
   <>
   <State>
   
<BrowserRouter>
{/* this is menu Button */}
<Menubtn/>
    <Routes>
      
        {/*<Home/> */}
        <Route exact path="/" element={<Home/>}/>
        {/* <MemberAddPage/> */}
        <Route exact path="/member" element={ <MemberAddPage/>}/>
        {/* <ItemAddPage/> */}
        <Route exact path="/item" element={ <ItemAddPage/>}/>

         {/* <ItemAddPage/> */}
         <Route exact path="/item-sale-numbers" element={ <ItemSaleNumbersCheck/>}/>

        {/* <Sellpage/> */}
        <Route exact path="/sale-bill" element={ <Sellpage btnColor={'primary'}/>}/>

        {/* <Sellpage/> */}
        <Route exact path="/purchase-bill" element={ <Purchasepage btnColor={'success'}/>}/>

        {/* <BalanceCheckPage/> */}
        <Route exact path="/balance-check" element={ <BalanceCheckPage/>}/>
        {/* <AllSaleEntryPage/> */}
        <Route exact path="/sale-bill-check" element={ <AllSaleEntryPage/>}/>
        
       
         <Route path="*" element={<Navigate to="/login" />}/>

         <Route exact path='/login' element={<LogIn/>}/>
        
        
       
   </Routes>
   </BrowserRouter>
   
   </State>
   </>
  );
}

export default App;

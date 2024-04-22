
import State from "./ContextApi/State"
import { BrowserRouter,Route,Routes,Navigate} from "react-router-dom";
import LogIn from "./AllPages/login/LogIn";
import Menubtn from "./Components/MenuBtn";
import Home from './AllPages/Home'
import MemberAddPage from "./AllPages/create-item-member/MemberAddPage";
import ItemAddPage from "./AllPages/create-item-member/ItemAddPage";
import ItemSaleNumbersCheck from "./AllPages/create-item-member/ItemSaleNumbersCheck";
import Purchasepage from "./AllPages/PurchasePageComponent/Purchasepage";
import Sellpage from "./AllPages/SellPageComponent/Sellpage";
import Transportpage from "./AllPages/TransportPageComponent/Transportpage";
import LaborPage from "./AllPages/LaborPageComponent/LaborPage";
import AllSaleEntryPage from "./AllPages/AllEntries/AllSaleEntryPage";
import AllPurchaseEntry from "./AllPages/AllEntries/AllPurchaseEntryPage";
import BalanceCheckPage from "./AllPages/BalanceCheckPage";
import Setting from "./AllPages/Setting";



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
        {/* <Purchasepage/> */}
        <Route exact path="/purchase-bill" element={ <Purchasepage btnColor={'success'}/>}/>

        {/* <Transportpage/> */}
        <Route exact path="/transport-bill" element={ <Transportpage btnColor={'dark'}/>}/>

        {/* <LaborPage/> */}
        <Route exact path="/labor-bill" element={ <LaborPage btnColor={'danger'}/>}/>

        {/* <BalanceCheckPage/> */}
        <Route exact path="/balance-check" element={ <BalanceCheckPage/>}/>
        {/* <AllSaleEntryPage/> */}
        <Route exact path="/sale-bill-check" element={ <AllSaleEntryPage/>}/>

         {/* <AllPurchaseEntry/> */}
         <Route exact path="/purchase-bill-check" element={ <AllPurchaseEntry/>}/>

         
        
        {/* <Setting/> */}
        <Route exact path="/setting" element={ <Setting/>}/>
         <Route path="*" element={<Navigate to="/login" />}/>

         <Route exact path='/login' element={<LogIn/>}/>
        
        
       
   </Routes>
   </BrowserRouter>
   
   </State>
   </>
  );
}

export default App;

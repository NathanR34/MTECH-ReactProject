import { useState } from "react";
import '../App.js'
import { newUser } from '../App.js';


function LogIn() {


    const [userMoney, setUserMoney ] = useState(0)
    const [funds, setFunds] = useState(0)  
  
  
  
    const checkValue = (e) => {
      setFunds(e.target.value + '.00')
      console.log(funds)
    }
    
    const addAmountHandler = (e) => {
      setUserMoney(e.target.previousSibling.value)
      newUser.customerIncome = e.target.previousSibling.value
      console.log(userMoney)
    }
  
    return (
    <div className="int-form">
        {/* <div className="app-info"></div> */}
        <div className="user-info">
            <div className="monthly-income">
                <input placeholder="Enter First Name"></input>
            </div>
            <div className="user-int-funds">
                <p>Add Your Monthly Income Here:</p>
                <div>{funds}</div>
                <input type="number" onChange={checkValue} placeholder="Enter Monthly Income..."></input>
                <button onClick={addAmountHandler}>Add</button>
            </div>
        </div>
        
    </div>
        
    );
  }
  
  export default LogIn;
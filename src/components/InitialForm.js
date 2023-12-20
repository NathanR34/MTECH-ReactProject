//import { useState, useReducer } from "react";
//import '../App.js'
//import { User } from '../App.js';




// function LogIn() {

//   const [userMoney, setUserMoney ] = useState(0)
//   const [funds, setFunds] = useState('')  
//   const [monthlyIncome, setMonthlyIncome] = useState('')
//   const [firstName, setFirstName] = useState('')

//   const checkValue = (e) => {
//     let netWorth = e.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     setFunds(netWorth)
//     console.log(funds)
//   }
  
//   const addUserInfo = (e) => {
//     setUserMoney(e.target.previousSibling.previousSibling.firstChild.nextSibling.value)
//     newUser.customerMoney = e.target.previousSibling.previousSibling.firstChild.nextSibling.value
//     newUser.customerIncome = e.target.previousSibling.firstChild.nextSibling.value
//     e.target.previousSibling.previousSibling.firstChild.nextSibling.value = ""
//     console.log(newUser)
//   }

//   const addMonthlyIncome = (e) => {
//     let income = e.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     setMonthlyIncome(income)
//   }

//   const addFirstName = (e) => {
//     setFirstName(e.target.value)
//     newUser.customerFirstName = e.target.value
//   }



//   return (
//     <div className="user-form">
//       <div>
//         <p>First Name: {firstName}</p>
//         <input type="text" placeholder="Enter First Name..." onChange={addFirstName}></input>
//       </div>
//       <div className="user-int-funds">
//           <div>Current Net Worth: {funds}</div>
//           <input type="number" onChange={checkValue} placeholder="Enter Current Net Worth..."></input>
//       </div>
//       <div>
//         <p>Monthly Income: {monthlyIncome}</p>
//         <input type="number" placeholder="Enter Mothly Income..." onChange={addMonthlyIncome}></input>
//       </div>
//       <button onClick={addUserInfo}>Add</button>
//     </div>

//   );
// }

// export default LogIn;

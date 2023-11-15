import "./App.css";
import LogIn from "./components/InitialForm";
import ModalPopup from "./components/ModalPopup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ExpenseTracker from "./ExpenseTracker";
import { useState } from "react";

export const User = {
  firstName: null,
  cash: null,
  incomeFrequency: "bi-weekly",
  income: null,
  annual: 0,
};

// export const appData = {
//   newUser: newUser,
// };

function App() {
  const [modalDisplay, setModalDisplay] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const showModal = (e) => {
    console.log(e.target)
    setModalDisplay(true)
  }


  return (
    <div className="App">
      <div className="mainContent">
        <header>
            <ul className="mainNav">
              <li>Home</li>
              <li>Budget</li>
              <li>Overview</li>
              <li className="pointer" onClick={showModal} > Login</li>
            </ul>
          <div className="logo">Budget App</div>{" "}
        </header>
        <ModalPopup 
          displayModal = {modalDisplay}
          setDisplayModal = {setModalDisplay}
          setLogIn ={setIsLoggedIn}
        />
        <ExpenseTracker
          loggedIn={isLoggedIn}
          setLogIn ={setIsLoggedIn}
        />
      </div>
    </div>
  );
}

export default App;

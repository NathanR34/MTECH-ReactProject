"use client";
import ExpenseTracker from "./ExpenseTracker";
import { useState } from "react";
import BudgetPage from './components/BudgetSetting'
import ModalPopup from './components/ModalPopup'
import NavBar from './components/NavBar'

export const User = {
  firstName: null,
  cash: null,
  incomeFrequency: "bi-weekly",
  income: null,
  annual: 0,
};

export default function App() {
  const [modalDisplay, setModalDisplay] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [pageSelect, setPageSelect] = useState('home')
  const [historyArr, setHistoryArr] = useState([])

  const addTransaction = (newTran) => {
    setHistoryArr([...historyArr, newTran]);
  };


  const showModal = (e) => {
    console.log(e.target)
    setModalDisplay(true)
  }


  return (
    
    <div className="App">
      <div className="mainContent">
      <NavBar
        setPageSelect = {setPageSelect}
      />
        <header>
            {/* <ul className="mainNav">
              <li onClick={() => setPageSelect('home')}>Home</li>
              <li onClick={() => setPageSelect('budget')} >Budget</li>
              <li>Overview</li>
              {(isLoggedIn) ? (
               null
              ) :  <li className="pointer" onClick={showModal} > Login</li>}
              
            </ul> */}
          <div className="logo">Budget App</div>{" "}
        </header>
        <ModalPopup 
          displayModal = {modalDisplay}
          setDisplayModal = {setModalDisplay}
          setIsLoggedIn ={setIsLoggedIn}
        />
        {(pageSelect === 'home') ? (
            <ExpenseTracker
            key="expensetracker"
            loggedIn={isLoggedIn}
            setLogIn ={setIsLoggedIn}
            historyArr={historyArr}
            addTransaction={addTransaction}
            />
          ) : null}
        {(pageSelect === 'budget') ? (
          <BudgetPage
          key="budgetpage"
          loggedIn={isLoggedIn}
          />
        ) : null}
      </div>
    </div>
  );
}

import "./App.css";
import LogIn from "./components/InitialForm";
import ModalPopup from "./components/ModalPopup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ExpenseTracker from "./ExpenseTracker";
import { useState } from "react";
import BudgetPage from './components/BudgetSetting'


export const User = {
  firstName: null,
  cash: null,
  incomeFrequency: "bi-weekly",
  income: null,
  annual: 0,
};

function App() {
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
        <header>
            <ul className="mainNav">
              <li onClick={() => setPageSelect('home')}>Home</li>
              <li onClick={() => setPageSelect('budget')} >Budget</li>
              <li>Overview</li>
              {(isLoggedIn) ? (
               null
              ) :  <li className="pointer" onClick={showModal} > Login</li>}
              
            </ul>
          <div className="logo">Budget App</div>{" "}
        </header>
        <ModalPopup 
          displayModal = {modalDisplay}
          setDisplayModal = {setModalDisplay}
          setLogIn ={setIsLoggedIn}
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

export default App;

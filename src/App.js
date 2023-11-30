"use client";
import Navbar from "./components/NavBar";
import ExpenseTracker from "./ExpenseTracker";
import { useEffect, useState, useContext, createContext } from "react";
import BudgetPage from './components/BudgetSetting'
import ModalPopup from './components/ModalPopup'
import NavBar from './components/NavBar'
import {UseTime} from './util/time'
import { getDate } from "./util/time";
import ExpectedSavings from "./components/ExpectedSavings";
import { SavingsProvider } from "./components/Slider";

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
  const [upcomingPaycheck, setUpcomingPaycheck] = useState(false)
  const [nextPaycheckDayObj, setNextPaycheckDay] = useState(false)
  const [projectedSavings, setProjectedSavings] = useState(null)
  const [availableSpending, setAvailableSpending] = useState(null)


  UseTime()

  const addTransaction = (newTran) => {
    setHistoryArr([...historyArr, newTran]);
  };


  let updatingDate = UseTime()

  useEffect(() => {
        console.log(nextPaycheckDayObj[0], nextPaycheckDayObj[1] )
        const addPaycheck = () => {
          if(upcomingPaycheck === true){
            if (updatingDate.second === 23){
                const newTran = {
                    title: 'Paycheck',
                    amount: User.income,
                    date: getDate()
                  };
                  User.cash = Number(User.cash) + Number(newTran.amount)
                  addTransaction(newTran);
                  setUpcomingPaycheck(false)
            }
          }
        }
        
        if (updatingDate.date === nextPaycheckDayObj[0] && updatingDate.month === nextPaycheckDayObj[1]){
          addPaycheck()

        }
        console.log(nextPaycheckDayObj)
}, [updatingDate])


  const showModal = (e) => {
    console.log(e.target);
    setModalDisplay(true);
  };

  return (
    <SavingsProvider>
      <div className="App">
        <NavBar setPageSelect={setPageSelect} />
        <div className="mainContent">
          <ModalPopup
            displayModal={modalDisplay}
            setDisplayModal={setModalDisplay}
            setIsLoggedIn={setIsLoggedIn}
          />
          {pageSelect === "home" ? (
            <ExpenseTracker
              key="expensetracker"
              loggedIn={isLoggedIn}
              setLogIn={setIsLoggedIn}
              historyArr={historyArr}
              addTransaction={addTransaction}
              availableSpending={availableSpending}
              setAvailableSpending={setAvailableSpending}
            />
          ) : null}
          {pageSelect === "budget" ? (
            <BudgetPage 
              key="budgetpage" 
              loggedIn={isLoggedIn}
              addTransaction={addTransaction}
              UseTime={UseTime}
              upcomingPaycheck={upcomingPaycheck}
              setUpcomingPaycheck={setUpcomingPaycheck}
              nextPaycheckDayObj={nextPaycheckDayObj}
              setNextPaycheckDay={setNextPaycheckDay}
              setProjectedSavings={setProjectedSavings}
              projectedSavings={projectedSavings}
              setAvailableSpending={setAvailableSpending}
            />
          ) : null}
          {}
          {pageSelect === 'overview' ? (
            <ExpectedSavings 
              projectedSavings={projectedSavings}
              availableSpending={availableSpending}
            />
          ) : null}
          {/* <DateTime /> */}
        </div>
      </div>
    </SavingsProvider>
  );
}

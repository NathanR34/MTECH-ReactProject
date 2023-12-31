"use client";
import ExpenseTracker from "./ExpenseTracker";
import {
  useEffect,
  useState,
  useContext,
  createContext,
  useCallback,
} from "react";
import BudgetPage from "./components/BudgetSetting";
import ModalPopup from "./components/ModalPopup";
import NavBar from "./components/NavBar";
import * as React from "react";
import { UseTime } from "./util/time";
import { getDate } from "./util/time";
import ExpectedSavings from "./components/ExpectedSavings";
import { SavingsProvider } from "./components/Slider";
//import DiscreteSlider from './components/Slider'
//import FullHistory from "./components/canvas/FullHistory";
import { Global } from "./util/Global";
import { User, Profile } from "./util/User";

export const UserInfo = {
  firstName: null,
  cash: null,
  incomeFrequency: "bi-weekly",
  income: null,
  annual: 0,
};

const MonthlyContext = createContext();

export const MonthlyContextProvider = ({ children }) => {
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);

  return (
    <MonthlyContext.Provider
      value={{
        monthlyExpenses,
        setMonthlyExpenses,
        monthlyIncome,
        setMonthlyIncome,
      }}
    >
      {children}
    </MonthlyContext.Provider>
  );
};

export const useMonthlyContext = () => {
  return useContext(MonthlyContext);
};

export default function App() {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pageSelect, setPageSelect] = useState("home");
  const [historyArr, setHistoryArr] = useState([]);
  const [upcomingPaycheck, setUpcomingPaycheck] = useState(false);
  const [nextPaycheckDayObj, setNextPaycheckDay] = useState(false);
  const [projectedSavings, setProjectedSavings] = useState(UserInfo.income * (30 * 0.01));
  const [savingsRatio, setSavingsRatio] = useState(0.3);
  const [availableSpending, setAvailableSpending] = useState((UserInfo.income - projectedSavings) * 2);
  const [moneySpent, setMoneySpent] = useState(0)

  // if(projectedSavings === null) {
  //   setProjectedSavings(User.income * (30 * 0.01))
  // }
  // useEffect(() => {
  //   console.log('income', UserInfo.income, 'projected savings', projectedSavings)
  // })
  UseTime();

  const addTransaction = useCallback((newTran) => {
    setHistoryArr((prevHistory) => [...prevHistory, newTran]);
  }, []);

  let updatingDate = UseTime();

  useEffect(() => {
    const addPaycheck = () => {
      if (upcomingPaycheck === true) {
        if (updatingDate.second === 23) {
          const newTran = {
            title: "Paycheck",
            amount: UserInfo.income,
            date: getDate(),
          };
          UserInfo.cash = Number(UserInfo.cash) + Number(newTran.amount);
          addTransaction(newTran);
          setUpcomingPaycheck(false);
        }
      }
    };

    if (
      updatingDate.date === nextPaycheckDayObj[0] &&
      updatingDate.month === nextPaycheckDayObj[1]
    ) {
      addPaycheck();
    }
  }, [updatingDate, addTransaction, nextPaycheckDayObj, upcomingPaycheck]);

  return (
    <Global>
      <User>
        <Profile>
          <SavingsProvider>
            <MonthlyContextProvider>
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
                      moneySpent = {moneySpent}
                      setMoneySpent ={setMoneySpent}
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
                      setSavingsRatio={setSavingsRatio}
                      projectedSavings={projectedSavings}
                      setAvailableSpending={setAvailableSpending}
                    />
                  ) : null}
                  {}
                  {pageSelect === "overview" ? (
                    <>
                      <ExpectedSavings
                        projectedSavings={projectedSavings}
                        availableSpending={availableSpending}
                        moneySpent = {moneySpent}
                        historyArr = {historyArr}
                        savingsRatio = {savingsRatio}
                      />
                      {/* <div className="full-history-container">                
                        <FullHistory
                          historyArr={historyArr}
                        />
                      </div> */}

                    </>

                  ) : null}
                  {/* <DateTime /> */}
                </div>
              </div>
            </MonthlyContextProvider>
          </SavingsProvider>
        </Profile>
      </User>
    </Global>
  );
}

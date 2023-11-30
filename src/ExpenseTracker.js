import { User } from "./App";
import History from "./components/history";
import NewTransaction from "./components/NewTransaction";
import Paper from "@mui/material/Paper";

export default function ExpenseTracker({
  loggedIn,
  historyArr,
  addTransaction,
  availableSpending,
  setAvailableSpending
}) {
  const addCommaToNumbers = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (loggedIn) {
    return (
      <div className="mainPage">
        <Paper className=" expensePaper" elevation={5}>
          <div className="row w-full">
            <h1> Welcome {User.firstName} </h1>
            <div className="balance">
              <h3>YOUR BALANCE</h3>
              <h2>&#36;{addCommaToNumbers(User.cash)}.00</h2>
            </div>
          </div>
          <div className="row w-full income-expense-container">
            <div>Income: {addCommaToNumbers(User.income)} </div>
            <div>Expense: 0</div>
          </div>
          <div className="row w-full">
            <NewTransaction
              key="newtransaction"
              availableSpending={availableSpending}
              addTransaction={addTransaction}
              setAvailableSpending={setAvailableSpending}
            />
          </div>
        </Paper>
        <Paper sx={{ borderRadius: 5 }} className="historyPaper" elevation={5}>
          {" "}
          <History key="history" historyArr={historyArr} />
        </Paper>
      </div>
    );
  }
  return <h1>Please Log In</h1>;
}
// export default function ExpenseTracker({loggedIn, historyArr, addTransaction}) {

//     const addCommaToNumbers = (x) => {
//         return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     }

//     if (loggedIn){
//         return(
//             <div className='expense-tracker-container'>
//                 <div> Welcome {User.firstName} </div>
//                 <div className='balance'>
//                     <h3>YOUR BALANCE</h3>
//                     <h2>&#36;{addCommaToNumbers(User.cash)}.00</h2>
//                 </div>
//                 <div className='income-expense-container'>
//                     <div>Income: {addCommaToNumbers(User.income)} </div>
//                     <div>Expense: 0</div>
//                 </div>
//                 <History
//                     key="history"
//                     historyArr = {historyArr}
//                 />
//                 <NewTransaction
//                 key = "newtransaction"
//                     addTransaction={addTransaction}
//                 />
//             </div>
//         )
//     }
//     return (
//         <h1>Please Log In</h1>
//     )
// }

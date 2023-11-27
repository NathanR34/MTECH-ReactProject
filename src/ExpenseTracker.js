import { User } from "./App";
import History from "./components/history";
import NewTransaction from "./components/NewTransaction";
import Paper from "@mui/material/Paper";

export default function ExpenseTracker({
  loggedIn,
  historyArr,
  addTransaction,
}) {
  const addCommaToNumbers = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (loggedIn) {
    return (
      <div className="mainPage">
        <Paper className="expensePaper" elevation={5}>
          <div className="row">
            <h1> Welcome {User.firstName} </h1>
            <div className="balance">
              <h3>YOUR BALANCE</h3>
              <h2>&#36;{addCommaToNumbers(User.cash)}.00</h2>
            </div>
          </div>
          <div className="row income-expense-container">
            <div>Income:&nbsp; {addCommaToNumbers(User.income)} </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div>Expense:&nbsp; 0</div>
          </div>
          <div className="row">
            <NewTransaction
              key="newtransaction"
              addTransaction={addTransaction}
            />
          </div>
        </Paper>
        <Paper sx={{ borderRadius: 5 }} className="historyPaper" elevation={5}>
          <History key="history" historyArr={historyArr} />{" "}
        </Paper>
      </div>
    );
  }
  return <h1>Please Log In</h1>;
}

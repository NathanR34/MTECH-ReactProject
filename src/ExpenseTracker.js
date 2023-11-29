import { User } from "./App";
import History from "./components/history";
import NewTransaction from "./components/NewTransaction";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";

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
            <Card className="incomeExpense flex" variant="outlined">
              <h4>Income</h4>
              <p className="green">+$ {addCommaToNumbers(User.income)}</p>{" "}
            </Card>
            <Card className="incomeExpense flex" variant="outlined">
              <h4>Expense</h4>
              <p className="red"> -$ &nbsp; 0</p>
            </Card>
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

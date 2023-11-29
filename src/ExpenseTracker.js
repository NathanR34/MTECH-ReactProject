import { User } from "./App";
import History from "./components/history";
import NewTransaction from "./components/NewTransaction";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import { grey } from "@mui/material/colors";

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
        <Paper
          className="expensePaper"
          sx={{ bgcolor: grey[50] }}
          elevation={5}
        >
          <div className="row">
            <h1> Welcome {User.firstName} </h1>
            <Card
              elevation={2}
              raised
              className="balance flex"
              variant="outlined"
            >
              <h3>YOUR BALANCE</h3>
              <h2>&#36;{addCommaToNumbers(User.cash)}.00</h2>
            </Card>
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
            <Paper
              sx={{ borderRadius: 5 }}
              className="historyPaper"
              elevation={5}
            >
              <History key="history" historyArr={historyArr} />{" "}
            </Paper>
          </div>
          <div className="row">
            <NewTransaction
              key="newtransaction"
              addTransaction={addTransaction}
            />
          </div>
        </Paper>
      </div>
    );
  }
  return <h1>Please Log In</h1>;
}

import { User } from "./App";
import History from "./components/history";
import NewTransaction from "./components/NewTransaction";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import { grey } from "@mui/material/colors";
import { useMonthlyContext } from './App';




export default function ExpenseTracker({
  loggedIn,
  historyArr,
  addTransaction,
  availableSpending,
  setAvailableSpending,
  moneySpent,
  setMoneySpent
}) {

  const { monthlyExpenses, setMonthlyExpenses, monthlyIncome, setMonthlyIncome } = useMonthlyContext();


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
          <div className="row top">
            <h1> Welcome {User.firstName} </h1>
            <Card className="balance flex" variant="outlined">
              <h3>YOUR BALANCE</h3>
              <h2>&#36;{addCommaToNumbers(User.cash)}.00</h2>
            </Card>
          </div>
          <div className="row income-expense-container">
            <Card className="incomeExpense flex" variant="outlined">
              <h4>Income</h4>
              <p className="green">+$ {addCommaToNumbers(monthlyIncome)}</p>{" "}
            </Card>
            <Card className="incomeExpense flex" variant="outlined">
              <h4>Expense</h4>
              <p className="red"> -$ &nbsp; {monthlyExpenses}</p>
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
              availableSpending={availableSpending}
              addTransaction={addTransaction}
              setAvailableSpending={setAvailableSpending}
              setMonthlyExpenses={setMonthlyExpenses}
              monthlyExpenses={monthlyExpenses}
              monthlyIncome={monthlyIncome}
              setMonthlyIncome={setMonthlyIncome}
              moneySpent = {moneySpent}
              setMoneySpent ={setMoneySpent}
            />
          </div>
        </Paper>
      </div>
    );
  }
  return <h1>Please Log In</h1>;
}
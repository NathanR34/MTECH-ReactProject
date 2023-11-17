import { useState } from "react";
import { User } from "./App";
import History from "./components/history";
import NewTransaction from "./components/NewTransaction";
import Paper from "@mui/material/Paper";

// import NewTransaction from "./components/NewTransaction";

export default function ExpenseTracker() {
  const [historyArr, setHistoryArr] = useState([]);

  const addTransaction = (newTran) => {
    setHistoryArr([...historyArr, newTran]);
  };

  return (
    <Paper className="w-1/4 h-1/2 flex-col justify-center" elevation={3}>
      <div className="row w-full">
        <h1> Welcome {User.firstName} </h1>
        <div className="balance">
          <h3>YOUR BALANCE</h3>
          <h2>&#36;{User.cash}.00</h2>
        </div>
      </div>
      <div className="row w-full">
        <div className="income-expense-container">
          <div>Income: {User.income} </div>
          <div>Expense: 0</div>
        </div>
      </div>
      <div className="row w-full">
        <History historyArr={historyArr} />
        <NewTransaction addTransaction={addTransaction} />
      </div>
    </Paper>
  );
}

import { User } from "../App";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useRef, useState } from "react";

export default function NewTransaction({ addTransaction }) {
  let expenseIncomeHandler = null;
  let checkboxValidation = false;
  const [open, setOpen] = useState(false);
  const title = useRef(null);
  const amount = useRef(null);
  const addIncomeAmount = () => {
    console.log(User.income);
  };

  const checkboxHandler = () => {
    const expense = document.querySelector(".expenseCB");
    const income = document.querySelector(".incomeCB");

    if (expense.checked === true) {
      expenseIncomeHandler = "subtract";
      income.checked = false;
    }
    if (income.checked === true) {
      expenseIncomeHandler = "add";
      expense.checked = false;
    }
    if (income.checked === true || expense.checked === true) {
      checkboxValidation = true;
    }
  };

  const handleExpense = (e) => {
    document.querySelector(".incomeCB").checked = false;
  };
  const handleIncome = (e) => {
    document.querySelector(".expenseCB").checked = false;
  };
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const addNewTransaction = () => {
    addIncomeAmount();
    checkboxHandler();
    if (checkboxValidation === false) {
      return handleClick();
    }

    if (title && amount) {
      const newTran = {
        title: title.current.value,
        amount: amount.current.value,
      };
      title.current.value = "";
      amount.current.value = "";
      addTransaction(newTran);
      if (expenseIncomeHandler === "add") {
        User.cash = Number(User.cash) + Number(newTran.amount);
        // User.income = Number(User.cash) + User.income;
      } else if (expenseIncomeHandler === "subtract") {
        User.cash = User.cash - newTran.amount;
      }
    } else {
      handleClick();
    }
  };

  return (
    <>
      <div className="new-transaction">
        <TextField
          className="transaction-label transactionItem"
          inputRef={title}
          id="standard-basic"
          label="Text"
          variant="standard"
        />
        <TextField
          className="transaction-amount transactionItem"
          inputRef={amount}
          id="standard-number"
          label="Amount"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
        <p>Select:</p>
        <div className="flex justify-around">
          <label for="expenseCD"> Expense:</label>
          <input
            type="checkbox"
            defaultChecked={true}
            className="expenseCB"
            onClick={handleExpense}
          />
          <label for="incomeCD"> Income</label>
          <input type="checkbox" className="incomeCB" onClick={handleIncome} />
        </div>
        <Button
          sx={{ color: purple[900], bgcolor: purple[200] }}
          onClick={addNewTransaction}
        >
          {" "}
          Add
        </Button>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Please check if the form is filled out!
        </Alert>
      </Snackbar>
    </>
  );
}

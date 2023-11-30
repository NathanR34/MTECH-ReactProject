import { User } from "../App";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useRef, useState } from "react";
import { getDate } from "../util/time";

export default function NewTransaction({
  addTransaction,
  availableSpending,
  setAvailableSpending,
  setMonthlyIncome,
  monthlyIncome,
  setMonthlyExpenses,
  monthlyExpenses
}) {
  let expenseIncomeHandler = null;
  let checkboxValidation = false;
  const [open, setOpen] = useState(false);
  const title = useRef(null);
  const amount = useRef(null);
  let transactionType = 'expense'



  const checkboxHandler = () => {
    const expense = document.querySelector(".expenseCB");
    const income = document.querySelector(".incomeCB");

    if (expense.checked === true) {
      expenseIncomeHandler = "subtract";
      transactionType ='expense'
      income.checked = false;
    }
    if (income.checked === true) {
      expenseIncomeHandler = "add";
      transactionType = 'income'
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
    // addIncomeAmount();
    checkboxHandler();
    if (checkboxValidation === false) {
      return handleClick();
    }


    if (title.current.value && amount.current.value) {
      const newTran = {
        title: title.current.value,
        amount: amount.current.value,
        date: getDate(),
        type: transactionType,
      };
      title.current.value = "";
      amount.current.value = "";
      addTransaction(newTran);
      if (expenseIncomeHandler === "add") {
        User.cash = Number(User.cash) + Number(newTran.amount);
        setMonthlyIncome(Number(monthlyIncome) + Number(newTran.amount))
      } else if (expenseIncomeHandler === "subtract") {
        setMonthlyExpenses(Number(monthlyExpenses) + Number(newTran.amount))
        User.cash = User.cash - newTran.amount;
        setAvailableSpending(availableSpending - newTran.amount)
      }
      console.log(newTran)
    } else {
      handleClick();
    }
  };


  const handleInput = (event) => {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/^-/, '');
    event.target.value = sanitizedValue;
  };


  return (
    <>
      <div className="new-transaction">
        <div>
          <TextField
            className="transaction-label transactionItem"
            inputRef={title}
            id="standard-basic"
            label="Text"
            variant="standard"
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <TextField
            className="transaction-amount transactionItem"
            inputRef={amount}
            id="standard-number"
            label="Amount"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ min: "0" }}
          onInput={handleInput}
          variant="standard"
          />
        </div>
        <div>
          <p>Select:</p>
          <div className="flex justify-around">
            <label for="expenseCD"> Expense:</label>
            <input
              type="checkbox"
              defaultChecked={true}
              className="expenseCB"
              onClick={handleExpense}
            />
            &nbsp;&nbsp;
            <label for="incomeCD"> Income</label>
            <input
              type="checkbox"
              className="incomeCB"
              onClick={handleIncome}
            />{" "}
            <Button
              className="ml-5"
              sx={{ color: purple[900], bgcolor: purple[200] }}
              onClick={addNewTransaction}
            >
              {" "}
              Add
            </Button>
          </div>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Please check if the form is filled out!
        </Alert>
      </Snackbar>
    </>
  );
}

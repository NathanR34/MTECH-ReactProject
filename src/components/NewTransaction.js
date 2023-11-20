import { User } from "../App";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import { useRef } from "react";
export default function NewTransaction({ addTransaction }) {
  let expenseIncomeHandler = null;
  let checkboxValidation = false;

  const title = useRef(null);
  const amount = useRef(null);
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

  const addNewTransaction = () => {
    checkboxHandler();
    if (checkboxValidation === false) {
      return alert("please choose between expense and income");
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
      } else if (expenseIncomeHandler === "subtract") {
        User.cash = User.cash - newTran.amount;
      }
    } else {
      alert("Please put a title and amount for your transaction");
    }
  };

  return (
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
  );
}
/*
import {User} from '../App'

export default function NewTransaction({addTransaction}){

    let expenseIncomeHandler = null
    let checkboxValidation = false

    
    const checkboxHandler = () => {
        const expense = document.querySelector('.expenseCB');
        const income = document.querySelector('.incomeCB');
        

        if (expense.checked === true){
            expenseIncomeHandler = 'subtract' 
            income.checked = false
        }
        if (income.checked === true){
            expenseIncomeHandler = 'add'
            expense.checked = false
        }
        if(income.checked === true || expense.checked === true ){
            checkboxValidation = true 
        }
    }

     const handleExpense = (e) => {
        document.querySelector('.incomeCB').checked = false
    }
    const handleIncome = (e) => {
        document.querySelector('.expenseCB').checked = false
    }

    const addNewTransaction = () => {
        checkboxHandler()
        if(checkboxValidation === false){
            return alert('please choose between expense and income')
        }
        const title = document.querySelector('.transaction-label').value
        const amount = document.querySelector('.transaction-amount').value
        if(title && amount){
            const newTran = {
                title: title,
                amount: amount
            }
            document.querySelector('.transaction-label').value = ""
            document.querySelector('.transaction-amount').value = ""
            addTransaction(newTran)
            if (expenseIncomeHandler === 'add'){
                User.cash = Number(User.cash) + Number(newTran.amount) 
            }
            else if (expenseIncomeHandler === 'subtract'){
                User.cash = User.cash - newTran.amount 
            }
        }
        else {
            alert('Please put a title and amount for your transaction')
        }

    }

    return (
        <div className='new-transaction'>
            <label>Text</label>
            <input className='transaction-label'></input>
            <label>Amount</label>
            <input className='transaction-amount' type="number"></input>
            
            <div>
                <p>Select Expense or Income</p>
                <input type='checkbox' className='expenseCB' onClick={handleExpense}  />Expense
                <input type='checkbox' className='incomeCB' onClick={handleIncome} />Income
            </div>
            <button onClick={addNewTransaction}>Add</button>
        </div>
    )
}
 */

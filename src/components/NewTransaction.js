import {User} from '../App'

export default function NewTransaction({addTransaction}){

    let expenseIncomeHandler = null
    

    const handler = () => {
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
    }

    const checkboxHandler = () => {
        const expense = document.querySelector('.expenseCB');
        const income = document.querySelector('.incomeCB');
        if (expense.checked === true){
            income.checked = false
        }
        if (income.checked === true){
            expense.checked = false
        }
    }

     const handleExpense = (e) => {
        e.target.nextSibling.nextSibling.checked = false
    }
    const handleIncome = (e) => {
        e.target.previousSibling.previousSibling.checked = false
    }

    const addNewTransaction = (e) => {
        handler()

        const title = e.target.previousSibling.previousSibling.previousSibling.previousSibling.value
        const amount = e.target.previousSibling.previousSibling.value
        if(title && amount){
            const newTran = {
                title: title,
                amount: amount
            }
            e.target.previousSibling.previousSibling.previousSibling.previousSibling.value = ""
            e.target.previousSibling.previousSibling.value = ""
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

        console.log(expenseIncomeHandler)
    }

    return (
        <div className='new-transaction'>
            <label>Text</label>
            <input></input>
            <label>Amount</label>
            <input type="number"></input>
            
            <div>
                <p>Select Expense or Income</p>
                <input type='checkbox' className='expenseCB' onClick={handleExpense}  />Expense
                <input type='checkbox' className='incomeCB' onClick={handleIncome} />Income
            </div>
            <button onClick={addNewTransaction}>Add</button>
        </div>
    )
}
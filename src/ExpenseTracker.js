import {User} from './App'
import { useState } from 'react'
import History from './components/history'
import NewTransaction from './components/NewTransaction'




export default function ExpenseTracker({loggedIn, historyArr, addTransaction}) {

    

    

    const addCommaToNumbers = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    if (loggedIn){
        return(
            <div className='expense-tracker-container'>
                <div> Welcome {User.firstName} </div>
                <div className='balance'>
                    <h3>YOUR BALANCE</h3>
                    <h2>&#36;{addCommaToNumbers(User.cash)}.00</h2>
                </div>
                <div className='income-expense-container'> 
                    <div>Income: {addCommaToNumbers(User.income)} </div>
                    <div>Expense: 0</div>
                </div>
                <History
                    key="history"
                    historyArr = {historyArr}
                />
                <NewTransaction
                key = "newtransaction"
                    addTransaction={addTransaction}
                />
            </div>
        )
    }
    return (
        <h1>Please Log In</h1>
    )
}


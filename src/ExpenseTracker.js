import {User} from './App'
import History from './components/history'
import NewTransaction from './components/NewTransaction'
export const historyArr = []




export default function ExpenseTracker(loggedIn) {


    if (loggedIn.loggedIn){
        return(
            <div className='expense-tracker-container'>
                <div> Welcome {User.firstName} </div>
                <div className='balance'>
                    <h3>YOUR BALANCE</h3>
                    <h2>&#36;{User.cash}.00</h2>
                </div>
                <div className='income-expense-container'> 
                    <div>Income: {User.income} </div>
                    <div>Expense: 0</div>
                </div>
                <History />
                <NewTransaction />
            </div>
        )
    }
    return (
        <h1>Please Log In</h1>
    )
}


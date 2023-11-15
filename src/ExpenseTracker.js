import {User} from './App'




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
                <div className='spending-history'>
                    <h2>History:</h2>
                    <ul>
                        <li>Flower</li>
                        <li>Salary</li>
                        <li>Book</li>
                        <li>Camera</li>
                    </ul>
                </div>
                <div className='new-transaction'>
                    <label>Text</label>
                    <input></input>
                    <label>Amount</label>
                    <input></input>
                </div>
            </div>
        )
    }
    return (
        <h1>Please Log In</h1>
    )
}


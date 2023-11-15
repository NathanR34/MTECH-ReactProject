import {User} from './App'




export default function ExpenseTracker(loggedIn) {


    if (loggedIn.loggedIn){
        return(
            <div className='expense-tracker-container'>
                <div className='balance'>
                    <h3>YOUR BALANCE</h3>
                    <h2>&#36;{User.cash}.00</h2>
                </div>
            </div>
        )
    }
    return (
        <div>Please Log In</div>
    )
}


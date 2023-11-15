import {historyArr} from "../ExpenseTracker"


export default function NewTransaction(){

    

    const addTransaction = () => {
        console.log(historyArr)
    }

    return (
        <div className='new-transaction'>
            <label>Text</label>
            <input></input>
            <label>Amount</label>
            <input></input>
            <button onClick={addTransaction} ></button>
        </div>
    )
}
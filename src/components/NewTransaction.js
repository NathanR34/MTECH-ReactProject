// import {historyArr} from "../ExpenseTracker"


export default function NewTransaction({addTransaction}){

    

    const addNewTransaction = (e) => {
        const newTran = {
            title: e.target.previousSibling.previousSibling.previousSibling.value,
            amount: e.target.previousSibling.value
        }
        e.target.previousSibling.previousSibling.previousSibling.value = ""
        e.target.previousSibling.value = ""
        // historyArr.push(newTran)
        addTransaction(newTran)
    }

    return (
        <div className='new-transaction'>
            <label>Text</label>
            <input></input>
            <label>Amount</label>
            <input type="number"></input>
            <button onClick={addNewTransaction} ></button>
        </div>
    )
}
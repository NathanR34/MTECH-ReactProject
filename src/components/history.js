// import {historyArr} from "../ExpenseTracker"


export default function History({historyArr}){

    console.log(historyArr)    
    // if(historyArr !== []){
    //     return(
    //         <div>No history yet, please add some transactions to see it here.</div>
    //     )
    // }

    return (
        <div className='spending-history'>
        <h2>History:</h2>
        <ul>
            {historyArr.map((tran, index) => (
                <li key={index} >{tran.title}: {tran.amount}</li>
            ))}
        </ul>
    </div>
    )
}

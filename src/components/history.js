// import {historyArr} from "../ExpenseTracker"


export default function History({historyArr}){
    
    // if(historyArr !== []){
    //     return(
    //         <div>No history yet, please add some transactions to see it here.</div>
    //     )
    // }

    const historyOverview = historyArr.slice(-4)

    console.log()

    // console.log(historyArr[historyArr.length - 1])
    // historyArr = ([historyArr[historyArr.length - 1]])
    

    return (
        <div className='spending-history'>
        <h2>History:</h2>
        <ul>
            {historyOverview.map((tran, index) => (
                <li key={index} >{tran.title}: {tran.amount}</li>
            ))}
        </ul>
    </div>
    )
}

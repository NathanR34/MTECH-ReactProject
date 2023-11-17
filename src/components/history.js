// import {historyArr} from "../ExpenseTracker"


export default function History({historyArr}){

    
    const historyOverview = historyArr.slice(-4)

    // console.log(historyArr[historyArr.length - 1])
    // historyArr = ([historyArr[historyArr.length - 1]])
    const addCommaToNumbers = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className='spending-history'>
        <h2>History:</h2>
        <ul>
            {historyOverview.map((tran, index) => (
                <li key={index} >{tran.title}: { addCommaToNumbers(tran.amount)}</li>
            ))}
        </ul>
    </div>
    )
}

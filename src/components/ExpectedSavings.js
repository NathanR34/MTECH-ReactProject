import { User } from "../App"


export default function ExpectedSavings({projectedSavings, availableSpending}){

    

    return(
        <>
        <div> Projected Savings This Month:{Math.floor(projectedSavings * 2)} </div>
        <div> Projected Savings This Week: {Math.floor(projectedSavings/2)} </div>
        <div> Spending Left For This Month: {Math.floor(availableSpending)} </div>
        <div> Spening Left For This Week: {Math.floor(availableSpending/4)} </div>
        </>
    )

}
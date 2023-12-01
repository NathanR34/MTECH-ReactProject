import { User } from "../App"

export default function ExpectedSavings({projectedSavings, availableSpending}){



    return(
        <>
        {projectedSavings === 0 ? (
            <div> Projected Savings This Month:{(User.income * (30 * 0.01)) * 2} </div>
        ) : <div> Projected Savings This Month:{Math.floor(projectedSavings * 2)} </div>}

        {projectedSavings === 0 ? (
            <div> Projected Savings This Week:{(User.income * (30 * 0.01))/ 2} </div>
        ) : <div> Projected Savings This Week:{Math.floor(projectedSavings/2 )} </div>}

        
        {availableSpending === 0 ? (
            <div> Spending Left For This Month: {User.income * 2 - (User.income * (30 * 0.01)) * 2} </div>
        ) : <div> Spending Left For This Month: {Math.floor(availableSpending)} </div> }


        {availableSpending === 0 ? (
            <div> Spening Left For This Week: {(User.income - (User.income * (30 * 0.01))) / 2} </div>
        ): <div> Spening Left For This Week: {Math.floor(availableSpending/4)} </div> }
        
        


        
        </>
    )

}
import { User } from "../App"


export default function ExpectedSavings({projectedSavings}){



    return(
        <>
        <div> Projected Savings This Month:{Math.floor(projectedSavings * 2)} </div>
        <div> Spending Left For This Month: {Math.floor((User.income - projectedSavings) * 2)} </div>
        </>
    )

}
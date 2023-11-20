import {User} from '../App'

const BudgetPage = (loggedIn) => {

    const paycheckSelection = (e) => {
        console.log(e.target.value)
    }

    
    if (loggedIn.loggedIn){
    return(
        <div className="budget-container">
            <div>Personalize Your Budget Here</div>
            {(User.incomeFrequency === 'bi-weekly') ? (
                <div>
                    <p>When did you last get paid: </p> 
                    <input onSelect={paycheckSelection} type="date" /> </div>
            ) : null}
           

        </div>
    )}
    
    return(
        <h1>Please Log In</h1>
    )

}

export default BudgetPage
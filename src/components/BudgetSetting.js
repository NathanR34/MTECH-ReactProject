import {User} from '../App'
import {DateTime} from '../App'
import { useState, useEffect } from 'react'
import {useTime} from '../util/time'



const BudgetPage = (loggedIn) => {


    let updatingDate = useTime()
    const todaysDate = new Date().toISOString().split('T')[0]
    const [upcomingPaycheck, setUpcomingPaycheck] = useState(false)

    const paycheckSelection = (e) => {
        let paycheckDate = e.target.value;
        let numWeeks = 2
        paycheckDate = new Date(paycheckDate)
        paycheckDate.setDate(paycheckDate.getDate() + numWeeks * 7)
        let nextPaycheckDay = paycheckDate.getDate() + 1
        let nextPaycheckMonth = paycheckDate.getMonth() + 1;
        
        if(User.incomeFrequency === 'bi-weekly'){
            
            if(updatingDate.month === nextPaycheckMonth && updatingDate.date + 1 === nextPaycheckDay){
                setUpcomingPaycheck(true)
                paycheckDate.setDate(paycheckDate.getDate() + numWeeks * 7)
                nextPaycheckDay = paycheckDate.getDate() + 1
                nextPaycheckMonth = paycheckDate.getMonth() + 1;
            }
            else(
                setUpcomingPaycheck(false)
            )
        }
    }


    let firstPaycheckDate = ''

    const semiMonthlyFirstPaycheckHandler = (e) => {
        firstPaycheckDate = e.target.value.split('-')
        firstPaycheckDate = Number(firstPaycheckDate[2])
        SemiMonthlyHandler()
        
    }

    let secondPaycheckDate = ''

    const semiMonthlySecondPaycheckHandler = (e) => {
        secondPaycheckDate = e.target.value.split('-')
        console.log(Number(secondPaycheckDate[2]))
        secondPaycheckDate = Number(secondPaycheckDate[2])
        SemiMonthlyHandler()
    }

    const SemiMonthlyHandler = () => {

        if(updatingDate.date + 1 === secondPaycheckDate){
            setUpcomingPaycheck(true)
        }
        else(
            setUpcomingPaycheck(false)
        )
        if(updatingDate.date + 1 === firstPaycheckDate){
            setUpcomingPaycheck(true)
        }
        else(
            setUpcomingPaycheck(false)
        )
    }

    
    if (loggedIn.loggedIn){
    return(
        <div className="budget-container">
            <div>Personalize Your Budget Here</div>
            {(User.incomeFrequency === 'bi-weekly') ? (
                <div>
                    <p>When did you last get paid: </p> 
                    <input key="calander-input" onSelect={paycheckSelection} selectMultiple="true" selectMin="2" selectMax="2"  type="date" max={todaysDate} /> 
                </div>
            ) : null}

            {(User.incomeFrequency === 'semi-monthly') ? (
                <div>
                    <p>When do you get paid?</p>
                    <div>
                        <label>First Paycheck</label>
                        <input onSelect={semiMonthlyFirstPaycheckHandler} type="date" />
                        <label>Second Paycheck</label>
                        <input onSelect={semiMonthlySecondPaycheckHandler} key="calander-input" type="date" /> 
                    </div>
                </div>
            ) : null}


            {(upcomingPaycheck === true) ? (
                (
                    <div>
                        Upcoming Paycheck {User.income}
                    </div>
                )
            ) : null}
            
        </div>
    )}
    
    return(
        <h1>Please Log In</h1>
    )

}

export default BudgetPage
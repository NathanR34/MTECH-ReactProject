import { User } from "../App";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import { grey } from "@mui/material/colors";
import MoneyIcon from "@mui/icons-material/Payments";
import SavingsIcon from "@mui/icons-material/Savings";
import { useEffect, useState } from "react";

export default function ExpectedSavings({
  projectedSavings,
  availableSpending,
  moneySpent
}) {


    let numberOfPaychecksMonthly = 2

    if(User.incomeFrequency === 'weekly'){
      numberOfPaychecksMonthly = 4
    }

    let incomeFrequencyCheck = 2
    
    if(User.incomeFrequency === 'weekly'){
      incomeFrequencyCheck = 1
    }

    const [savings, setSavings] = useState(null )

    if(savings === null){
      setSavings(Math.floor((User.income * numberOfPaychecksMonthly - (User.income * (70 * 0.01)) * numberOfPaychecksMonthly) - moneySpent))
    }


    const [weeklySavings, setWeeklySavings] = useState(null)

    if(weeklySavings === null) {
      setWeeklySavings((User.income * (30 * 0.01))/ incomeFrequencyCheck)
    }


    console.log(User.income * (30 * 0.01) * numberOfPaychecksMonthly) 

    const [weeklySpending, setWeeklySpending] = useState(null)

    if(weeklySpending === null) {
      setWeeklySpending(Math.floor((availableSpending)) - moneySpent)
    }

    useEffect(() => {
      console.log( availableSpending)
      console.log('weekly', weeklySpending)
    }, [weeklySpending])

    
  return (
    <div className="mainPage">
      <Paper className="savingsPaper" sx={{ bgcolor: grey[50] }} elevation={5}>
        <Card className="savings">
          <CardContent>
            <SavingsIcon color="success"></SavingsIcon>
            <div>
            {projectedSavings === 0 ? (
            <div> Projected Savings This Month:{savings} </div>
        ) : <div> Projected Savings This Month:{Math.floor(projectedSavings * numberOfPaychecksMonthly)} </div>}
            </div>
            <div>
            {projectedSavings === 0 ? (
            <div> Projected Savings This Week:{ weeklySavings } </div>
        ) : <div> Projected Savings This Week:{Math.floor(projectedSavings/incomeFrequencyCheck )} </div>}
            </div>
          </CardContent>
        </Card>
        <Card className="spending">
          <CardContent>
            <MoneyIcon color="success"></MoneyIcon>
            <div>
              {" "}
              {availableSpending === 0 ? (
            <div> Spending Left For This Month: {availableSpending} </div>
        ) : <div> Spending Left For This Month: {Math.floor(availableSpending - moneySpent)} </div> }
            </div>
            <div>
            {availableSpending === 0 ? (
            <div> Spening Left For This Week: { weeklySpending } </div>
        ): <div> Spening Left For This Week: {Math.floor((availableSpending/4)) - moneySpent} </div> }
            </div>
          </CardContent>
        </Card>
      </Paper>
    </div>
  );
}

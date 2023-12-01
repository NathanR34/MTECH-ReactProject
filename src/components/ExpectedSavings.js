import { User } from "../App";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import { grey } from "@mui/material/colors";
import MoneyIcon from "@mui/icons-material/Payments";
import SavingsIcon from "@mui/icons-material/Savings";
import { useState } from "react";

export default function ExpectedSavings({
  projectedSavings,
  availableSpending,
  moneySpent
}){

    const [savings, setSavings] = useState((User.income * 2 - (User.income * (30 * 0.01)) * 2) - moneySpent )
    // console.log(moneySpent)
    console.log((User.income * 2 - (User.income * (30 * 0.01)) * 2) - moneySpent)

  return (
    <div className="mainPage">
      <Paper className="savingsPaper" sx={{ bgcolor: grey[50] }} elevation={5}>
        <Card className="savings">
          <CardContent>
            <SavingsIcon color="success"></SavingsIcon>
            <div>
            {projectedSavings === 0 ? (
            <div> Projected Savings This Month:{(User.income * (30 * 0.01)) * 2} </div>
        ) : <div> Projected Savings This Month:{Math.floor(projectedSavings * 2)} </div>}
            </div>
            <div>
            {projectedSavings === 0 ? (
            <div> Projected Savings This Week:{(User.income * (30 * 0.01))/ 2} </div>
        ) : <div> Projected Savings This Week:{Math.floor(projectedSavings/2 )} </div>}
            </div>
          </CardContent>
        </Card>
        <Card className="spending">
          <CardContent>
            <MoneyIcon color="success"></MoneyIcon>
            <div>
              {" "}
              {availableSpending === 0 ? (
            <div> Spending Left For This Month: {savings} </div>
        ) : <div> Spending Left For This Month: {Math.floor(availableSpending - moneySpent)} </div> }
            </div>
            <div>
            {availableSpending === 0 ? (
            <div> Spening Left For This Week: {(User.income - (User.income * (30 * 0.01))) / 2} </div>
        ): <div> Spening Left For This Week: {Math.floor((availableSpending/4)) - moneySpent} </div> }
            </div>
          </CardContent>
        </Card>
      </Paper>
    </div>
  );
}

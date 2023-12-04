import { User } from "../App";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import { grey } from "@mui/material/colors";
import MoneyIcon from "@mui/icons-material/Payments";
import SavingsIcon from "@mui/icons-material/Savings";
import { useState } from "react";
import Typography from "@mui/material/Typography";

export default function ExpectedSavings({
  projectedSavings,
  availableSpending,
  moneySpent,
}) {
  let numberOfPaychecksMonthly = 2;

  if (User.incomeFrequency === "weekly") {
    numberOfPaychecksMonthly = 4;
  }

  let incomeFrequencyCheck = 2;

  if (User.incomeFrequency === "weekly") {
    incomeFrequencyCheck = 1;
  }

  const [savings, setSavings] = useState(
    User.income * 2 -
      User.income * (30 * 0.01) * numberOfPaychecksMonthly -
      moneySpent
  );

  return (
    <div className="mainPage">
      <Paper className="savingsPaper" sx={{ bgcolor: grey[50] }} elevation={5}>
        <Card className="savings">
          <CardContent>
            <Typography variant="h5">
              {" "}
              <SavingsIcon color="success"></SavingsIcon>
              Projected Savings
            </Typography>
            <div>
              {projectedSavings === 0 ? (
                <div>
                  This Month:
                  {User.income * (30 * 0.01) * numberOfPaychecksMonthly}
                </div>
              ) : (
                <div>
                  This Month:
                  {Math.floor(projectedSavings * numberOfPaychecksMonthly)}
                </div>
              )}
            </div>
            <div>
              {projectedSavings === 0 ? (
                <div>
                  This Week:
                  {(User.income * (30 * 0.01)) / numberOfPaychecksMonthly}
                </div>
              ) : (
                <div>
                  This Week:
                  {Math.floor(projectedSavings / incomeFrequencyCheck)}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="spending">
          <CardContent>
            <Typography variant="h5">
              <MoneyIcon color="success"></MoneyIcon>
              Spending Left
            </Typography>
            <div>
              {availableSpending === 0 ? (
                <div> This Month: {savings} </div>
              ) : (
                <div>
                  This Month:
                  {Math.floor(availableSpending - moneySpent)}
                </div>
              )}
            </div>
            <div>
              {availableSpending === 0 ? (
                <div>
                  This Week:
                  {(User.income - User.income * (30 * 0.01)) / 2}
                </div>
              ) : (
                <div>
                  This Week:
                  {Math.floor(availableSpending / 4) - moneySpent}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Paper>
    </div>
  );
}

import { User } from "../App";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import { grey } from "@mui/material/colors";
import MoneyIcon from "@mui/icons-material/Payments";
import SavingsIcon from "@mui/icons-material/Savings";

export default function ExpectedSavings({
  projectedSavings,
  availableSpending,
}) {
  return (
    <div className="mainPage">
      <Paper className="savingsPaper" sx={{ bgcolor: grey[50] }} elevation={5}>
        <Card className="savings">
          <CardContent>
            <SavingsIcon color="success"></SavingsIcon>
            <p>
              Projected Savings This Month:{Math.floor(projectedSavings * 2)}
            </p>
            <p>
              Projected Savings This Week: {Math.floor(projectedSavings / 2)}
            </p>
          </CardContent>
        </Card>
        <Card className="spending">
          <CardContent>
            <MoneyIcon color="success"></MoneyIcon>
            <p>
              {" "}
              Spending Left For This Month: {Math.floor(availableSpending)}{" "}
            </p>
            <p>
              Spending Left For This Week: {Math.floor(availableSpending / 4)}
            </p>
          </CardContent>
        </Card>
      </Paper>
    </div>
  );
}

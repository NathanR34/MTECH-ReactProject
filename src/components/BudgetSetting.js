import { User } from "../App";
import { getDate } from "../App";
import { useTime } from "../util/time";
import { useState } from "react";
import Paper from "@mui/material/Paper";

const BudgetPage = (loggedIn) => {
  let updatingDate = useTime();
  const todaysDate = new Date().toISOString().split("T")[0];
  const [upcomingPaycheck, setUpcomingPaycheck] = useState(false);

  const paycheckSelection = (e) => {
    let paycheckDate = e.target.value;
    let numWeeks = 2;
    paycheckDate = new Date(paycheckDate);

    paycheckDate.setDate(paycheckDate.getDate() + numWeeks * 7);
    let nextPaycheckDay = paycheckDate.getDate() + 1;
    let nextPaycheckMonth = paycheckDate.getMonth() + 1;
    let nextPaycheckYear = paycheckDate.getYear();

    if (User.incomeFrequency === "bi-weekly") {
      // e.target.value
      const today = new Date();
      const month = today.getMonth();
      const year = today.getFullYear();
      const date = today.getDate();

      console.log(month);

      if (month + 1 === nextPaycheckMonth && date + 1 === nextPaycheckDay) {
        setUpcomingPaycheck(true);
      }
    }
  };

  if (loggedIn.loggedIn) {
    return (
      <div className="mainPage">
        <Paper
          className="budget-container"
          elevation={5}
          sx={{ borderRadius: 5 }}
        >
          <div>Personalize Your Budget Here</div>
          {User.incomeFrequency === "bi-weekly" ? (
            <div>
              <p>When did you last get paid: </p>
              <input onSelect={paycheckSelection} type="date" />{" "}
            </div>
          ) : null}

          {upcomingPaycheck === true ? (
            <div>Upcoming Paycheck {User.income}</div>
          ) : null}
        </Paper>
      </div>
    );
  }

  return <h1>Please Log In</h1>;
};

export default BudgetPage;

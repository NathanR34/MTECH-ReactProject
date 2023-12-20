import { UserInfo } from "../App";
import DiscreteSlider from "./Slider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import { grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";

const BudgetPage = ({
  loggedIn,
  UseTime,
  upcomingPaycheck,
  setUpcomingPaycheck,
  setNextPaycheckDay,
  setProjectedSavings,
  setAvailableSpending,
  projectedSavings,
  setSavingsRatio,
}) => {
  let updatingDate = UseTime();
  const todaysDate = new Date().toISOString().split("T")[0];
  let nextPaycheckDay = null;
  let nextPaycheckMonth = null;
  let paycheckDate = null;
  let numWeeks = 2;

  const addNextDay = () => {
    setUpcomingPaycheck(true);
    paycheckDate.setDate(paycheckDate.getDate() + numWeeks * 7);
    nextPaycheckDay = paycheckDate.getDate() + 1;
    nextPaycheckMonth = paycheckDate.getMonth() + 1;
    console.log(nextPaycheckDay, nextPaycheckMonth);
    setNextPaycheckDay({ day: nextPaycheckDay, month: nextPaycheckMonth });
  };

  const paycheckSelection = (e) => {
    paycheckDate = e.target.value;
    paycheckDate = new Date(paycheckDate);
    paycheckDate.setDate(paycheckDate.getDate() + numWeeks * 7);
    nextPaycheckDay = paycheckDate.getDate() + 1;
    nextPaycheckMonth = paycheckDate.getMonth() + 1;
    if (
      updatingDate.month === nextPaycheckMonth &&
      updatingDate.date + 1 === nextPaycheckDay
    ) {
      addNextDay();
    } else setUpcomingPaycheck(false);
  };

  let firstPaycheckDate = "";

  const semiMonthlyFirstPaycheckHandler = (e) => {
    firstPaycheckDate = e.target.value.split("-");
    firstPaycheckDate = Number(firstPaycheckDate[2]);
    SemiMonthlyHandler();
  };

  let secondPaycheckDate = "";

  const semiMonthlySecondPaycheckHandler = (e) => {
    secondPaycheckDate = e.target.value.split("-");
    secondPaycheckDate = Number(secondPaycheckDate[2]);
    SemiMonthlyHandler();
  };

  const SemiMonthlyHandler = () => {
    if (
      updatingDate.date === secondPaycheckDate + 1 ||
      updatingDate.date === firstPaycheckDate + 1
    ) {
      setUpcomingPaycheck(true);
    } else setUpcomingPaycheck(false);
    // if(updatingDate.date + 1 === firstPaycheckDate){
    //     setUpcomingPaycheck(true)
    // }
    // else(
    //     setUpcomingPaycheck(false)
    // )
  };

  if (loggedIn) {
    return (
      <Paper className="mainPage" elevation={0} sx={{ bgcolor: grey[200] }}>
        <div className="budget-container">
          <Typography variant="h5">Personalize Your Budget Here</Typography>
          {UserInfo.incomeFrequency === "bi-weekly" ? (
            <div className="row-flex paidContainer">
              <p>When did you last get paid: </p>
              <span className="paycheck">
                <input
                  key="calander-input"
                  onSelect={paycheckSelection}
                  type="date"
                  max={todaysDate}
                />
              </span>
            </div>
          ) : null}
          {UserInfo.incomeFrequency === "semi-monthly" ? (
            <div className="paidContainer row-flex ">
              <p>When do you get paid?</p>
              <div className="paychecksContainer">
                <span className="paycheck">
                  <label>First Paycheck</label>
                  <input
                    onSelect={semiMonthlyFirstPaycheckHandler}
                    type="date"
                  />
                </span>
                <span className="paycheck">
                  <label>Second Paycheck</label>
                  <input
                    onSelect={semiMonthlySecondPaycheckHandler}
                    key="calander-input"
                    type="date"
                  />
                </span>
              </div>
            </div>
          ) : null}
          {upcomingPaycheck === true ? (
            <div>Upcoming Paycheck {UserInfo.income}</div>
          ) : null}
          <Card className="center sliderContainer" variant="outlined">
            <CardContent>
              <Typography sx={{ fontSize: 18 }} gutterBottom>
                What pertage of your income would you like to save?
              </Typography>

              <DiscreteSlider
                key="discreteSlider"
                setProjectedSavings={setProjectedSavings}
                setSavingsRatio={setSavingsRatio}
                projectedSavings={projectedSavings}
                setAvailableSpending={setAvailableSpending}
              />
            </CardContent>
          </Card>
        </div>
      </Paper>
    );
  }

  return (
    <>
      <h1>Please Log In</h1>
    </>
  );
};

export default BudgetPage;

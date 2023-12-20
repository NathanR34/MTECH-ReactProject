import { UserInfo } from "../App";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import { grey } from "@mui/material/colors";
import MoneyIcon from "@mui/icons-material/Payments";
import SavingsIcon from "@mui/icons-material/Savings";
import { useState } from "react";
import Typography from "@mui/material/Typography";
//import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from "@mui/x-charts";



export default function ExpectedSavings({
  projectedSavings,
  availableSpending,
  moneySpent,
  historyArr,
  savingsRatio,
}) {

  let currentTotal = Number(UserInfo.cash)||0;
  let currentSavings = currentTotal * savingsRatio;
  let currentBalance = currentTotal - currentSavings;

  let numberOfPaychecksMonthly = 2;

  if (UserInfo.incomeFrequency === "weekly") {
    numberOfPaychecksMonthly = 4;
  }

  let incomeFrequencyCheck = 2;

  if (UserInfo.incomeFrequency === "weekly") {
    incomeFrequencyCheck = 1;
  }

  const [savings, setSavings] = useState(null);

  if (savings === null) {
    setSavings(
      Math.floor(
        UserInfo.income * numberOfPaychecksMonthly -
          UserInfo.income * (70 * 0.01) * numberOfPaychecksMonthly -
          moneySpent
      )
    );
  }

  const [weeklySavings, setWeeklySavings] = useState(null);

  if (weeklySavings === null) {
    setWeeklySavings((UserInfo.income * (30 * 0.01)) / incomeFrequencyCheck);
  }

  console.log(UserInfo.income * (30 * 0.01) * numberOfPaychecksMonthly);

  const [weeklySpending, setWeeklySpending] = useState(null);

  if (weeklySpending === null) {
    setWeeklySpending(Math.floor(availableSpending) - moneySpent);
  }

  /*useEffect(() => {
    console.log(availableSpending);
    console.log("weekly", weeklySpending);
  }, [weeklySpending, availableSpending]);*/

  const savingCard = <Card className="savings savings-style">
    <CardContent>
      <Typography className="spendingTop" variant="h6">
        <SavingsIcon color="success"></SavingsIcon>
        Projected Savings
      </Typography>
      <div>
        <h3>${currentSavings.toFixed(2)}</h3>
        {/*{projectedSavings === 0 ? (
          <div> This Month:{savings} </div>
        ) : (
          <div>
            {" "}
            This Month:
            {Math.floor(projectedSavings * numberOfPaychecksMonthly)}{" "}
          </div>
        )}
      </div>
      <div>
        {projectedSavings === 0 ? (
          <div> This Week:{weeklySavings} </div>
        ) : (
          <div>
            {" "}
            This Week:
            {Math.floor(projectedSavings / incomeFrequencyCheck)}{" "}
          </div>
        )}*/}
      </div>
    </CardContent>
  </Card>

  const spendingCard = <Card className="spending spending-style">
    <CardContent>
      <Typography className="spendingTop" variant="h6">
        <MoneyIcon color="success"></MoneyIcon>
        Spending Left
      </Typography>
      <div>
        <h3>${currentBalance.toFixed(2)}</h3>
        {/*{availableSpending === 0 ? (
          <div>This Month: {availableSpending} </div>
        ) : (
          <div>
            {" "}
            This Month: {Math.floor(availableSpending - moneySpent)}{" "}
          </div>
        )}
      </div>
      <div>
        {availableSpending === 0 ? (
          <div> This Week: {weeklySpending} </div>
        ) : (
          <div>
            {" "}
            This Week: {Math.floor(availableSpending / 4) -
              moneySpent}{" "}
          </div>
        )}*/}
      </div>
    </CardContent>
  </Card>

  return (
    <div className="mainPage">
      <Paper sx={{ bgcolor: grey[50] }} elevation={5}>
        <div className="savingsPaper">
          {savingCard}
          {spendingCard}
        </div>
        <div>
          <OverviewChart historyArr={historyArr} savingsRatio={savingsRatio}></OverviewChart>
        </div>
      </Paper>
    </div>
  );
}


function applyAmount(amount, ratio, {balance=0, savings=0, debt=0}={}){
  balance += debt;
  if(amount > 0){
    let savingsAmount = ratio*amount;
    savings += savingsAmount;
    balance += amount - savingsAmount;
  } else {
    balance += amount;
  }
  if(balance < 0){
    savings += balance;
    balance = 0;
  }
  if(savings < 0){
    debt = savings;
    savings = 0;
  } else {
    debt = 0;
  }
  return {balance, savings, debt};
}

class Block {
  constructor(length, filter){
    if(!filter) {
      filter = v=>v;
    }
    this.total = new Array(length);
    this.increase = new Array(length);
    this.decrease = new Array(length);
    this.increase[0] = null;
    this.decrease[0] = null;
    this.filter = filter;
    this.length = length;
  }
  set(i, current){
    this.total[i] = this.filter(current,i);
    if(i<this.length-1){
      let delta = this.total[i+1] - current;
      this.increase[i+1] = (delta>0)?delta:null;
      this.decrease[i+1] = (delta<0)?delta:null;
    }
  }
}

class History {
  constructor(length){
    this.length = length;
    this.debt = new Block(length);
    this.total = new Block(length);
    this.balance = new Block(length);
    this.savings = new Block(length);
    this.dates = new Array(length);
  }
  set(i, balance, date){
    if(i<0) i+= this.length;
    this.balance.set(i, balance.balance);
    this.savings.set(i, balance.savings);
    this.debt.set(i, balance.debt);
    this.total.set(i, balance.balance+balance.savings+balance.debt);
    this.dates[i] = date;
  }
}

function OverviewChart({historyArr, savingsRatio}){

  let history = new History(historyArr.length+1);
  
  let currentTotal = Number(UserInfo.cash)||0;
  //let currentSavings = currentTotal * savingsRatio;
  //let currentBalance = currentTotal - currentSavings;
  let balance = applyAmount(currentTotal, savingsRatio);

  console.log("OVERVIEW", historyArr, balance);
  
  history.set(-1, balance, new Date());
  
  for(let i=historyArr.length-1; i>=0; i--){
    let action = historyArr[i];

    let amount = Number(action.amount) || 0;

    if(action.type === "expense") amount = -amount;
    
    // negative since going backwards in timeline
    balance = applyAmount(-amount, savingsRatio, balance);
    history.set(i, balance, action.dateObj);
  }
  console.log(history, currentTotal);
  let total = history.total.total.map((v)=>v<0?0:v);
  let debt = history.total.total.map(v=>v<0?-v:0);
  
  return <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <LineChart xAxis={[{
        id:"catagory",
        data: history.dates,
        scaleType: "time"
      }]}
      series={[
        {data:debt, area: true, color:"#FF0000", label:"Debt"},
        {data:total, area: true, color:"#000088", label:"Balance"},
        {data:history.savings.total, area: false, color:"#00FFFF", label:"Savings"},
        {data:history.total.increase, area: false, color:"#00FF00", label:"Income"},
        {data:history.total.decrease.map((v)=>(v!==null)?-v:0), area: false, color:"#FF8800", label:"Expenses"}
      ]}
      width={600}
      height={400}
    ></LineChart>
  </div>
}
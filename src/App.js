"use client";
import Navbar from "./components/NavBar";
import ExpenseTracker from "./ExpenseTracker";
import { useEffect, useState } from "react";
import BudgetPage from "./components/BudgetSetting";
import ModalPopup from "./components/ModalPopup";
import NavBar from "./components/NavBar";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export const User = {
  firstName: null,
  cash: null,
  incomeFrequency: "bi-weekly",
  income: null,
  annual: 0,
};

export const getDate = () => {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const date = today.getDate();
  const hour = today.getHours();
  const minute = today.getMinutes();
  const second = today.getSeconds();
  const time = hour + ":" + minute + ":" + second;
  const currentDate = month + "/" + date + "/" + year;
  return currentDate + " " + time;
};

export const DateTime = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const fullDate = month + "/" + date + "/" + year;
  const [currentDate, setCurrentDate] = useState(fullDate);
  useEffect(() => {
    var timer = setInterval(() => setCurrentDate(fullDate), 10000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Todays Date
        </Typography>
        <Typography variant="h5" component="div">
          {currentDate}
        </Typography>
      </CardContent>
    </React.Fragment>
  );
  return (
    <Box className="top-left">
      <Card variant="outlined">{card}</Card>
    </Box>
  );
};

export default function App() {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pageSelect, setPageSelect] = useState("home");
  const [historyArr, setHistoryArr] = useState([]);

  const addTransaction = (newTran) => {
    setHistoryArr([...historyArr, newTran]);
  };

  const showModal = (e) => {
    console.log(e.target);
    setModalDisplay(true);
  };

  return (
    <div className="App">
      <NavBar setPageSelect={setPageSelect} />
      <div className="mainContent">
        <ModalPopup
          displayModal={modalDisplay}
          setDisplayModal={setModalDisplay}
          setIsLoggedIn={setIsLoggedIn}
        />
        {pageSelect === "home" ? (
          <ExpenseTracker
            key="expensetracker"
            loggedIn={isLoggedIn}
            setLogIn={setIsLoggedIn}
            historyArr={historyArr}
            addTransaction={addTransaction}
          />
        ) : null}
        {pageSelect === "budget" ? (
          <BudgetPage key="budgetpage" loggedIn={isLoggedIn} />
        ) : null}
        <DateTime />
      </div>
    </div>
  );
}

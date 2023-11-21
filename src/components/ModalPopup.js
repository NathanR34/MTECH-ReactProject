import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import NavBar from "./NavBar";

import { User } from "../App";
import ExpenseTracker from "../ExpenseTracker";

export default function ModalPopup({ setIsLoggedIn }) {
  const [open, setOpen] = React.useState(true);

  const addUserName = (e) => {
    User.firstName = e.target.value;
  };

  const addCurrentMoney = (e) => {
    User.cash = e.target.value;
  };

  const addIncomeFrequency = (e) => {
    User.incomeFrequency = e.target.value;
  };

  const addIncome = (e) => {
    User.income = e.target.value;
  };

  const addUser = (e) => {
    e.preventDefault();
    if (User.firstName === null || User.firstName === "") {
      return alert("Please Include Your First Name");
    }
    if (User.cash === null || User.cash === "") {
      return alert("Please Include Your Current Cash");
    }
    if (User.income === null || User.income === "") {
      return alert("Please Include Your Current Income");
    }

    setOpen(false);
    setIsLoggedIn(true);
    console.log(User);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log("modal");
  return (
    <>
      <React.Fragment>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter your info here</DialogContentText>
            <TextField
              required
              autoFocus
              margin="dense"
              id="name"
              label="name"
              type="text"
              fullWidth
              variant="standard"
              onChange={addUserName}
            />{" "}
            <TextField
              required
              margin="dense"
              id="standard-number"
              label="Current Cash"
              type="number"
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={addCurrentMoney}
            />
            <InputLabel id="demo-simple-select-label">
              Income Frequency
            </InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={"income-frequency"}
              label="income-frequency"
              onChange={addIncomeFrequency}
            >
              <MenuItem value={"income-frequency"}>
                Select Payment Frequency
              </MenuItem>
              <MenuItem value={"bi-weekly"}>Bi-Weekly</MenuItem>
              <MenuItem value={"semi-monthly"}>Semi-Monthly</MenuItem>
              <MenuItem value={"weekly"}>Weekly</MenuItem>
            </Select>
            <br />
            <TextField
              required
              margin="dense"
              id="standard-number"
              label="Income Per Paycheck"
              type="number"
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={addIncome}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} href="./">
              Cancel
            </Button>
            <Button onClick={addUser} href="../App">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}

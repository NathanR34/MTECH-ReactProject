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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState, useContext } from "react";
import { User } from "../App";
import { useMonthlyContext } from "../App";


export default function ModalPopup({ setIsLoggedIn }) {
  const [open, setOpen] = React.useState(true);
  const [missingOpen, setMissingOpen] = useState(false);
  const [incomeFrequencySelection, setIncomeFrequencySelection] = useState('bi-weekly');

  

  const {setMonthlyIncome} = useMonthlyContext();

  let missingInfo = true;

  const handleMissingClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setMissingOpen(false);
  };
  const addUserName = (e) => {
    User.firstName = e.target.value;
  };

  const addCurrentMoney = (e) => {
    User.cash = e.target.value;
  };

  

 

  const addIncomeFrequency = (e) => {
    User.incomeFrequency = e.target.value;
    console.log(e.target.value)
    setIncomeFrequencySelection(e.target.value)
   
  };

  const addIncome = (e) => {
    User.income = e.target.value;
  };

  const addUser = (e) => {
    e.preventDefault();
    if (User.firstName === null || User.firstName === "") {
      missingInfo = true
      setMissingOpen(true)
    }
    else{
      if (User.cash === null || User.cash === "") {
        missingInfo = true
        setMissingOpen(true)
      }
      else{
        if (User.income === null || User.income === "") {
          missingInfo = true
          setMissingOpen(true)
        }  
        else{

          if(User.incomeFrequency === 'bi-weekly'){
            setMonthlyIncome((User.income) * 2)
          }
          if(User.incomeFrequency === 'semi-monthly'){
            setMonthlyIncome((User.income) * 2)
          }
          if(User.incomeFrequency === 'weekly'){
            setMonthlyIncome((User.income) * 4)
          }
          missingInfo = false
        }
      }
    }
    


    
    if(missingInfo === false){
      setOpen(false);
      setIsLoggedIn(true);
    }
    
  };


  const handleClose = () => {
    setOpen(false);
  };
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
              label="Name"
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
              value={incomeFrequencySelection}
              label={incomeFrequencySelection}
              onChange={addIncomeFrequency}
            >
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
            <Button onClick={handleClose} href="../App">
              Cancel
            </Button>
            <Button onClick={addUser} href="../App">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      <Snackbar
        open={missingOpen}
        autoHideDuration={6000}
        onClose={handleMissingClose}
      >
        <Alert
          onClose={handleMissingClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Please check if the form is filled out!
        </Alert>
      </Snackbar>
    </>
  );
}

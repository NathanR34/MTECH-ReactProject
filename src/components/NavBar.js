import { purple } from "@mui/material/colors";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
const emails = ["Name One", "Name Two", "Name Three"];

function Navbar(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  const handlePopupOpen = () => {
    console.log("Working");
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem disableGutters key={email}>
            <ListItemButton onClick={() => handleListItemClick(email)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: purple[100], color: purple[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disableGutters>
          <ListItemButton autoFocus>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <Button onClick={handlePopupOpen} href="./ModalPopup">
              <ListItemText> Add Account</ListItemText>
            </Button>
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

Navbar.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo( {setPageSelect} ) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {" "}
          <Typography variant="button" display="block" sx={{ flexGrow: 1 }} onClick={() => setPageSelect('home')}>
            Home
          </Typography>{" "}
          <Typography variant="button" display="block" sx={{ flexGrow: 1 }} onClick={() => setPageSelect('budget')} >
            Budget
          </Typography>{" "}
          <Typography variant="button" display="block" sx={{ flexGrow: 1 }}>
            Overview
          </Typography>{" "}
          <Button
            color="inherit"
            sx={{ color: purple[50] }}
            onClick={handleClickOpen}
          >
            Login
          </Button>
          <Navbar
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

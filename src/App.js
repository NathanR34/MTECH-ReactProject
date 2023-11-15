import "./App.css";
import LogIn from "./components/InitialForm";
import ModalPopup from "./components/ModalPopup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ExpenseTracker from "./ExpenseTracker";
import { useState } from "react";

export const User = {
  firstName: null,
  cash: null,
  incomeFrequency: "bi-weekly",
  income: null,
  annual: 0,
};

// export const appData = {
//   newUser: newUser,
// };

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <div className="mainContent">
        {" "}
        <header>
          {" "}
          <Router>
            <ul className="mainNav">
              <li>Home</li>
              <li>Budget</li>
              <li>Overview</li>
              <li className="pointer">
                {" "}
                <Link className="link" to="/components/ModalPopup">
                  Login
                </Link>
              </li>
            </ul>
            <Routes>
              <Route
                exact
                path="/components/ModalPopup"
                element={
                  <ModalPopup loggedIn={isLoggedIn} setLogIn={setIsLoggedIn} />
                }
              ></Route>
            </Routes>
          </Router>
        </header>
        {/* <LogIn /> */}
        <ExpenseTracker loggedIn={isLoggedIn} setLogIn={setIsLoggedIn} />
      </div>
    </div>
  );
}

export default App;

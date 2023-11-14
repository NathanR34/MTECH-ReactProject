import "./App.css";
import LogIn from "./components/InitialForm";
import ModalPopup from "./components/ModalPopup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export const newUser = {
  customerFirstName: "",
  customerIncome: 0,
  customerMoney: 0,
};
export const appData = {
  newUser: newUser,
};

function App() {
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
              <li className="pointer" onClick={ModalPopup}>
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
                element={<ModalPopup />}
              ></Route>
            </Routes>
          </Router>
          <div className="logo">Budget App</div>{" "}
        </header>
        <LogIn />
      </div>
    </div>
  );
}

export default App;

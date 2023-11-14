import "./App.css";
import LogIn from "./components/InitialForm";
import ModalPopup from "./components/ModalPopup";

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
          <ul className="mainNav">
            <li>Home</li>
            <li>Budget</li>
            <li>Overview</li> <li>LogIn </li>
          </ul>
          <div className="logo">Budget App</div>{" "}
        </header>
        <LogIn />
        <ModalPopup />
      </div>
    </div>
  );
}

export default App;

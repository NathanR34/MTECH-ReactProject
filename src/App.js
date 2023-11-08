import './App.css';
import LogIn from './components/InitialForm';
export const newUser = {
  customerFirstName: '',
  customerIncome: 0,
  customerMoney: 0
};
export const appData = {
  newUser: newUser
}

function App() {
  return (
    <div className="App">
        <header><ul className="mainNav"><li>Home</li><li>Budget</li><li>Overview</li></ul><div className="logo">Budget App</div></header>
      <LogIn />
    </div>
  );
}

export default App;

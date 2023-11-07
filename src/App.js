import './App.css';
import LogIn from './components/InitialForm';
export const newUser = {
  customerName: '',
  customerIncome: 0
};
export const appData = {
  newUser: newUser
}



function App() {
  return (
    <div className="App">
      <LogIn />
    </div>
  );
}

export default App;

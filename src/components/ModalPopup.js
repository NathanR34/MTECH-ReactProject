import { useState } from "react"
import {User} from '../App'



export default function ModalPopup({setLogIn, displayModal, setDisplayModal}) {

  const [isSelected, setIsSelected] = useState(false)
  // const [isLoggedIn, setIsLoggedIn] = useState(false)

  const addUserName = (e) => {
    User.firstName = e.target.value
  }

  const addCurrentMoney = (e) => {
    User.cash = e.target.value
  }

  const addIncomeFrequency = (e) => {
    User.incomeFrequency = e.target.value
  }

  const changeSelections = () => {
    setIsSelected(true)
  }

  const addIncome = (e) =>{
    User.income = e.target.value
  }

  const addUser = (e) => {
    e.preventDefault()
    if(User.firstName === null || User.firstName === ''){
      return alert('Please Include Your First Name')
    }
    if(User.cash === null || User.cash === ''){
      return alert('Please Include Your Current Cash')
    }
    if(User.income === null || User.income === ''){
      return alert('Please Include Your Current Income')
    }
    
    setDisplayModal(false)
    setLogIn(true)
    console.log(User)
  }

  const closeModal = () => {
    setDisplayModal(false)
  }


  if(displayModal){
    return (
      <div className="background">
        <header>
          <div>Budget Tracker</div>
        </header>
        <div className="modal">
          <div className="main-container modal-content">
            <div className="form-container">
              <form className="int-user-form">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title">Enter your info here</h1>
                    <p className="close" onClick={closeModal}> X </p>
                  </div>
                  <label name="firstName">First Name</label>
                  <input
                    name="firstName"
                    type="text"
                    placeholder="First Name..."
                     onChange={addUserName}
                  />
                  <label>Current Cash</label>
                  <input
                    type="number"
                    placeholder="Your Current Money..."
                     onChange={addCurrentMoney}
                  />
                  <label>Income Frequency</label>
                  <select
                    name="income-frequency"
                     onClick={changeSelections}
                    onChange={addIncomeFrequency}
                  >
                    {isSelected === false ? (
                      <option>Select Payment Frequency</option>
                    ) : null}
                    {isSelected && (
                      <>
                        <option value="bi-weekly">Bi-Weekly</option>
                        <option value="semi-monthly">Semi-Monthly</option>
                        <option value="weekly">Weekly</option>{" "}
                      </>
                    )}
                  </select>
                  <label>Income Per Paycheck</label>
                  <input
                    type="number"
                    placeholder="Paycheck Amount..."
                    onChange={addIncome}
                  />
  
                  <button className="submit-new-user" onClick={addUser} >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
    return(
      <>
      </>
    )
  }


  
}

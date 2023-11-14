export default function ModalPopup() {
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
                <h1 className="modal-title">Enter your info here</h1>
                <label name="firstName">First Name</label>
                <input
                  name="firstName"
                  type="text"
                  placeholder="First Name..."
                  // onChange={addUserName}
                />
                <label>Current Cash</label>
                <input
                  type="number"
                  placeholder="Your Current Money..."
                  // onChange={addCurrentMoney}
                />
                <label>Income Frequency</label>
                <select
                  name="income-frequency"
                  // onClick={changeSelections}
                  // onChange={addIncomeFrequency}
                >
                  <option>Select Payment Frequency</option>
                  <option value="bi-weekly">Bi-Weekly</option>
                  <option value="semi-monthly">Semi-Monthly</option>
                  <option value="weekly">Weekly</option>{" "}
                </select>
                <label>Income Per Paycheck</label>
                <input
                  type="number"
                  placeholder="Paycheck Amount..."
                  //onClick={addIncome}
                />

                <button className="submit-new-user" /*onClick={addUser} */>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

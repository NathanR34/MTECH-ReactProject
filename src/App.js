"use client";
import Navbar from "./components/NavBar";
import ExpenseTracker from "./ExpenseTracker";
export const User = {
  firstName: null,
  cash: null,
  incomeFrequency: "bi-weekly",
  income: null,
  annual: 0,
};

export default function App() {
  return (
    <>
      <div className="navBar">
        <Navbar />
      </div>
      <div className="mainContent flex justify-center mt-6">
        <ExpenseTracker />
      </div>
    </>
  );
}

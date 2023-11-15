import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ModalPopup from "./ModalPopup";

export default function NavBar() {
  return (
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
          element={<ModalPopup />}
        ></Route>
      </Routes>
    </Router>
  );
}

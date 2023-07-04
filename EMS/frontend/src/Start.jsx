import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function Start() {
  const navigate = useNavigate();

  //using react-bootstrap
  return (
    <div className="row">
      <div className="landingpage">
        <div className="image landingPage">
          <div className="bg-overlay"></div>
        </div>
        <div className="container navbar-container">
          <Navbar className="landingpage_nav" variant="dark">
            <Navbar.Brand href="#home">
              <h5>Employee Management System</h5>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end"
            >
              <DropdownButton
                id="dropdown-basic-button"
                className="my-custom-dropdown"
                title="LOGIN"
              >
                <Dropdown.Item onClick={(e) => navigate("/login")}>
                  Admin
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => navigate("/employeeLogin")}>
                  Employee
                </Dropdown.Item>
              </DropdownButton>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div className="header_content text-center">
          <h3>Manage your employees in an efficient way.</h3>
          <p>Let's get started!</p>
        </div>
      </div>
      {/* <div>
        <p className=" container mt-5">This is below landing page</p>
      </div> */}
    </div>
  );
}

export default Start;

/*import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Start() {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-5 rounded w-25 border loginForm text-center">
        <h2>Login As</h2>
        <div className="d-flex justify-content mt-5">
          <button
            className="btn btn-primary btn-lg mx-3"
            onClick={(e) => navigate("/employeeLogin")}
          >
            Employee
          </button>
          <button
            className="btn btn-success btn-lg mx-5"
            onClick={(e) => navigate("/login")}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default Start; */

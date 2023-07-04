import React, { useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./style.css";

function Dashboard() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:4000/dashboard").then((res) => {
      if (res.data.Status === "Success") {
        if (res.data.role === "admin") {
          navigate("/");
        } else {
          const id = res.data.id;
          navigate("/employeedetail/" + id);
        }
      } else {
        navigate("/start");
      }
    });
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .get("http://localhost:4000/logout")
          .then((res) => {
            navigate("/");
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-2 px-sm-2 px-0 shadow custom-sidebar">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a
              href="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 d-none d-sm-inline my-3">Admin Panel</span>
            </a>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li>
                <Link
                  to="/dashboard"
                  data-bs-toggle="collapse"
                  className="nav-link px-0 align-middle"
                >
                  <i className="iconSize mx-2 bi bi-clipboard-data-fill"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Dashboard</span>{" "}
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/employee"
                  className="nav-link px-0 align-middle"
                >
                  <i className="iconSize mx-2 bi bi-people-fill"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Employees</span>{" "}
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="iconSize mx-2 bi bi-person-fill"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li onClick={handleLogout}>
                <a href="#" className="nav-link px-0 align-middle text-white">
                  <i className="iconSize mx-2 bi bi-box-arrow-left"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col py-0 px-0">
          <div className="p-3 d-flex justify-content-center shadow">
            <h4>Employee Management System</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

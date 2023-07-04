import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { validateForm } from "./Validation";
import "./style.css";

function AddEmployee() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    salary: "",
    contact: "",
    image: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const formErrors = validateForm(data);
    if (Object.keys(formErrors).length === 0) {
      const formdata = new FormData();
      formdata.append("name", data.name);
      formdata.append("email", data.email);
      formdata.append("password", data.password);
      formdata.append("address", data.address);
      formdata.append("salary", data.salary);
      formdata.append("contact", data.contact);
      formdata.append("image", data.image);
      axios
        .post("http://localhost:4000/create", formdata)
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "New Employee Added",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigate("/dashboard/employee");
          });
        })
        .catch((err) => console.log(err));
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h5>Add Employee</h5>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Enter Name"
            autoComplete="off"
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          {errors.name && (
            <p className="error validationAlert">{errors.name}</p>
          )}
        </div>
        <div className="col-12">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="inputEmail4"
            placeholder="Enter Email"
            autoComplete="off"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          {errors.email && (
            <p className="error validationAlert">{errors.email}</p>
          )}
        </div>
        <div className="col-12">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword4"
            placeholder="Enter Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          {errors.password && (
            <p className="error validationAlert">{errors.password}</p>
          )}
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="Enter Address"
            autoComplete="off"
            onChange={(e) => setData({ ...data, address: e.target.value })}
          />
          {errors.address && (
            <p className="error validationAlert">{errors.address}</p>
          )}
        </div>
        <div className="col-12">
          <label htmlFor="inputSalary" className="form-label">
            Salary
          </label>
          <input
            type="text"
            className="form-control"
            id="inputSalary"
            placeholder="Enter Salary"
            autoComplete="off"
            onChange={(e) => setData({ ...data, salary: e.target.value })}
          />
          {errors.salary && (
            <p className="error validationAlert">{errors.salary}</p>
          )}
        </div>
        <div className="col-12">
          <label htmlFor="inputContact" className="form-label">
            Contact
          </label>
          <input
            type="text"
            className="form-control"
            id="inputContact"
            placeholder="Enter Phone number"
            autoComplete="off"
            onChange={(e) => setData({ ...data, contact: e.target.value })}
          />
          {errors.contact && (
            <p className="error validationAlert">{errors.contact}</p>
          )}
        </div>
        <div className="col-12">
          <label htmlFor="formFile" className="form-label">
            Upload Image
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={(e) => setData({ ...data, image: e.target.files[0] })}
          />
          {errors.image && (
            <p className="error validationAlert">{errors.image}</p>
          )}
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary mb-5 mt-3">
            Add Employee
          </button>
          <button
            type="button"
            className="btn btn-danger mx-3 mb-5 mt-3"
            onClick={() => navigate("/dashboard/employee")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;

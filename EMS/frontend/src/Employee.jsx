import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Employee() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/getEmployee")
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.Result);
          setData(res.data.Result);
        } else {
          Swal.fire({
            title: "Error",
            text: "Something went wrong!",
            icon: "error",
            position: "center",
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the employee record.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://localhost:4000/delete/" + id)
          .then((res) => {
            if (res.data.Status === "Success") {
              Swal.fire(
                "Deleted!",
                "The employee has been deleted.",
                "success"
              );
              window.location.reload(true);
            } else {
              Swal.fire({
                title: "Error",
                text: "Something went wrong!",
                icon: "error",
                position: "center",
              });
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h5>Employee List</h5>
      </div>
      <Link to="/dashboard/create" className="btn btn-success my-5">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table  table-hover table-borderless my-3">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => {
              return (
                <tr key={index}>
                  <td>
                    {
                      <img
                        src={`http://localhost:4000/images/` + employee.image}
                        alt=""
                        className="employee_image"
                      ></img>
                    }
                  </td>
                  <td className="align-middle">{employee.name}</td>
                  <td className="align-middle">{employee.email}</td>
                  <td className="align-middle">{employee.address}</td>
                  <td className="align-middle">{employee.salary}</td>
                  <td className="align-middle">{employee.contact}</td>
                  <td className="align-middle">
                    <Link
                      to={`/dashboard/employeeEdit/` + employee.id}
                      className="btn btn-primary me-2 btn-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={(e) => handleDelete(employee.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employee;

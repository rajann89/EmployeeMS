import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Profile() {
  const { id } = useParams();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getAdmin/" + id)
      .then((res) => {
        setAdmin(res.data.Result[0]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="round-border shadow">
      <div className="d-flex align-items-center mt-3 mb-10 custom-marginw">
        <div className="d-flex flex-column custom-margin">
          <h3>Name: {admin.name}</h3>
          <h3>Email: {admin.email}</h3>
        </div>
      </div>
    </div>
  );
}

export default Profile;

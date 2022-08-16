import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("https://backend-ujian.herokuapp.com/users");
    setUser(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://backend-ujian.herokuapp.com/users`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5">
      <div className="column is-half">
        <button onClick="history.back" className="button is-success">
          Go Back
        </button>
        <Link to="add" className="button is-success">
          Add New
        </Link>
        <table className="table is-striped is-fullwidth mt-2">
          <thead>
            <tr>
              <th>No</th>
              <th>
                Nama
                <table border="1" width="200px"></table>
              </th>
              <th>NIM</th>
              <th>Kelas</th>
              <th>Semester</th>
              <th>
                Jenis Kelamin
                <table border="1" width="150px"></table>
              </th>
              <th>Alamat</th>
              <th>
                Actions
                <table border="1" width="150px"></table>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.nama}</td>
                <td>{user.nim}</td>
                <td>{user.kelas}</td>
                <td>{user.semester}</td>
                <td>{user.jenis_kelamin}</td>
                <td>{user.alamat}</td>
                <td>
                  <Link to={`edit/${user._id}`} className="button is-info is-small mr-1">
                    Edit
                  </Link>
                  <button onClick={() => deleteUser(user._id)} className="button is-danger is-small">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;

import { useEffect, useState } from "react";
import axios from "axios";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchError();
  }, []);
  const fetchError = async () => {
    try {
      const res = await axios.get("https://userapp6.onrender.com/users");
      setUsers(res.data);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="content">
      <h1 className="title">List of Users</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>User Email</th>
            <th>User Name</th>
            <th>User Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {error && (
            <tr>
              <td colSpan={5}>{error}</td>
            </tr>
          )}
          {users.map((user, index) => {
            return (
              <tr key={user._id || index}>
                <td>{++index}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn btn-primary">Edit &nbsp;</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;

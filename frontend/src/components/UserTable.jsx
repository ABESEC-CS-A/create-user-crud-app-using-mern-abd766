import { useEffect, useState } from "react";
import axios from "axios";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const newUser = [
    {
      email: "",
      name: "",
      role: "",
    },
  ];
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
  async function addUser() {
    try {
      const res = await axios.post("https://userapp6.onrender.com/adduser", {
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      });
    //   setUsers(...users,{ email: "", name: "", role: "" });
      console.log("Response:", res.data);
    } catch (err) {
      console.log("Error:", err.message);
    }
  }

  async function deleteUser(email) {
    const confirm = window.confirm(`Are you sure you want to delete ${email}?`);
    if (!confirm) return;

    if (!email) {
      console.log("Invalid email for deletion.");
      return;
    }
    try {
      const res = await axios.delete(
        `https://userapp6.onrender.com/removeuser/${email}`
      );
      setUsers(users.filter((u) => u.email !== email));
      console.log("Response:", res.data);
    } catch (err) {
      console.log("Error:", err.message);
    }
  }

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
          <tr>
            <th>#</th>
            <th>
              <input
                onChange={(e) => {
                  newUser.email = e.target.value;
                }}
                type="text"
                placeholder="Email"
                className="form-control rounded"
              ></input>
            </th>
            <th>
              <input
                onChange={(e) => {
                  newUser.name = e.target.value;
                }}
                type="text"
                placeholder="Name"
                className="form-control rounded"
              ></input>
            </th>
            <th>
              <input
                onChange={(e) => {
                  newUser.role = e.target.value;
                }}
                type="text"
                placeholder="Role"
                className="form-control rounded"
              ></input>
            </th>
            <th>
              <button onClick={addUser} className="btn btn-primary">
                Add User
              </button>
            </th>
          </tr>
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
                  <button
                    onClick={() => 
                      deleteUser(user.email)
                    }
                    className="btn btn-danger"
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
  );
}

export default UserTable;

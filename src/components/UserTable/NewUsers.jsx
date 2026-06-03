import { useState } from "react";
import AddUserModal from "./AddUserModal";

function Users() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  return (
    <div>

      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
      >
        Add User
      </button>

      {showModal && (
        <AddUserModal
          close={() => setShowModal(false)}
          addUser={addUser}
        />
      )}

      <div className="mt-5 space-y-2">
        {users.map((user, index) => (
          <div
            key={index}
            className="border rounded p-3"
          >
            {user.name} | {user.email}
          </div>
        ))}
      </div>

    </div>
  );
}

export default Users;
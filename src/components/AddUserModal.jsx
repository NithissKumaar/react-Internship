import { useState } from "react";

function AddUserModal({ close }) {

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");

  const submit = (e) => {
    e.preventDefault();

    alert(`User Added\nName: ${name}\nEmail: ${email}`);

    close();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

      <div className="bg-white rounded-2xl p-6 w-[400px]">

        <h2 className="text-xl font-bold mb-5">
          Add User
        </h2>

        <form
          onSubmit={submit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full p-3 border rounded-xl"
          />
          <input
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(e) =>
              setUsernameame(e.target.value)
            }
            className="w-full p-3 border rounded-xl"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-3 border rounded-xl"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="w-full p-3 border rounded-xl"
          />
          <input
            type="text"
            placeholder="website"
            value={website}
            onChange={(e) =>
              setWebsite(e.target.value)
            }
            className="w-full p-3 border rounded-xl"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={close}
              className="px-4 py-2 border rounded-xl"
            >
              Cancel
            </button>

            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-xl"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddUserModal;
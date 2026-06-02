import { useState } from "react";
import { Users as UsersIcon } from 'lucide-react';
import Navbar from '../components/Navbar';
import UserTable from '../components/UserTable';
import AddUserModal from "../components/AddUserModal";

function Users() {
     const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200">
              <UsersIcon size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Users</h1>
              <p className="text-sm text-slate-500">Manage and view all registered users</p>
            </div>
          </div>

          <button onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white
                             bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-xl shadow-md shadow-blue-200
                             transition-all duration-200">
            + Add User
          </button>
        </div>

       {/*usertable file*/}
        <UserTable />

      </main>
      {/* Modal */}

      {
        open &&
        <AddUserModal
          close={() => setOpen(false)}
        />
      }

    </div>
  );
}

export default Users;

import { useEffect } from "react";
import { Plus, Users as UsersIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import UserTable from "../../../components/UserTable/UserTable";
import { fetchUsers } from "../../../redux/thunks/UserThunk";

function Users() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
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

          <button onClick={() => navigate("/users/add")} className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-xl shadow-md shadow-blue-200 transition-all duration-200 cursor-pointer">
            <Plus size={17} /> Add User
          </button>
        </div>

        <UserTable />
      </main>
    </div>
  );
}

export default Users;
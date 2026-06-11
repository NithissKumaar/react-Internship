import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteEmployee } from "../../../redux/reducer/EmployeeReducer";
import { showSuccess } from "../../../utils/toast";
import { Plus, Users, Trash2 } from "lucide-react";

function BasicDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.employees);

  return (
    <div className="p-3 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h1 className="text-lg font-semibold text-slate-800">Employees</h1>
          <p className="text-xs text-slate-500">Manage employees</p>
        </div>
        <button
          onClick={() => navigate("/employee-registration")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md flex items-center gap-2 cursor-pointer transition"
        >
          <Plus size={16} />
          Register Employee
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-white rounded-md p-3 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-xs text-slate-500">No Of Employees</p>
            <h2 className="text-blue-600 text-xl font-semibold mt-1">{employees.length}</h2>
          </div>
          <Users size={20} className="text-blue-600" />
        </div>
      </div>

      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-50 text-slate-700">
                <th className="p-3 text-left">S.NO</th>
                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Department</th>
                <th className="p-3 text-left">Salary</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.length ? (
                employees.map((emp, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition">
                    <td className="p-3">{i + 1}</td>
                    <td className="p-3 font-medium">{emp.name}</td>
                    <td className="p-3">{emp.email}</td>
                    <td className="p-3">{emp.phone}</td>
                    <td className="p-3">
                      <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs">
                        {emp.department}
                      </span>
                    </td>
                    <td className="p-3 text-blue-600">₹{emp.salary}</td>
                    <td className="p-3">
                      <div className="flex justify-center">
                        <button
                          onClick={() => {
                            dispatch(deleteEmployee(i));
                            showSuccess("Employee Deleted");
                          }}
                          className="text-red-500 hover:text-red-700 cursor-pointer transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-10 text-center text-slate-400">
                    No Employees Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BasicDetails;
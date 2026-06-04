import { Users,LayoutDashboard,Activity,ArrowRight } from "lucide-react";
import Navbar from "../Layouts/Navbar";
import { useEffect, useState } from "react";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">

     

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Welcome Section */}

        <section className="rounded-3xl bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white shadow-lg">

          <div className="space-y-3">

            <span className="text-blue-100 text-sm font-medium">
              Dashboard
            </span>

            <h1 className="text-3xl font-bold">
              Welcome Back 👋
            </h1>

            <p className="text-blue-100 max-w-2xl">
              Manage users, monitor activities, and access your dashboard insights in one place.
            </p>

            <button className="mt-3 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:scale-[1.02] transition cursor-pointer">
              Explore Dashboard
              <ArrowRight size={18} />
            </button>

          </div>

        </section>

        {/* Summary Cards */}

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Total Users */}

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500">
                  Total Users
                </p>

                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                  {loading ? "..." : users.length}
                </h2>

              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

                <Users className="text-blue-600" />

              </div>

            </div>

          </div>

          {/* Dashboard Visits */}

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500">
                  Dashboard Visits
                </p>

                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                  2.5K
                </h2>

              </div>

              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">

                <LayoutDashboard className="text-emerald-600" />

              </div>

            </div>

          </div>

          {/* Activity */}

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500">
                  Activity
                </p>

                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                  87%
                </h2>

              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">

                <Activity className="text-purple-600" />

              </div>

            </div>

          </div>

        </section>

        {/* Quick Actions */}

        <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-slate-900">
            Quick Actions
          </h2>

          <div className="mt-5 flex flex-wrap gap-4">

            <button className="px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 transition cursor-pointer">
              Manage Users
            </button>

            <button className="px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 transition cursor-pointer">
              View Reports
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard
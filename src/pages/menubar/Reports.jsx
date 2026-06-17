import { Users, FolderOpen, Clock3, CheckCircle, CircleDashed, FileBarChart } from "lucide-react";

function Reports() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const totalProjects = projects.length;
  const notStarted = projects.filter((p) => p.status === "Not Started").length;
  const inProgress = projects.filter((p) => p.status === "In Progress").length;
  const completed = projects.filter((p) => p.status === "Completed").length;
  const cards = [
    { title: "Total Users", value: users.length, icon: Users },
    { title: "Projects", value: totalProjects, icon: FolderOpen },
    { title: "Not Started", value: notStarted, icon: CircleDashed },
    { title: "In Progress", value: inProgress, icon: Clock3 },
    { title: "Completed", value: completed, icon: CheckCircle },
  ];
  return (
    <div className="min-h-screen">
      <main className="max-full mx-auto ">
      
        <section className="rounded-3xl bg-gradient-to-r from-blue-700 to-blue-500 p-10 text-white shadow-xl border border-blue-400">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-blue-100">Analytics</span>
              <h1 className="text-4xl font-bold mt-2">Reports Dashboard</h1>
              <p className="mt-3 text-blue-100">Monitor project performance and user progress.</p>
            </div>
            <FileBarChart size={70} className="opacity-90" />
          </div>
        </section>
       
        <section className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="group bg-white/80 backdrop-blur-md border border-blue-100 rounded-3xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200 cursor-pointer">
                <div className="flex justify-between">
                  <div>
                    <p className="text-slate-500 text-sm">{card.title}</p>
                    <h2 className="text-4xl font-bold text-slate-900 mt-4 group-hover:text-blue-500 transition-colors duration-200">{card.value}</h2>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                    <Icon size={28} className="text-blue-600" />
                  </div>
                </div>
              </div>
            );
          })}
        </section>
        
        <section className="mt-8 bg-white border border-blue-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Performance Overview</h2>
          <p className="mt-3 text-slate-500">Real-time report generated using local project storage.</p>
        </section>
      </main>
    </div>
  );
}

export default Reports;
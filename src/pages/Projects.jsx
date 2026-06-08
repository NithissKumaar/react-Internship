import { Plus, FolderKanban, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Projects() {
  const navigate = useNavigate();
  const projects = useSelector((s) => s.project.projects);
  const [selected, setSelected] = useState(null);

  const cards = [
    ["No Of Projects", projects.length, FolderKanban],
    ["Last Date", projects.at(-1)?.date || "-", Calendar],
  ];

  return (
    <div className="p-3 bg-slate-50 min-h-screen">
      <div className="flex justify-between mb-3">
        <div>
          <h1 className="text-lg font-semibold">Projects</h1>
          <p className="text-xs text-slate-500">Manage Projects</p>
        </div>

        <button
          onClick={() => navigate("/projects/add")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm flex items-center gap-1 cursor-pointer"
        >
          <Plus size={15} />
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        {cards.map(([t, v, Icon]) => (
          <div
            key={t}
            className="bg-white border border-slate-200 rounded-md p-3 flex justify-between"
          >
            <div>
              <p className="text-xs text-slate-500">{t}</p>
              <h2 className="text-blue-600 font-semibold">{v}</h2>
            </div>
            <Icon className="text-blue-600" />
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-md">
        <table className="w-full text-sm">
          <thead className="bg-blue-50">
            <tr>
              {["S.NO", "Project", "Code", "Date", "Action"].map((x) => (
                <th key={x} className="p-2 text-left">
                  {x}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {projects.length ? (
              projects.map((p, i) => (
                <tr key={p.id} className="border-t border-slate-200">
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.shortcode}</td>
                  <td className="p-2">{p.date}</td>

                  <td className="p-2 relative">
                    <button
                      className="text-blue-600 cursor-pointer"
                      onClick={() =>
                        setSelected(selected?.id === p.id ? null : p)
                      }
                    >
                      View
                    </button>

                    {selected?.id === p.id && (
                      <div className="absolute right-12 top-1/2 -translate-y-1/2 w-72 bg-white border border-slate-200 rounded-lg shadow-lg p-3 z-10">
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-r border-t border-slate-200 rotate-45" />

                        <div className="flex justify-between">
                          <h3 className="text-blue-600 text-sm font-semibold">
                            Details
                          </h3>
                          <button className="cursor-pointer" onClick={() => setSelected(null)}>✕</button>
                        </div>

                        <p className="text-xs text-slate-500 mt-2">Project</p>
                        <p className="font-medium">{p.name}</p>

                        <p className="text-xs text-slate-500 mt-2">
                          Description
                        </p>
                        <p className="text-sm">
                          {p.description || "No Description"}
                        </p>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-5 text-slate-400">
                  No Projects
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
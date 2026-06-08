import { useSelector } from "react-redux";

function ProjectTable() {
  const projects =
    useSelector(
      (state) =>
        state.project.projects
    );

  return (
    <table className="w-full border mt-4">

      <thead>
        <tr>
          <th>Name</th>
          <th>Short Code</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {projects.map((p) => (
          <tr key={p.id}>

            <td>{p.name}</td>

            <td>{p.shortcode}</td>

            <td>{p.date}</td>

          </tr>
        ))}
      </tbody>

    </table>
  );
}

export default ProjectTable;
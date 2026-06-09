const STORAGE = "projects";

const ProjectAPI = {
  getProjects() {
    return JSON.parse(localStorage.getItem(STORAGE)) || [];
  },

  saveProjects(data) {
    localStorage.setItem(STORAGE, JSON.stringify(data));
  },
};

export default ProjectAPI;
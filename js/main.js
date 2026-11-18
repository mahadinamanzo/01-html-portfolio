const featuredContainer = document.querySelector("#featured-projects");
const projectList = document.querySelector("#project-list");
const projectCount = document.querySelector("#project-count");
const emptyState = document.querySelector("#empty-state");
const filterButtons = document.querySelectorAll(".filter-button");

const categoryLabels = {
  frontend: "Frontend",
  php: "PHP & MySQL",
  node: "Node.js",
  nextjs: "Next.js",
};

function createProjectCard(project, index, isFeatured) {
  const article = document.createElement("article");
  article.className = `project-card${isFeatured ? " project-card--featured" : ""}`;

  const topLine = document.createElement("div");
  topLine.className = "card-topline";

  const number = document.createElement("span");
  number.textContent = `${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;

  const tag = document.createElement("span");
  tag.className = "card-tag";
  tag.textContent = categoryLabels[project.category];
  topLine.append(number, tag);

  const title = document.createElement("h4");
  title.textContent = project.title;

  const summary = document.createElement("p");
  summary.className = "summary";
  summary.textContent = project.summary;

  const bottom = document.createElement("div");
  bottom.className = "card-bottom";

  const stack = document.createElement("ul");
  stack.className = "stack-list";
  stack.setAttribute("aria-label", "Technology stack");
  project.stack.forEach((technology) => {
    const item = document.createElement("li");
    item.textContent = technology;
    stack.append(item);
  });

  const links = document.createElement("div");
  links.className = "card-links";
  const repoLink = document.createElement("a");
  repoLink.href = project.repo;
  repoLink.target = "_blank";
  repoLink.rel = "noreferrer";
  repoLink.textContent = "View repository ↗";
  links.append(repoLink);

  if (project.live) {
    const liveLink = document.createElement("a");
    liveLink.href = project.live;
    liveLink.target = "_blank";
    liveLink.rel = "noreferrer";
    liveLink.textContent = "Live site ↗";
    links.append(liveLink);
  }

  bottom.append(stack, links);
  article.append(topLine, title, summary, bottom);
  return article;
}

function renderProjects(category = "all") {
  const visibleProjects = projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => category === "all" || project.category === category);
  const featuredProjects = visibleProjects.filter(({ project }) => project.featured);
  const regularProjects = visibleProjects.filter(({ project }) => !project.featured);

  featuredContainer.replaceChildren(
    ...featuredProjects.map(({ project, index }) => createProjectCard(project, index, true)),
  );
  projectList.replaceChildren(
    ...regularProjects.map(({ project, index }) => createProjectCard(project, index, false)),
  );

  projectCount.textContent = `${visibleProjects.length} ${visibleProjects.length === 1 ? "project" : "projects"}`;
  emptyState.hidden = visibleProjects.length !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    renderProjects(button.dataset.filter);
  });
});

renderProjects();

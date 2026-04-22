const me = requireAuth(["student"]);
document.getElementById("studentName").textContent = me.fullName;

document.getElementById("logoutBtn").addEventListener("click", function (e) {
  e.preventDefault();
  logout();
});

function renderMyApplications() {
  const apps = getApplications().filter((a) => a.studentId === me.id);
  const body = document.getElementById("myApplicationsBody");
  body.innerHTML = "";

  if (apps.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 4;
    td.textContent = "No applications yet. Click Apply to submit your first application.";
    tr.appendChild(td);
    body.appendChild(tr);
    return;
  }

  apps
    .slice()
    .reverse()
    .forEach((a) => {
      const tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" +
        a.id +
        "</td>" +
        "<td>" +
        a.department +
        "</td>" +
        "<td>" +
        a.submittedOn +
        "</td>" +
        "<td>" +
        a.status +
        "</td>";
      body.appendChild(tr);
    });
}

renderMyApplications();


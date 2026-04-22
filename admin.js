const me = requireAuth(["admin"]);
document.getElementById("adminName").textContent = me.fullName;

document.getElementById("logoutBtn").addEventListener("click", function (e) {
  e.preventDefault();
  logout();
});

document
  .getElementById("filterDepartment")
  .addEventListener("change", renderApplications);
document.getElementById("filterStatus").addEventListener("change", renderApplications);

function renderUsers() {
  const body = document.getElementById("usersBody");
  const users = getUsers();
  body.innerHTML = "";

  users.forEach((u) => {
    const tr = document.createElement("tr");
    tr.innerHTML =
      "<td>" +
      u.role +
      "</td>" +
      "<td>" +
      u.fullName +
      "</td>" +
      "<td>" +
      u.email +
      "</td>" +
      "<td>" +
      (u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "") +
      "</td>";
    body.appendChild(tr);
  });
}

function renderApplications() {
  const deptValue = document.getElementById("filterDepartment").value;
  const statusValue = document.getElementById("filterStatus").value;

  const apps = getApplications();
  let filtered = apps;
  if (deptValue) filtered = filtered.filter((a) => a.department === deptValue);
  if (statusValue) filtered = filtered.filter((a) => a.status === statusValue);

  const body = document.getElementById("applicationsBody");
  body.innerHTML = "";

  if (filtered.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 6;
    td.textContent = "No applications found.";
    tr.appendChild(td);
    body.appendChild(tr);
    return;
  }

  filtered
    .slice()
    .reverse()
    .forEach((a) => {
      const tr = document.createElement("tr");

      const statusSelect = document.createElement("select");
      ["Pending", "Approved", "Rejected"].forEach((s) => {
        const opt = document.createElement("option");
        opt.value = s;
        opt.textContent = s;
        if (a.status === s) opt.selected = true;
        statusSelect.appendChild(opt);
      });
      statusSelect.addEventListener("change", function () {
        const all = getApplications();
        const idx = all.findIndex((x) => x.id === a.id);
        if (idx !== -1) {
          all[idx].status = this.value;
          all[idx].updatedAt = new Date().toISOString();
          saveApplications(all);
        }
      });

      const statusTd = document.createElement("td");
      statusTd.appendChild(statusSelect);

      tr.innerHTML =
        "<td>" +
        a.id +
        "</td>" +
        "<td>" +
        (a.studentEmail || "") +
        "</td>" +
        "<td>" +
        a.fullName +
        "</td>" +
        "<td>" +
        a.department +
        "</td>" +
        "<td>" +
        a.submittedOn +
        "</td>";
      tr.appendChild(statusTd);

      body.appendChild(tr);
    });
}

renderUsers();
renderApplications();


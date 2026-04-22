const me = requireAuth(["student"]);
document.getElementById("studentEmail").textContent = me.email;

document.getElementById("logoutBtn").addEventListener("click", function (e) {
  e.preventDefault();
  logout();
});

document.getElementById("fullName").value = me.fullName;

function generateApplicationId() {
  const now = new Date();
  return (
    "ZU-" +
    now.getFullYear().toString().slice(-2) +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    now.getDate().toString().padStart(2, "0") +
    "-" +
    Math.floor(Math.random() * 9000 + 1000)
  );
}

document.getElementById("applyForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = document.getElementById("applyForm");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const apps = getApplications();
  const appId = generateApplicationId();
  apps.push({
    id: appId,
    studentId: me.id,
    studentEmail: me.email,
    fullName: document.getElementById("fullName").value.trim(),
    fatherName: document.getElementById("fatherName").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    dob: document.getElementById("dob").value,
    gender: document.querySelector('input[name="gender"]:checked').value,
    department: document.getElementById("department").value,
    address: document.getElementById("address").value.trim(),
    qualification: document.getElementById("qualification").value,
    status: "Pending",
    submittedOn: new Date().toLocaleDateString(),
    createdAt: new Date().toISOString(),
  });
  saveApplications(apps);

  const msg = document.getElementById("applySuccess");
  msg.textContent = "Application submitted. Your Application ID is " + appId + ".";
  msg.style.display = "block";
  form.reset();
  document.getElementById("fullName").value = me.fullName;
});


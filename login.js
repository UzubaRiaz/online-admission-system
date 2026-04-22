redirectIfLoggedIn();

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  const result = loginWithEmailPassword(email, password);
  const err = document.getElementById("loginError");
  if (!result.ok) {
    err.textContent = result.message;
    err.style.display = "block";
    return;
  }

  window.location.href = result.user.role === "admin" ? "/admin/index.html" : "/student/index.html";
});


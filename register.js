redirectIfLoggedIn();

document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const fullName = document.getElementById("regFullName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;
  const confirm = document.getElementById("regConfirm").value;

  const err = document.getElementById("regError");
  const ok = document.getElementById("regSuccess");
  err.style.display = "none";
  ok.style.display = "none";

  if (password !== confirm) {
    err.textContent = "Passwords do not match.";
    err.style.display = "block";
    return;
  }

  const result = registerStudent({ fullName, email, password });
  if (!result.ok) {
    err.textContent = result.message;
    err.style.display = "block";
    return;
  }

  ok.textContent = "Account created successfully. Please login.";
  ok.style.display = "block";
  document.getElementById("registerForm").reset();
});


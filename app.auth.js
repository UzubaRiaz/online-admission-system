function pathTo(page) {
  return "/" + page + "/index.html";
}

function requireAuth(allowedRoles) {
  const session = getSession();
  if (!session || !session.userId) {
    window.location.href = pathTo("login");
    return;
  }

  const users = getUsers();
  const me = users.find((u) => u.id === session.userId);
  if (!me) {
    clearSession();
    window.location.href = pathTo("login");
    return;
  }

  if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    if (!allowedRoles.includes(me.role)) {
      window.location.href = me.role === "admin" ? pathTo("admin") : pathTo("student");
      return;
    }
  }

  return me;
}

function logout() {
  clearSession();
  window.location.href = pathTo("login");
}

function loginWithEmailPassword(email, password) {
  const users = getUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) return { ok: false, message: "Invalid email or password." };

  setSession({ userId: user.id, role: user.role, at: new Date().toISOString() });
  return { ok: true, user };
}

function registerStudent({ fullName, email, password }) {
  const users = getUsers();
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) return { ok: false, message: "Email already registered." };

  const user = {
    id: crypto.randomUUID(),
    role: "student",
    fullName,
    email,
    password,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  saveUsers(users);
  return { ok: true, user };
}

function redirectIfLoggedIn() {
  const session = getSession();
  if (!session || !session.userId) return;

  const users = getUsers();
  const me = users.find((u) => u.id === session.userId);
  if (!me) return;

  window.location.href = me.role === "admin" ? pathTo("admin") : pathTo("student");
}


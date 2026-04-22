const DB_KEYS = {
  users: "ams_users",
  applications: "ams_applications",
  session: "ams_session",
};

function loadJSON(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function ensureSeedData() {
  const users = loadJSON(DB_KEYS.users, []);
  const hasAdmin = users.some((u) => u.role === "admin");

  if (!hasAdmin) {
    users.push({
      id: crypto.randomUUID(),
      role: "admin",
      fullName: "System Admin",
      email: "admin@zu.edu.pk",
      password: "admin123",
      createdAt: new Date().toISOString(),
    });
    saveJSON(DB_KEYS.users, users);
  }

  const apps = loadJSON(DB_KEYS.applications, null);
  if (!Array.isArray(apps)) {
    saveJSON(DB_KEYS.applications, []);
  }
}

function getUsers() {
  return loadJSON(DB_KEYS.users, []);
}

function saveUsers(users) {
  saveJSON(DB_KEYS.users, users);
}

function getApplications() {
  return loadJSON(DB_KEYS.applications, []);
}

function saveApplications(applications) {
  saveJSON(DB_KEYS.applications, applications);
}

function getSession() {
  return loadJSON(DB_KEYS.session, null);
}

function setSession(session) {
  saveJSON(DB_KEYS.session, session);
}

function clearSession() {
  localStorage.removeItem(DB_KEYS.session);
}

ensureSeedData();


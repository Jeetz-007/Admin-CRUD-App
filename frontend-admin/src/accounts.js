document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  const emailEl = document.getElementById("adminEmail");
  const token = localStorage.getItem("adminToken");

  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    emailEl.textContent = payload.email || "admin@store.com";
  }

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("adminToken");
    window.location.href = "login.html";
  });
});

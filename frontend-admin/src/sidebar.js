const path = window.location.pathname;

if (path.includes("dashboard.html")) {
  document.getElementById("nav-dashboard")?.classList.add("bg-gray-700");
}

if (path.includes("products.html")) {
  document.getElementById("nav-products")?.classList.add("bg-gray-700");
}

if (path.includes("accounts.html")) {
  document.getElementById("nav-accounts")?.classList.add("bg-gray-700");
}
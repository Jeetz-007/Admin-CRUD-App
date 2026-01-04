document.addEventListener("DOMContentLoaded", async () => {
  const API_URL = "http://localhost:5001/api/products";
  const productCountEl = document.getElementById("productCount");
  const logoutBtn = document.getElementById("logoutBtn");

  try {
    const res = await fetch(API_URL);
    const products = await res.json();

    productCountEl.textContent = products.length;
  } catch (err) {
    productCountEl.textContent = "Error";
  }

  // Logout
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("adminToken");
    window.location.href = "login.html";
  });
});

const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        errorMsg.textContent = data.message || "Login failed";
        errorMsg.classList.remove("hidden");
        return;
      }

      // saving JWT
      localStorage.setItem("adminToken", data.token);

      window.location.href = "dashboard.html";

    } catch (err) {
      errorMsg.textContent = "Server error";
      errorMsg.classList.remove("hidden");
    }
  });
}
console.log("This script is loaded.....")

document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://localhost:5001/api/products";
  const token = localStorage.getItem("adminToken");

  const tableBody = document.getElementById("productsTable");
  const loadingText = document.getElementById("loadingText");
  const logoutBtn = document.getElementById("logoutBtn");

  const form = document.getElementById("productForm");
  const formTitle = document.getElementById("formTitle");

  const productIdInput = document.getElementById("productId");
  const nameInput = document.getElementById("name");
  const brandInput = document.getElementById("brand");
  const priceInput = document.getElementById("price");
  const stockInput = document.getElementById("stock");

  let productsCache = [];

  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className =
      "fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow z-50";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }

  function resetForm() {
    form.reset();
    productIdInput.value = "";
    formTitle.textContent = "Add Product";
  }


// fetching products
  async function fetchProducts() {
    loadingText.style.display = "block";
    tableBody.innerHTML = "";

    try {
      const res = await fetch(API_URL);
      const products = await res.json();

      productsCache = products;
      loadingText.style.display = "none";

      if (products.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="5" class="px-4 py-6 text-center text-gray-400">
              No products found. Add your first product.
            </td>
          </tr>
        `;
        return;
      }

      products.forEach((p) => {
        const tr = document.createElement("tr");
        tr.className = "border-b border-gray-700";

        tr.innerHTML = `
          <td class="px-4 py-3">${p.name}</td>
          <td class="px-4 py-3">${p.brand || "-"}</td>
          <td class="px-4 py-3">₹${p.price}</td>
          <td class="px-4 py-3">${p.stock ?? "-"}</td>
          <td class="px-4 py-3 space-x-2">
            <button
              data-id="${p._id}"
              class="edit-btn bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm"
            >
              Edit
            </button>
            <button
              data-id="${p._id}"
              class="delete-btn bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
            >
              Delete
            </button>
          </td>
        `;

        tableBody.appendChild(tr);
      });

      bindRowActions();
    } catch (err) {
      loadingText.textContent = "Failed to load products";
    }
  }

  /* creating and updating products*/

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // const submitBtn = form.querySelector("button");
    const submitBtn = document.getElementById("saveProductBtn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Saving...";

    const payload = {
      name: nameInput.value,
      brand: brandInput.value,
      price: Number(priceInput.value),
      stock: Number(stockInput.value),
    };

    const id = productIdInput.value;
    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      showToast(id ? "Product updated" : "Product created");
      resetForm();
      fetchProducts();
    } catch (err) {
      alert("Something went wrong");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Save Product";
    }
  });

  /* editing and deleting products */

  function bindRowActions() {
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.onclick = () => {
        const product = productsCache.find(
          (p) => p._id === btn.dataset.id
        );

        productIdInput.value = product._id;
        nameInput.value = product.name;
        brandInput.value = product.brand || "";
        priceInput.value = product.price;
        stockInput.value = product.stock || "";

        formTitle.textContent = "Edit Product";
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.onclick = async () => {
        if (!confirm("Delete this product?")) return;

        await fetch(`${API_URL}/${btn.dataset.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        showToast("Product deleted");
        fetchProducts();
      };
    });
  }

  /* logging out and redirecting to login page */
  logoutBtn.onclick = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "login.html";
  };


  // intitation
  fetchProducts();
});

import { getProducts, createProduct, updateProduct, deleteProduct } from "../Service/index.js";

document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("product-form-container");
  const form = document.getElementById("product-form");
  const btnNew = document.getElementById("btn-new-product");
  const btnCancel = document.getElementById("btn-cancel");
  const successAlert = document.getElementById("success-alert");
  const errorAlert = document.getElementById("error-alert");
  const tableBody = document.getElementById("products-table-body");
  const formTitle = document.getElementById("form-title");

  let editingId = null;

  btnNew.addEventListener("click", () => {
    form.reset();
    editingId = null;
    formTitle.textContent = "Agregar Producto";
    formContainer.style.display = "block";
  });

  btnCancel.addEventListener("click", () => {
    formContainer.style.display = "none";
  });

  async function loadProducts() {
    try {
      const products = await getProducts();
      tableBody.innerHTML = "";

      products.forEach((p) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${p.id}</td>
          <td>${p.nombreProducto}</td>
          <td>${p.categoriaProducto}</td>
          <td>${p.descripcionProducto}</td>
          <td>${p.precioProducto}</td>
          <td>${p.stockProducto}</td>
          <td class="btn-actions">
            <button class="btn btn-sm btn-warning btn-edit">Editar</button>
            <button class="btn btn-sm btn-danger btn-delete">Eliminar</button>
          </td>
        `;

        row.querySelector(".btn-edit").addEventListener("click", () => {
          editingId = p.id;
          formTitle.textContent = "Editar Producto";
          formContainer.style.display = "block";
          document.getElementById("product-name").value = p.nombreProducto;
          document.getElementById("product-category").value = p.categoriaProducto;
          document.getElementById("product-description").value = p.descripcionProducto;
          document.getElementById("product-price").value = p.precioProducto;
          document.getElementById("product-stock").value = p.stockProducto;
        });

        row.querySelector(".btn-delete").addEventListener("click", async () => {
          if (confirm("¿Seguro que deseas eliminar este producto?")) {
            try {
              await deleteProduct(p.id);
              showAlert(successAlert, "Producto eliminado correctamente.");
              loadProducts();
            } catch {
              showAlert(errorAlert, "Error al eliminar producto.");
            }
          }
        });

        tableBody.appendChild(row);
      });
    } catch {
      showAlert(errorAlert, "Error al cargar los productos.");
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const product = {
      nombreProducto: document.getElementById("product-name").value,
      categoriaProducto: document.getElementById("product-category").value,
      descripcionProducto: document.getElementById("product-description").value,
      precioProducto: parseFloat(document.getElementById("product-price").value),
      stockProducto: parseInt(document.getElementById("product-stock").value),
    };

    try {
      if (editingId) {
        await updateProduct(editingId, product);
        showAlert(successAlert, "Producto actualizado correctamente.");
      } else {
        await createProduct(product);
        showAlert(successAlert, "Producto agregado correctamente.");
      }
      formContainer.style.display = "none";
      form.reset();
      loadProducts();
    } catch {
      showAlert(errorAlert, "Error al guardar el producto.");
    }
  });

  function showAlert(element, message) {
    element.textContent = message;
    element.style.display = "block";
    setTimeout(() => (element.style.display = "none"), 3000);
  }

  loadProducts();
});
const API_URL = "https://retoolapi.dev/zcrU3A/recu_2025";

export async function getProducts() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener productos");
  return response.json();
}

export async function createProduct(product) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error("Error al crear producto");
  return response.json();
}

export async function updateProduct(id, product) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error("Error al actualizar producto");
  return response.json();
}

export async function deleteProduct(id) {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Error al eliminar producto");
  return true;
}
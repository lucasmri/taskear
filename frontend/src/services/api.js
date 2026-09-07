const API_URL = "http://localhost:8080";

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const resposta = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (resposta.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    window.location.href = "/";
  }

  return resposta;
}

export { API_URL };

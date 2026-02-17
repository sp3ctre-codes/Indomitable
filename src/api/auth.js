export async function loginUser(email, password) {
  const res = await fetch("http://127.0.0.1:8000/api/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: email, password }),
  });

  if (!res.ok) throw new Error("Login failed");

  const data = await res.json();
  localStorage.setItem("access_token", data.access);
  localStorage.setItem("refresh_token", data.refresh);

  return data;
}

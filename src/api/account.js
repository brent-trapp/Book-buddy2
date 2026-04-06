const API = import.meta.env.VITE_API;

export async function getUser(token) {
  const response = await fetch(API + "/users/me", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  if (!response.ok) {
    throw Error(result.message);
  }
  return result;
}

export async function getReservations(token) {
  const response = await fetch(API + "/reservations", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  if (!response.ok) {
    throw Error(result.message);
  }
  return result;
}

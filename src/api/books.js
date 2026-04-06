const API = import.meta.env.VITE_API;

export async function getBooks() {
  try {
    const response = await fetch(API + "/books");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function reserveBook(token, id) {
  try {
    const response = await fetch(API + "/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ bookId: id }),
    });
    const data = response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
  } catch (e) {
    console.error(e);
  }
}

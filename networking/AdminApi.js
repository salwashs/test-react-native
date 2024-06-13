import { AdminUrl } from "./urls";

/**
 *
 * @param {Object} data
 * @param {string} data.username
 * @param {string} data.email
 * @param {string} data.password
 */
export async function createAdmin(data) {
  const { username, email, password } = data;
  if (
    !username ||
    username.trim() === "" ||
    !email ||
    email.trim() === "" ||
    !password ||
    password.trim() === ""
  ) {
    throw new Error("Input Empty");
  }

  try {
    const dataAdmin = await findByEmail(email);

    if (dataAdmin && dataAdmin.length > 0) {
      throw new Error("Data already exists");
    }

    const newAdmin = await fetch(AdminUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    if (!newAdmin.ok) {
      throw new Error("Error create");
    }

    const registeredAdmin = await newAdmin.json();

    return registeredAdmin;
  } catch (error) {
    console.log("🚀 ~ createAdmin ~ error:", error);
    throw new Error("failed create admin");
  }
}

export async function findByEmail(email) {
  try {
    const dataAdmin = await fetch(AdminUrl + `?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!dataAdmin.ok) {
      throw new Error("failed fetch data");
    }

    const admin = await dataAdmin.json();
    console.log("🚀 ~ findByEmail ~ admin:", admin);

    return admin;
  } catch (error) {
    console.log("🚀 ~ findByEmail ~ error:", error);
    throw new Error("Internal Server Error");
  }
}

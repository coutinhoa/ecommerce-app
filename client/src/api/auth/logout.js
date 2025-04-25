export const logout = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch('http://localhost:8082/api/v1/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error("Logout request failed.");
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return { message: "Logout successful" };
  } catch (error) {
    throw new Error(error);
  }
};

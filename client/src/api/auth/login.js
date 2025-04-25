export const login = async (username, password) => {
    const response = await fetch('http://localhost:8082/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if(!response.ok) {
        throw new Error("Login request failed.");
      }

      const result = await response.json();
      localStorage.setItem("token", result.tokens[0].token);
      localStorage.setItem("user", JSON.stringify(result));
      return result;
}
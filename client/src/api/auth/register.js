export const register = async (formData) => {
      const response = await fetch('http://localhost:8082/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if(!response.ok) {
        throw new Error("Registration failed.");
      }

      const result = await response.json();
      localStorage.setItem("token", result.tokens[0].token);
      localStorage.setItem("user", JSON.stringify(result));
      return result;
}
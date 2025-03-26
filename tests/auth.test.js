const fetch = require("node-fetch");

// Configuration
const BASE_URL = "http://localhost:3000/api/auth";
const headers = {
  "Content-Type": "application/json",
};

describe("API Authentication Test Suite", () => {
  let cookie;

  // 1. API login fail
  test("Login should fail with non-existent username", async () => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        username: "Boo!!",
        password: "ATestPassword",
      }),
    });
    const text = await response.text();
    expect(text).toBe("No account of given username");
  });

  // 2. API create account bad username short
  test("Create account should fail with short username", async () => {
    const response = await fetch(`${BASE_URL}/manage`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        username: "No",
        password: "ATestPassword",
      }),
    });
    const text = await response.text();
    expect(text).toBe("Username must be 3-15 characters");
  });

  // 3. API create account bad username long
  test("Create account should fail with long username", async () => {
    const response = await fetch(`${BASE_URL}/manage`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        username: "SuperLongUsernameThatShouldFail",
        password: "ATestPassword",
      }),
    });
    const text = await response.text();
    expect(text).toBe("Username must be 3-15 characters");
  });

  // 4. API create account bad password short
  test("Create account should fail with short password", async () => {
    const response = await fetch(`${BASE_URL}/manage`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        username: "Boo!!",
        password: "No",
      }),
    });
    const text = await response.text();
    expect(text).toBe("Password must be 5-20 characters");
  });

  // 5. API create account bad password long
  test("Create account should fail with long password", async () => {
    const response = await fetch(`${BASE_URL}/manage`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        username: "Boo!!",
        password: "SuperLongPasswordThatShouldFail",
      }),
    });
    const text = await response.text();
    expect(text).toBe("Password must be 5-20 characters");
  });

  // 6. API create account work
  test("Create account should succeed with valid credentials", async () => {
    const response = await fetch(`${BASE_URL}/manage`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        username: "Boo!!",
        password: "ATestPassword",
      }),
    });
    const text = await response.text();
    expect(text).toBe("User created");
  });

  // 7. API login bad credentials
  test("Login should fail with incorrect username", async () => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        username: "Boo !!",
        password: "ATestPassword",
      }),
    });
    const text = await response.text();
    expect(text).toBe("No account of given username");
  });

  // 8. API login work
  test("Login should succeed with valid credentials", async () => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        username: "Boo!!",
        password: "ATestPassword",
      }),
    });
    const text = await response.text();
    cookie = response.headers.get("set-cookie");
    expect(text).toBe("User logged in");
  });

  // 9. API login check cookie same
  test("Login should return same cookie on subsequent login", async () => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        username: "Boo!!",
        password: "ATestPassword",
      }),
    });
    const text = await response.text();
    const newCookie = response.headers.get("set-cookie");
    expect(text).toBe("User logged in");
    expect(newCookie).toBe(cookie);
  });

  // 10. API logout cookie working
  test("Logout should succeed with valid cookie", async () => {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      headers: { ...headers, Cookie: cookie },
    });
    const text = await response.text();
    expect(text).toBe("Logged out successfully");
  });

  // 11. API logout cookie gone not working
  test("Logout should fail without valid cookie", async () => {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      headers,
    });
    const text = await response.text();
    expect(text).toBe("Not logged in");
  });

  // 12. API delete account wrong cookie fail
  test("Delete account should fail with wrong cookie", async () => {
    const response = await fetch(`${BASE_URL}/manage`, {
      method: "DELETE",
      headers: { ...headers, Cookie: "token=fake-invalid-token" },
    });
    const text = await response.text();
    expect(response.status).toBe(401);
    expect(text).toBe("Not authorized");
  });

  // 13. API delete account no cookie fail
  test("Delete account should fail without cookie", async () => {
    // Create and login to get a valid cookie
    await fetch(`${BASE_URL}/manage`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        username: "DeleteTest",
        password: "ATestPassword",
      }),
    });
    await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        username: "DeleteTest",
        password: "ATestPassword",
      }),
    });

    const response = await fetch(`${BASE_URL}/manage`, {
      method: "DELETE",
      headers: { ...headers },
    });
    const text = await response.text();
    expect(response.status).toBe(409);
    expect(text).toBe("Not logged in");
  });

  // 14. API Update password account fail
  test("Update account password should fail with same passwor2d", async () => {
    // Login to get a valid cookie
    let response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        username: "Boo!!",
        password: "ATestPassword",
      }),
    });

    cookie = response.headers.get("set-cookie");

    response = await fetch(`${BASE_URL}/manage`, {
      method: "POST",
      headers: { ...headers, Cookie: cookie },
      body: JSON.stringify({
        password: "ATestPassword",
      }),
    });
    const text = await response.text();
    expect(response.status).toBe(409);
    expect(text).toBe("Existing user");
  });

  // 15. API Update password account succeed
  test("Update account password should fail succeed with different password", async () => {
    response = await fetch(`${BASE_URL}/manage`, {
      method: "POST",
      headers: { ...headers, Cookie: cookie },
      body: JSON.stringify({
        password: "ANewPassword",
      }),
    });
    const text = await response.text();
    expect(response.status).toBe(200);
    expect(text).toBe("Password updated");
  });

  // 16. Cleanup
  test("Cleanup", async () => {
    await fetch(`${BASE_URL}/manage`, {
      method: "DELETE",
      headers: { ...headers, Cookie: cookie },
    });

    loginResponse = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        username: "DeleteTest",
        password: "ATestPassword",
      }),
    });
    deleteCookie = loginResponse.headers.get("set-cookie");
    let response = await fetch(`${BASE_URL}/manage`, {
      method: "DELETE",
      headers: { ...headers, Cookie: deleteCookie },
      body: JSON.stringify({
        username: "DeleteTest",
      }),
    });
    const text = await response.text();
    expect(response.status).toBe(200);
    expect(text).toBe("Deleted Account successfully");
  });
});

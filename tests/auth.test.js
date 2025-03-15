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
    expect(text).toBe("Username does not conform to standards");
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
    expect(text).toBe("Username does not conform to standards");
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
    expect(text).toBe("Password does not conform to standards");
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
    expect(text).toBe("Password does not conform to standards");
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
      body: JSON.stringify({
        username: "Boo!!",
      }),
    });
    const text = await response.text();
    expect(text).toBe("Logged out successfully");
  });

  // 11. API logout cookie gone not working
  test("Logout should fail without valid cookie", async () => {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        username: "Boo!!",
      }),
    });
    const text = await response.text();
    expect(text).toBe("Not logged in");
  });
});

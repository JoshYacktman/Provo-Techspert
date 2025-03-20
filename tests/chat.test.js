const fetch = require("node-fetch");

// Configuration
const AUTH_BASE_URL = "http://localhost:3000/api/auth";
const CHAT_BASE_URL = "http://localhost:3000/api/chat";
const headers = {
  "Content-Type": "application/json",
};

describe("API Chat Test Suite", () => {
  let cookie;

  // 1. API create chat
  test("Create chat should succeed with proper credentials", async () => {
    // Create and login to get a valid cookie
    await fetch(`${AUTH_BASE_URL}/manage`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        username: "DeleteMe",
        password: "ATestPassword",
      }),
    });
    const loginResponse = await fetch(`${AUTH_BASE_URL}/login`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        username: "DeleteMe",
        password: "ATestPassword",
      }),
    });

    cookie = loginResponse.headers.get("set-cookie");

    const response = await fetch(`${CHAT_BASE_URL}/manage`, {
      method: "POST",
      headers: { ...headers, Cookie: cookie },
      body: JSON.stringify({
        username: "DeleteMe",
        chatName: "Test chat",
      }),
    });
    const text = await response.text();
    expect(response.status).toBe(200);
    expect(text).toBe("Successfully created chat: Test chat - DeleteMe");
  });

  // 2. API create chat too short
  test("Create chat should fail with too short chat name", async () => {
    const response = await fetch(`${CHAT_BASE_URL}/manage`, {
      method: "POST",
      headers: { ...headers, Cookie: cookie },
      body: JSON.stringify({
        username: "DeleteMe",
        chatName: "Too", // 3 characters, less than 5
      }),
    });
    const text = await response.text();
    expect(response.status).toBe(400);
    expect(text).toBe("Chat name must be 5-15 characters");
  });

  // 3. API create chat too long
  test("Create chat should fail with too long chat name", async () => {
    const response = await fetch(`${CHAT_BASE_URL}/manage`, {
      method: "POST",
      headers: { ...headers, Cookie: cookie },
      body: JSON.stringify({
        username: "DeleteMe",
        chatName: "ThisChatNameIsWayTooLong", // 24 characters, more than 15
      }),
    });
    const text = await response.text();
    expect(response.status).toBe(400);
    expect(text).toBe("Chat name must be 5-15 characters");
  });
});

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

  // 4. Get chat list work
  test("Get chat list should succeed with proper credentials", async () => {
    const response = await fetch(`${CHAT_BASE_URL}/list`, {
      method: "GET",
      headers: { ...headers, Cookie: cookie },
    });
    expect(response.status).toBe(200);
  });

  // 5. Send message fail
  test("Send message should fail with message starting with $", async () => {
    const response = await fetch(`${CHAT_BASE_URL}/message`, {
      method: "POST",
      headers: {
        ...headers,
        Cookie: cookie,
      },
      body: JSON.stringify({
        chatName: "Test chat - DeleteMe",
        message: "$ Money yo",
      }),
    });
    const text = await response.text();
    expect(response.status).toBe(400);
    expect(text).toBe("Inputs cannot start with '$'");
  });

  // 6. Send message work
  test("Send message should work with proper info", async () => {
    const response = await fetch(`${CHAT_BASE_URL}/message`, {
      method: "POST",
      headers: {
        ...headers,
        Cookie: cookie,
      },
      body: JSON.stringify({
        chatName: "Test chat - DeleteMe",
        message: "Money yo",
      }),
    });
    const text = await response.text();
    expect(response.status).toBe(200);
    expect(text).toBe("Message added");
  });

  // 7. Get list chats work
  test("Get chat list should work with proper info", async () => {
    const response = await fetch(`${CHAT_BASE_URL}/list`, {
      method: "GET",
      headers: {
        ...headers,
        Cookie: cookie,
      },
    });
    const text = await response.text();
    expect(response.status).toBe(200);
    expect(text).toContain("Test chat - DeleteMe");
  });

  // 8. Delete chat work
  test("Delete chat should work with proper creds", async () => {
    const response = await fetch(`${CHAT_BASE_URL}/manage`, {
      method: "DELETE",
      headers: {
        ...headers,
        Cookie: cookie,
      },
      body: JSON.stringify({
        chatName: "Test chat - DeleteMe",
      }),
    });
    const text = await response.text();
    expect(response.status).toBe(200);
    expect(text).toBe("Chat deleted");
  });

  // 9. Cleanup test account
  test("Cleanup test account", async () => {
    const loginResponse = await fetch(`${AUTH_BASE_URL}/login`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        username: "DeleteMe",
        password: "ATestPassword",
      }),
    });
    const deleteCookie = loginResponse.headers.get("set-cookie");

    const response = await fetch(`${AUTH_BASE_URL}/manage`, {
      method: "DELETE",
      headers: { ...headers, Cookie: deleteCookie },
    });
    const text = await response.text();
    expect(response.status).toBe(200);
    expect(text).toBe("Deleted Account successfully");
  });
});

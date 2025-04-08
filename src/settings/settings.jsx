import React, { useState } from "react";
import { Header } from "../components";
import "./settings.css";

const headers = {
  "Content-Type": "application/json",
};

function SettingsDropdownOptions() {
  const [signOutText, setSignOutText] = useState("Sign Out");

  async function handleSignOut() {
    setSignOutText("Disconnecting...");

    try {
      const response = await fetch(
        `https://provotechspert.click/api/auth/logout`,
        {
          method: "POST",
          headers,
        },
      );

      const text = await response.text();

      if (text === "Not logged in") {
        localStorage.removeItem("username");
        window.location.href = "/";
      } else if (text !== "Logged out successfully") {
        alert(text);
        setSignOutText("Sign Out");
        return;
      }

      localStorage.removeItem("username");
      window.location.href = "/";
    } catch (error) {
      alert("An error occurred. Please try again.");
      setSignOutText("Sign Out");
    }
  }

  return (
    <div>
      <button
        className="main_text very_small"
        onClick={() => (window.location.href = "/chat/")}
      >
        Chat
      </button>
      <button className="main_text very_small" onClick={handleSignOut}>
        {signOutText}
      </button>
    </div>
  );
}

async function changePasswordClicked(setButtonText) {
  var newPassword = document.getElementById("newPasswordInput").value;
  setButtonText("Updating...");
  let response = await fetch(`https://provotechspert.click/api/auth/manage`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      password: newPassword,
    }),
  });
  let text = await response.text();
  setButtonText("Change Password");

  if (text !== "Password updated") {
    return alert("Password is same as old password");
  }
  alert("Success updating password");
}

async function deleteAccountClicked(setButtonText) {
  setButtonText("Deleting...");
  let response = await fetch(`https://provotechspert.click/api/auth/manage`, {
    method: "DELETE",
    headers,
  });
  let text = await response.text();
  setButtonText("Delete Account");

  if (text !== "Deleted Account successfully") {
    return alert(text);
  }
  localStorage.removeItem("username");
  window.location.href = "/";
}

function Settings() {
  const userName = localStorage.getItem("username");
  const [passwordButtonText, setPasswordButtonText] =
    useState("Change Password");
  const [deleteButtonText, setDeleteButtonText] = useState("Delete Account");

  if (userName == null) {
    window.location.href = "/";
  }

  return (
    <div className="work_area" style={{ overflowY: "auto" }}>
      <Header OptionsMenu={SettingsDropdownOptions} userName={userName} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1em",
          flexGrow: "1",
        }}
      >
        <form>
          <div className="shadow_down corner_rounding section_div">
            <label className="medium complementary_font_shadow main_label">
              New Password:
            </label>
            <input
              id="newPasswordInput"
              type="password"
              placeholder="Enter new password"
              className="small corner_rounding bordered_message_font shadow_down main_input"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setPasswordButtonText();
                }
              }}
            />
            <button
              type="button"
              className="small corner_rounding main_text shadow_down main_button"
              onClick={() => changePasswordClicked(setPasswordButtonText)}
            >
              {passwordButtonText}
            </button>
          </div>
        </form>
        <form>
          <div className="shadow_down corner_rounding section_div">
            <label className="medium complementary_font_shadow main_label">
              Delete Account?
            </label>
            <button
              type="button"
              className="small corner_rounding main_text shadow_down main_button"
              onClick={() => deleteAccountClicked(setDeleteButtonText)}
            >
              {deleteButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;

import React from "react";
import { Header } from "../components";
import "./settings.css";

const headers = {
  "Content-Type": "application/json",
};

async function SignOutButtonClicked() {
  let response = await fetch(`http://localhost:3000/api/auth/logout`, {
    method: "POST",
    headers,
  });
  let text = await response.text();
  if (text !== "Logged out successfully") {
    return alert(text);
  }

  localStorage.removeItem("username");
  window.location.href = "/";
}
function ChatButtonClicked() {
  window.location.href = "/chat/";
}

function SettingsDropdownOptions() {
  return (
    <div>
      <button className="main_text very_small" onClick={ChatButtonClicked}>
        Chat
      </button>
      <button className="main_text very_small" onClick={SignOutButtonClicked}>
        Sign Out
      </button>
    </div>
  );
}

async function changePasswordClicked() {
  var newPassword = document.getElementById("newPasswordInput").value;
  let response = await fetch(`http://localhost:3000/api/auth/manage`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      password: newPassword,
    }),
  });
  let text = await response.text();
  if (text !== "Password updated") {
    return alert("Password is same as old password");
  }
  alert("Success updating password");
}

async function deleteAccountClicked() {
  let response = await fetch(`http://localhost:3000/api/auth/manage`, {
    method: "DELETE",
    headers,
  });
  let text = await response.text();
  if (text !== "Deleted Account successfully") {
    return alert(text);
  }
  localStorage.removeItem("username");
  window.location.href = "/";
}

function Settings() {
  const userName = localStorage.getItem("username");
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
        {/* TODO: Rework the looks of this page */}
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
            />
            <button
              type="button"
              className="small corner_rounding main_text shadow_down main_button"
              onClick={changePasswordClicked}
            >
              Change Password
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
              onClick={deleteAccountClicked}
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;

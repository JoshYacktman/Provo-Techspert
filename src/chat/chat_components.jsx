import React, { useState } from "react";

function SignOutButtonClicked() {
  localStorage.removeItem("username");
  window.location.href = "/";
}
function SettingsButtonClicked() {
  window.location.href = "/settings/";
}

export function ChatDropdownOptions() {
  return (
    <div>
      <button className="main_text very_small" onClick={SettingsButtonClicked}>
        Settings
      </button>
      <button className="main_text very_small" onClick={SignOutButtonClicked}>
        Sign Out
      </button>
    </div>
  );
}

export function ChatButton({ text, setChat, deleteChat }) {
  return (
    <div
      className="shadow_down rounded"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        padding: "0.2em",
        marginBottom: ".6em",
      }}
    >
      <button
        style={{ width: "100%" }}
        className="small message_font left_rounded"
        onClick={() => setChat(text)}
      >
        {text}
      </button>
      <button
        className="small message_font right_rounded"
        style={{ height: "auto" }}
        onClick={() => deleteChat(text)}
      >
        &times;
      </button>
    </div>
  );
}

export function LeftSideMessageDiv({ children }) {
  return (
    <div
      style={{
        padding: "1em",
        maxWidth: "55%",
      }}
    >
      {children}
    </div>
  );
}
export function LeftSideMessageHeading({ username }) {
  return <h5 className="normal message_font green_header">{username}</h5>;
}
export function LeftSideBubble({ children }) {
  return (
    <p className="small message_font green_bubble shadow_down">{children}</p>
  );
}

export function RightSideMessageDiv({ children }) {
  return (
    <div
      style={{
        padding: "1em",
        textAlign: "right",
        maxWidth: "55%",
        marginLeft: "auto",
      }}
    >
      {children}
    </div>
  );
}

export function RightSideMessageHeading({ username }) {
  return <h5 className="normal message_font blue_header">{username}</h5>;
}

export function RightSideBubble({ children }) {
  return (
    <p className="small message_font blue_bubble shadow_down">{children}</p>
  );
}

export function ChatPopUp({ createChat }) {
  function closePopup() {
    document.getElementById("popupOverlay").style.display = "none";
  }
  const [chatName, setChatName] = useState("");

  const isValid = chatName.length >= 5 && chatName.length <= 15;

  function makeChat() {
    createChat(chatName);
    closePopup();
    setChatName("");
  }

  return (
    <div style={{ position: "relative", zIndex: 3 }}>
      <div className="overlay" id="popupOverlay" onClick={closePopup}>
        <div className="popup" onClick={(event) => event.stopPropagation()}>
          <div className="popup-header">
            <p
              className="header_text complementary_font medium"
              style={{ textShadow: "0em .1em .9em #e8a61b" }}
            >
              Chat Name:
            </p>
            <button
              className="small message_font small_corner_rounding shadow_down"
              onClick={closePopup}
              style={{ margin: ".3em", textAlign: "center" }}
            >
              &times;
            </button>
          </div>
          <input
            type="text"
            id="newChatInput"
            placeholder="Broken..."
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                makeChat();
              }
            }}
            className="small message_font shadow_down corner_rounding"
            style={{
              width: "100%",
              backgroundColor: "linen",
              marginRight: "0.3em",
              padding: ".5em",
            }}
          />
          <button
            style={{ marginTop: "0.3em" }}
            className="small main_text small_corner_rounding shadow_down close_popup_button"
            onClick={makeChat}
            disabled={!isValid}
          >
            Create Chat
          </button>
        </div>
      </div>
    </div>
  );
}

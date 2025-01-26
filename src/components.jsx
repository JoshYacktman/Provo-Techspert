import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// TODO: Make these three functional
function JoinButtonClicked() {
  window.location.href = "/chat/";
}

function SignInButtonClicked() {
  window.location.href = "/chat/";
}

function SignOutButtonClicked() {
  window.location.href = "/";
}

// Naviagtion
function ChatButtonClicked() {
  window.location.href = "/chat/";
}

function SettingsButtonClicked() {
  window.location.href = "/settings/";
}

function AboutDropdownOptions() {
  return (
    <form>
      <div className="form_format">
        <label className="main_text normal">Username</label>
        <input className="message_font normal" />
        <label className="main_text normal">Password</label>
        <input className="message_font normal" />
        <label className="main_text normal">Email (Join Only)</label>
        <input className="message_font normal" />
      </div>
      <div style={{ flexDirection: "row" }}>
        <button type="button" className="main_text" onClick={JoinButtonClicked}>
          Join
        </button>
        <button type="button" className="main_text" onClick={SignInButtonClicked}>
          Sign In
        </button>
      </div>
    </form>
  );
}

function ChatDropdownOptions() {
  return (
    <div>
      <button onClick={SettingsButtonClicked}>Settings</button>
      <button onClick={SignOutButtonClicked}>Sign Out</button>
    </div>
  );
}

function SettingsDropdownOptions() {
  return (
    <div>
      <button onClick={ChatButtonClicked}>Chat</button>
      <button onClick={SignOutButtonClicked}>Sign Out</button>
    </div>
  );
}

function Dropdown() {
  var location = useLocation().pathname;
  const [openStatus, setOpenStatus] = useState(false);

  // If we click the button, it changes the state. If it is open, we want to close the dropdown, if it is closed we want it open
  const toggleStatus = () => {
    setOpenStatus(!openStatus);
  }

  // If we hover over the button and it isn't open and we want it open, we want it open.
  // If it is already open, keep it open.
  const hoverEnterStatus = () => {
    if (!openStatus) {
      setOpenStatus(true);
    }
  }

  const hoverExitStatus = (event) => {
    const relatedTarget = event.relatedTarget;

    // If (theres no new element hovered) or ((the new element is not related to the current element)
    // and (there is no other ancestor in dropdown)) then we close the dropdown
    if (
      !relatedTarget ||
      (!(relatedTarget instanceof Node)) ||
      (!event.currentTarget.contains(relatedTarget) &&
        relatedTarget.closest(".dropdown") === null)
    ) {
      setOpenStatus(false);
    }
  }

  return (
    <div className="dropdown">
      <button
        className="main_text normal shadow_down"
        onClick={toggleStatus}
        onMouseEnter={hoverEnterStatus}
        onMouseLeave={hoverExitStatus}
      >
        {location === "/" ? "Join/Sign In" : "Username"}
      </button>
      <div className="hidden_div">
        <div
          className={`dropdown_content ${openStatus ? "visible" : "hidden"}`}
          onMouseLeave={hoverExitStatus}
        >
          {location === "/" ? (
            <AboutDropdownOptions />
          ) : location === "/chat/" ? (
            <ChatDropdownOptions />
          ) : (
            <SettingsDropdownOptions />
          )}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  return (
    <header className="metallic shadow_down">
      <div className="splitter">
        <div className="left push_left" style={{ paddingLeft: "0.5em" }}>
          <h1 className="main_text medium">Provo Techspert</h1>
          {/* TODO: In the future when the chat starts to be filled out this will be dependent on if it is the chat page and, if it is,
          whether or not it is a small screen (60 em) */}
        </div>
        <div className="right push_right">
          <Dropdown />
        </div>
      </div>
    </header>
  );
}

export function NotFound() {
  return (
    <main className="center" style={{ padding: 2 + "em" }}>
      404: Address unknown. Try going to simply https://ProvoTechspert.click
    </main>
  );
}

import React from "react";

function SignOutButtonClicked() {
    window.location.href = "/";
}
function SettingsButtonClicked() {
    window.location.href = "/settings/";
}

export function ChatDropdownOptions() {
    return (
        <div>
            <button
                className="main_text very_small"
                onClick={SettingsButtonClicked}
            >
                Settings
            </button>
            <button
                className="main_text very_small"
                onClick={SignOutButtonClicked}
            >
                Sign Out
            </button>
        </div>
    );
}

export function ChatButton({ text }) {
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
            >
                {text}
            </button>
            <button className="small message_font right_rounded">
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
        <p className="small message_font green_bubble shadow_down">
            {children}
        </p>
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

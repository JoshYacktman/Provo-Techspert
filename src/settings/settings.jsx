import React from "react";
import { Header } from "../components";
import "./settings.css";

function SignOutButtonClicked() {
    window.location.href = "/";
}
function ChatButtonClicked() {
    window.location.href = "/chat/";
}

function SettingsDropdownOptions() {
    return (
        <div>
            <button className="main_text very_small" onClick={ChatButtonClicked}>Chat</button>
            <button className="main_text very_small" onClick={SignOutButtonClicked}>Sign Out</button>
        </div>
    );
}

function Settings() {
    return (
        <div className="work_area" style={{ overflowY: "auto" }}>
            <Header OptionsMenu={SettingsDropdownOptions} />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "1em",
                    flexGrow: "1",
                }}
            >
                {/* TODO: If height is less than 60em make it row */}
                {/* TODO: Make the divs grow to size */}
                <form>
                    <div className="shadow_down corner_rounding section_div">
                        <label className="medium complementary_font_shadow main_label">
                            New Password:
                        </label>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            className="small corner_rounding bordered_message_font shadow_down main_input"
                        />
                        <button
                            type="button"
                            className="small corner_rounding main_text shadow_down main_button"
                        >
                            Change Password
                        </button>
                    </div>
                </form>
                <form>
                    <div className="shadow_down corner_rounding section_div">
                        <label className="medium complementary_font_shadow main_label">
                            New Email:
                        </label>
                        <input
                            type="email"
                            placeholder="Enter new email"
                            className="small corner_rounding bordered_message_font shadow_down main_input"
                        />
                        <button
                            type="button"
                            className="small corner_rounding main_text shadow_down main_button"
                        >
                            Change Email
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

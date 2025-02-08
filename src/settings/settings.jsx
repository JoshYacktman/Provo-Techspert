import React from "react";
import "./settings.css";
import { Header } from "../components";

function SignOutButtonClicked() {
    window.location.href = "/";
}
function ChatButtonClicked() {
    window.location.href = "/chat/";
}

function SettingsDropdownOptions() {
    return (
        <div>
            <button onClick={ChatButtonClicked}>Chat</button>
            <button onClick={SignOutButtonClicked}>Sign Out</button>
        </div>
    );
}

function Settings() {
    return (
        <div className="work_area" style={{overflowY: "auto"}}>
            <Header OptionsMenu={SettingsDropdownOptions} />
            <div style={{ display: "flex", flexDirection: "column", padding: "1em",}}>
                <form>
                    <div
                        style={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "center",
                            padding: ".6em",
                            margin: ".5em",
                            backgroundColor: "darksalmon"
                        }}
                        className="shadow_down corner_rounding"
                    >
                        <label style={{ margin: ".3em" }} className="medium complementary_font">
                            New Password:
                        </label>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            className="small corner_rounding bordered_montserrat"
                            style={{
                                border: "none",
                                padding: "0.3em",
                                margin: ".3em",
                            }}
                        />
                        <button
                            type="button"
                            className="small corner_rounding main_text"
                            style={{ margin: ".3em" }}
                        >
                            Change Password
                        </button>
                    </div>
                </form>
                <form>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "center",
                            padding: ".6em",
                            margin: ".5em",
                            backgroundColor: "darksalmon"
                        }}
                        className="shadow_down corner_rounding"
                    >
                        <label style={{ margin: ".3em" }} className="medium complementary_font">
                            New Email:
                        </label>
                        <input
                            type="email"
                            placeholder="Enter new email"
                            className="small corner_rounding bordered_montserrat"
                            style={{
                                border: "none",
                                padding: "0.3em",
                                margin: ".3em",
                            }}
                        />
                        <button type="button" className="small corner_rounding main_text" style={{ margin: ".3em" }}>
                            Change Email
                        </button>
                    </div>
                </form>
                <form>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "center",
                            padding: ".6em",
                            margin: ".5em",
                            backgroundColor: "darksalmon"
                        }}
                        className="shadow_down corner_rounding"
                    >
                        <label style={{ margin: ".3em" }} className="medium complementary_font">Delete Account?</label>
                        <button type="button" className="small corner_rounding main_text" style={{ margin: ".3em" }}>
                            Delete Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Settings;

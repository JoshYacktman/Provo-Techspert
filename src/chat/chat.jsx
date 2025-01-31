import React from "react";
import { Dropdown, Header } from "../components";
import "./chat.css";

function SignOutButtonClicked() {
    window.location.href = "/";
}
function SettingsButtonClicked() {
    window.location.href = "/settings/";
}

function ChatDropdownOptions() {
    return (
        <div>
            <button onClick={SettingsButtonClicked}>Settings</button>
            <button onClick={SignOutButtonClicked}>Sign Out</button>
        </div>
    );
}

function Chat() {
    const openSidebar = (event) => {
        event.stopPropagation();
        document.getElementById("sidebar").style.width = "15em";
    }
    const closeSidebar = () => {
        document.getElementById("sidebar").style.width = "0";
    }
    return (
        <div className="work_area">
            <div className="sidebar" id="sidebar">
                <div style={{width: "100%"}}>
                    <button className="small bordered">Create Chat</button>
                    <button className="small bordered" onClick={closeSidebar}>&larr;</button>
                </div>
                <div>
                    <Dropdown OptionsMenu={ChatDropdownOptions} Bottom={true} />
                </div>
            </div>
            <div style={{height: "100%"}}>
                <button className="small shadow_down" onClick={(event) => openSidebar(event)}>&equiv;</button>
            </div>
        </div>
    );
}
export default Chat;

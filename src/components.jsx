import React from "react";
import { useLocation } from "react-router-dom";


// TODO: Make these three functional
function JoinButtonClicked () {
    window.location.href = "/chat/";
}

function SignInButtonClicked () {
    window.location.href = "/chat/";
}

function SignOutButtonClicked () {
    window.location.href = "/";
}


// Naviagtion
function ChatButtonClicked () {
    window.location.href = "/chat/";
}

function SettingsButtonClicked () {
    window.location.href = "/settings/";
}


function AboutDropdownOptions () {
    return (
        <form>
            <div className="form_format">
                <label className="message_font normal">Username</label>
                <input className="formal_font normal"/>
                <label className="message_font normal">Password</label>
                <input className="formal_font normal"/>
                <label className="message_font normal">Email (Join Only)</label>
                <input className="formal_font normal"/>
            </div>
            <div style={{flexDirection: "row"}}>
                <button type="button" onClick={JoinButtonClicked}>Join</button>
                <button type="button" onClick={SignInButtonClicked}>Sign In</button>
            </div>
        </form>
    );
}

function ChatDropdownOptions () {
    return (
        <div>
            <button onClick={SettingsButtonClicked}>Settings</button>
            <button onClick={SignOutButtonClicked}>Sign Out</button>
        </div>
    );
}

function SettingsDropdownOptions () {
    return (
        <div>
            <button onClick={ChatButtonClicked}>Chat</button>
            <button onClick={SignOutButtonClicked}>Sign Out</button>
        </div>
    );
}

function Dropdown () {
    // TODO: Make it so hovering opens the dropdown, clicking button toggles state
    var location = useLocation().pathname;

    return (
        <div className="dropdown">
            <button className="main_text normal shadow_down">{location === "/" ? "Join/Sign In" : "Username"}</button>
            <div className="hidden_div">
                <div className="dropdown_content">
                    {location === "/" ? <AboutDropdownOptions /> : location === "/chat/" ? <ChatDropdownOptions /> : <SettingsDropdownOptions />}
                </div>
            </div>
        </div>
    );
}

export function Header () {
    return (
        <header className="metallic shadow_down">
            <div className="splitter">
                <div className="left push_left" style={{ paddingLeft: "0.5em"}}>
                    <h1 className="main_text medium">Provo Techspert</h1>
                </div>
                <div className="right push_right">
                    <Dropdown />
                </div>
            </div>
        </header>
    );
}


export function Footer() {
    function GitHubButtonClicked () {
        window.open("https://github.com/JoshYacktman/Provo-Techspert");
    }

    var location = useLocation().pathname;
    
    if (location !== "/") {
        return <></>
    }

    return (
    <footer className="metallic shadow_up">
        <div className="push_left">
            <button className="complementary_font normal shadow_up" onClick={GitHubButtonClicked}>GitHub</button>
        </div>
    </footer>
  );
}

export function NotFound() {
    return <main className="center" style={{padding: 2+"em"}}>404: Address unknown. Try going to simply https://ProvoTechspert.click</main>;
}
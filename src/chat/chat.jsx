import React, {useEffect, useRef} from "react";
import { Dropup } from "../components";
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
        document.getElementById("sidebar").style.width = "auto";
    }
    const closeSidebar = () => {
        document.getElementById("sidebar").style.width = "0";
    }

    const messagesEndRef = useRef(null);

    // Function to scroll to the bottom
    const scrollToBottomInstant = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    };
    const scrollToBottomSmooth = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    };

    useEffect(() => {
        scrollToBottomInstant();
    }, []);

    return (
        <div className="work_area">
            <div className="sidebar shadow_down" id="sidebar" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{width: "100%", display: "flex", flexDirection: "row", zIndex: "1"}} className="shadow_down">
                    <button style={{ width: "100%"}} className="normal bordered">Create Chat</button>
                    <button className="normal bordered" onClick={closeSidebar}>&larr;</button>
                </div>
                <div style={{ height: "100%", overflowY: "auto"}}>
                    <div style={{width: "100%", display: "flex", flexDirection: "row"}}>
                        <button style={{ width: "100%" }}  className="small">Chat One</button>
                        <button className="small">&times;</button>
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row"}}>
                        <button style={{ width: "100%" }}  className="small">Chat Two</button>
                        <button className="small">&times;</button>
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row"}}>
                        <button style={{ width: "100%" }}  className="small">Chat Three</button>
                        <button className="small">&times;</button>
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row"}}>
                        <button style={{ width: "100%" }}  className="small">Chat Four</button>
                        <button className="small">&times;</button>
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row"}}>
                        <button style={{ width: "100%" }}  className="small">Chat Five</button>
                        <button className="small">&times;</button>
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row"}}>
                        <button style={{ width: "100%" }}  className="small">Chat Six</button>
                        <button className="small">&times;</button>
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row"}}>
                        <button style={{ width: "100%" }}  className="small">Chat Seven</button>
                        <button className="small">&times;</button>
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row"}}>
                        <button style={{ width: "100%" }}  className="small">Chat Eight</button>
                        <button className="small">&times;</button>
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row"}}>
                        <button style={{ width: "100%" }}  className="small">Chat Nine</button>
                        <button className="small">&times;</button>
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row"}}>
                        <button style={{ width: "100%" }}  className="small">Chat Ten</button>
                        <button className="small">&times;</button>
                    </div>
                    <div style={{width: "100%", display: "flex", flexDirection: "row"}}>
                        <button style={{ width: "100%" }}  className="small">Chat Eleven</button>
                        <button className="small">&times;</button>
                    </div>
                </div>
                <Dropup OptionsMenu={ChatDropdownOptions}/>
            </div>
            <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <div className="shadow_down" style={{ display: "flex", flexDirection: "row", alignItems: "center", zIndex: "1"}}>
                    <button className="small shadow_down" onClick={(event) => openSidebar(event)}>&equiv;</button>
                    <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                        <h1 className="meduim main_text">Chat One</h1>
                    </div>
                </div>
                <div style={{ height: "100%", overflowX: "hidden", overflowY: "auto", backgroundColor: "yellowgreen"}}>
                    <p className="normal message_font" style={{paddingTop: "0.2em", borderBottom: ".1em solid black"}}>Provo Techspert: Chat Message one</p>
                    <p className="normal message_font" style={{paddingTop: "0.2em", borderBottom: ".1em solid black"}}>Customer: Chat Message two</p>
                    <p className="normal message_font" style={{paddingTop: "0.2em", borderBottom: ".1em solid black"}}>Provo Techspert: Chat Message three</p>
                    <p className="normal message_font" style={{paddingTop: "0.2em", borderBottom: ".1em solid black"}}>Customer: Chat Message four</p>
                    <p className="normal message_font" style={{paddingTop: "0.2em", borderBottom: ".1em solid black"}}>Provo Techspert: Chat Message five</p>
                    <p className="normal message_font" style={{paddingTop: "0.2em", borderBottom: ".1em solid black"}}>Customer: Chat Message six</p>
                    <p className="normal message_font" style={{paddingTop: "0.2em", borderBottom: ".1em solid black"}}>Provo Techspert: Chat Message seven</p>
                    <p className="normal message_font" style={{paddingTop: "0.2em", borderBottom: ".1em solid black"}}>Customer: Chat Message eight</p>
                    <p className="normal message_font" style={{paddingTop: "0.2em", borderBottom: ".1em solid black"}}>Provo Techspert: Chat Message nine</p>
                    <p className="normal message_font" style={{paddingTop: "0.2em", borderBottom: ".1em solid black"}}>Customer: Chat Message ten</p>
                    <p className="normal message_font" style={{paddingTop: "0.2em", borderBottom: ".1em solid black"}}>Provo Techspert: Chat Message eleven</p>
                    <p className="normal message_font" style={{paddingTop: "0.2em", borderBottom: ".1em solid black"}}>Customer: Chat Message twelve</p>
                    <p className="normal message_font" style={{paddingTop: "0.2em", borderBottom: ".1em solid black"}}>Provo Techspert: Chat Message thirteen</p>
                    <p className="normal message_font" style={{paddingTop: "0.2em", borderBottom: ".1em solid black"}}>Customer: Chat Message fourteen</p>
                    <p className="normal message_font" style={{paddingTop: "0.2em", borderBottom: ".1em solid black"}}>Provo Techspert: Chat Message fifteen</p>
                    <p className="normal message_font" style={{paddingTop: "0.2em", borderBottom: ".1em solid black"}}>Customer: Chat Message sixteen</p>
                    <p className="normal message_font" style={{paddingTop: "0.2em", borderBottom: ".1em solid black"}}>Provo Techspert: Chat Message seventeen</p>
                    <p className="normal message_font" style={{paddingTop: "0.2em", borderBottom: ".1em solid black"}}>Customer: Chat Message eighteen</p>
                    <p className="normal message_font" style={{paddingTop: "0.2em", borderBottom: ".1em solid black"}}>Provo Techspert: Chat Message nineteen</p>
                    <p className="normal message_font" style={{paddingTop: "0.2em", borderBottom: ".1em solid black"}}>Customer: Chat Message twenty</p>
                    <div ref={messagesEndRef}></div>
                </div>
                <div style={{width: "100%", display: "flex", flexDirection: "row"}}>
                    <input className="small message_font" style={{ width: "100%" }}></input>
                    <button>&rarr;</button>
                </div>
            </div>
        </div>
    );
}
export default Chat;

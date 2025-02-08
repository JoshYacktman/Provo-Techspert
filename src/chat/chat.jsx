import React, {useEffect, useRef, useState} from "react";
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
    const [openStatus, setOpenStatus] = useState(false);

    const toggleStatus = (isMainPage = false) => {
        if (!isMainPage) {
            setOpenStatus(!openStatus);
        } else {
            setOpenStatus(false);
        }
    };

    const hoverEnterStatus = (event) => {
        event.stopPropagation();
        setOpenStatus(true);
    };

    const hoverExitStatus = (event) => {
        const relatedTarget = event.relatedTarget;
        if (
            !relatedTarget ||
            !(relatedTarget instanceof Node) ||
            (!event.currentTarget.contains(relatedTarget) &&
                relatedTarget.closest(".dropup") === null)
        ) {
            setOpenStatus(false);
        }
    };


    // Function to scroll to the bottom
    const messagesEndRef = useRef(null);

    const scrollToBottomInstant = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    };
    const scrollToBottomSmooth = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottomInstant();
    }, []);

    return (
        <div className="work_area">
            <div className="sidebar shadow_down" id="sidebar" style={{ height: "100%", display: "flex", flexDirection: "column", width: (openStatus ? "auto" : "0")}} onMouseLeave={() => hoverExitStatus(true)}>
                <div style={{width: "100%", display: "flex", flexDirection: "row", zIndex: "1"}} className="shadow_down">
                    <button style={{ width: "100%"}} className="normal bordered">Create Chat</button>
                    <button className="normal bordered" onClick={toggleStatus}>&larr;</button>
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
            <div style={{ height: "100%", display: "flex", flexDirection: "column" }} onClick={toggleStatus}>
                <div className="metallic shadow_down" style={{ display: "flex", flexDirection: "row", alignItems: "center", zIndex: "1"}}>
                    <button className="small shadow_down" onMouseEnter={hoverEnterStatus} onClick={hoverEnterStatus}>&equiv;</button>
                    <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                        <h1 className="meduim main_text" style={{color: "darkgoldenrod"}}>Chat One</h1>
                    </div>
                </div>
                <div style={{ height: "100%", overflowX: "hidden", overflowY: "auto", backgroundColor: "blanchedalmond"}}>
                    <div style={{ padding: "1em", color: "seagreen" }}>
                        <h5 className="normal message_font" style={{filter: "brightness(75%)"}}>Provo Techspert</h5>
                        <p className="small message_font green_bubble" style={{ color: "lavender" }}>Chat Message one</p>
                    </div>

                    <div style={{ padding: "1em", textAlign: "right", color: "cornflowerblue", maxWidth: "45%", marginLeft: "auto" }}>
                        <h5 className="normal message_font" style={{filter: "brightness(85%)"}}>Username</h5>
                        <p className="small message_font blue_bubble" style={{ color: "lavender"}}>Chat Message two</p>
                    </div>

                    <div style={{ padding: "1em", color: "seagreen" }}>
                        <h5 className="normal message_font" style={{filter: "brightness(85%)"}}>Provo Techspert</h5>
                        <p className="small message_font green_bubble" style={{ color: "lavender" }}>Chat Message three</p>
                    </div>

                    <div style={{ padding: "1em", textAlign: "right", color: "cornflowerblue", maxWidth: "45%", marginLeft: "auto" }}>
                        <h5 className="normal message_font" style={{filter: "brightness(85%)"}}>Username</h5>
                        <p className="small message_font blue_bubble" style={{ color: "lavender"}}>Chat Message four</p>
                    </div>

                    <div style={{ padding: "1em", color: "seagreen" }}>
                        <h5 className="normal message_font" style={{filter: "brightness(85%)"}}>Provo Techspert</h5>
                        <p className="small message_font green_bubble" style={{ color: "lavender" }}>Chat Message five</p>
                    </div>

                    <div style={{ padding: "1em", textAlign: "right", color: "cornflowerblue", maxWidth: "45%", marginLeft: "auto" }}>
                        <h5 className="normal message_font" style={{filter: "brightness(85%)"}}>Username</h5>
                        <p className="small message_font blue_bubble" style={{ color: "lavender"}}>Chat Message six</p>
                    </div>

                    <div style={{ padding: "1em", color: "seagreen" }}>
                        <h5 className="normal message_font" style={{filter: "brightness(85%)"}}>Provo Techspert</h5>
                        <p className="small message_font green_bubble" style={{ color: "lavender" }}>Chat Message seven</p>
                    </div>

                    <div style={{ padding: "1em", textAlign: "right", color: "cornflowerblue", maxWidth: "45%", marginLeft: "auto" }}>
                        <h5 className="normal message_font" style={{filter: "brightness(85%)"}}>Username</h5>
                        <p className="small message_font blue_bubble" style={{ color: "lavender"}}>Chat Message eight</p>
                    </div>

                    <div style={{ padding: "1em", color: "seagreen" }}>
                        <h5 className="normal message_font" style={{filter: "brightness(85%)"}}>Provo Techspert</h5>
                        <p className="small message_font green_bubble" style={{ color: "lavender" }}>Chat Message nine</p>
                    </div>

                    <div style={{ padding: "1em", textAlign: "right", color: "cornflowerblue", maxWidth: "45%", marginLeft: "auto" }}>
                        <h5 className="normal message_font" style={{filter: "brightness(85%)"}}>Username</h5>
                        <p className="small message_font blue_bubble" style={{ color: "lavender"}}>Chat Message ten</p>
                    </div>

                    <div style={{ padding: "1em", color: "seagreen" }}>
                        <h5 className="normal message_font" style={{filter: "brightness(85%)"}}>Provo Techspert</h5>
                        <p className="small message_font green_bubble" style={{ color: "lavender" }}>Chat Message eleven</p>
                    </div>

                    <div style={{ padding: "1em", textAlign: "right", color: "cornflowerblue", maxWidth: "45%", marginLeft: "auto" }}>
                        <h5 className="normal message_font" style={{filter: "brightness(85%)"}}>Username</h5>
                        <p className="small message_font blue_bubble" style={{ color: "lavender"}}>Chat Message twelve</p>
                    </div>

                    <div style={{ padding: "1em", color: "seagreen" }}>
                        <h5 className="normal message_font" style={{filter: "brightness(85%)"}}>Provo Techspert</h5>
                        <p className="small message_font green_bubble" style={{ color: "lavender" }}>Chat Message thirteen</p>
                    </div>

                    <div style={{ padding: "1em", textAlign: "right", color: "cornflowerblue", maxWidth: "45%", marginLeft: "auto" }}>
                        <h5 className="normal message_font" style={{filter: "brightness(85%)"}}>Username</h5>
                        <p className="small message_font blue_bubble" style={{ color: "lavender"}}>Chat Message fourteen</p>
                    </div>

                    <div style={{ padding: "1em", color: "seagreen" }}>
                        <h5 className="normal message_font" style={{filter: "brightness(85%)"}}>Provo Techspert</h5>
                        <p className="small message_font green_bubble" style={{ color: "lavender" }}>Chat Message fifteen</p>
                    </div>

                    <div style={{ padding: "1em", textAlign: "right", color: "cornflowerblue", maxWidth: "55%", marginLeft: "auto"}}>
                        <h5 className="normal message_font" style={{filter: "brightness(85%)"}}>Username</h5>
                        <p className="small message_font blue_bubble" style={{ color: "lavender"}}>Chat Message sixteen</p>
                    </div>

                    <div style={{ padding: "1em", color: "seagreen", maxWidth: "55%" }}>
                        <h5 className="normal message_font" style={{filter: "brightness(85%)",  paddingLeft: "0.3em"}}>Provo Techspert</h5>
                        <p className="small message_font green_bubble" style={{ color: "lavender" }}>Chat Message seventeen</p>
                        <p className="small message_font green_bubble" style={{ color: "lavender" }}>Chat Message eighteen</p>
                        <p className="small message_font green_bubble" style={{ color: "lavender" }}>This is a fairly long message all things considered that I wrote to test this thing but it should have a problem and yeah idk. This is a fairly long message all things considered that I wrote to test this thing but it should have a problem and yeah idk</p>
                    </div>


                    <div style={{ padding: "1em", textAlign: "right", color: "cornflowerblue", maxWidth: "55%", marginLeft: "auto"}}>
                        <h5 className="normal message_font" style={{filter: "brightness(85%)", paddingRight: "0.3em"}}>Username</h5>
                        <p className="small message_font blue_bubble" style={{ color: "lavender" }}>Chat Message nineteen</p>
                        <p className="small message_font blue_bubble" style={{ color: "lavender"}}>Chat Message twenty</p>
                        <p className="small message_font blue_bubble" style={{ color: "lavender"}}>This is a fairly long message all things considered that I wrote to test this thing but it should have a problem and yeah idk. This is a fairly long message all things considered that I wrote to test this thing but it should have a problem and yeah idk</p>
                    </div>

                    <div ref={messagesEndRef}></div>
                </div>
                <div className="shadow_up" style={{ width: "100%", display: "flex", flexDirection: "row", zIndex: "1", backgroundColor: "blanchedalmond", padding: ".5em"}}>
                    <input className="small message_font shadow_down" style={{ width: "100%", backgroundColor: "linen", marginRight: "0.3em", border: ".1em double", padding: ".3em"}}></input>
                    <button onClick={scrollToBottomSmooth} className="rounded shadow_down">&rarr;</button>
                </div>
            </div>
        </div>
    );
}
export default Chat;

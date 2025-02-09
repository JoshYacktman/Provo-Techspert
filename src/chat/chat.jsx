import React, { useEffect, useRef, useState } from "react";
import { Dropup } from "../components";
import {
    ChatButton,
    ChatDropdownOptions,
    LeftSideMessageDiv,
    LeftSideMessageHeading,
    LeftSideBubble,
    RightSideMessageDiv,
    RightSideMessageHeading,
    RightSideBubble,
} from "./chat_components";
import "./chat.css";

import notifySound from "/sounds/notify.mp3";


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

    const playNotifySound = () => {
        const audio = document.getElementById("audio_tag");
        audio.pause();
        audio.currentTime = 0;
        try {
            audio.play();
        } catch {}
    }

    // Function to scroll to the bottom
    const messagesEndRef = useRef(null);

    const scrollToBottomInstant = () => {
        playNotifySound();
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    };

    const scrollToBottomSmooth = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const addMessage = () => {
        playNotifySound();

        scrollToBottomSmooth;
    }

    useEffect(() => {
        scrollToBottomInstant();
    }, []);

    return (
        <div className="work_area">
            <div
                className="sidebar shadow_down"
                id="sidebar"
                style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    width: openStatus ? "auto" : "0",
                }}
                onMouseLeave={() => hoverExitStatus(true)}
            >
                <div
                    className="shadow_down bottom_rounded"
                    style={{ zIndex: "1" }}
                >
                    <div
                        style={{
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            padding: ".2em",
                        }}
                    >
                        <button
                            style={{
                                width: "80%",
                                marginRight: ".2em",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            className="small message_font small_corner_rounding"
                        >
                            Create Chat
                        </button>

                        <button
                            className="small main_text small_corner_rounding"
                            onClick={toggleStatus}
                            style={{ flexGrow: 1}}
                        >
                            &larr;
                        </button>
                    </div>
                </div>
                <div
                    style={{
                        height: "100%",
                        overflowY: "auto",
                        padding: ".3em",
                        marginTop: ".4em",
                    }}
                >
                    <ChatButton text={"Chat One"} />
                    <ChatButton text={"Nintendo_Switch12345"} />
                    <ChatButton text={"Chat Two"} />
                    <ChatButton text={"Chat Three"} />
                    <ChatButton text={"Chat Four"} />
                    <ChatButton text={"Chat Five"} />
                    <ChatButton text={"Chat Six"} />
                    <ChatButton text={"Chat Seven"} />
                    <ChatButton text={"Chat Eight"} />
                    <ChatButton text={"Chat Nine"} />
                    <ChatButton text={"Chat Ten"} />
                    <ChatButton text={"Chat Eleven"} />
                    <ChatButton text={"Chat Twelve"} />
                </div>
                <Dropup OptionsMenu={ChatDropdownOptions} />
            </div>
            <div
                style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
                onClick={toggleStatus}
            >
                <div
                    className="metallic shadow_down"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        zIndex: "1",
                    }}
                >
                    <button
                        className="small shadow_down"
                        onMouseEnter={hoverEnterStatus}
                        onClick={hoverEnterStatus}
                    >
                        &equiv;
                    </button>
                    <h1
                        className="medium main_text"
                        style={{
                            color: "darkgoldenrod",
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        Chat One
                    </h1>
                </div>
                <div
                    style={{
                        height: "100%",
                        overflowX: "hidden",
                        overflowY: "auto",
                        backgroundColor: "blanchedalmond",
                        paddingBottom: ".3em",
                    }}
                >
                    <LeftSideMessageDiv>
                        <LeftSideMessageHeading username="Provo Techspert" />
                        <LeftSideBubble>
                            Hello &#123;Username&#125;, my name is Joshua
                            Yacktman or, as my website calls me, the Provo
                            Techspert. To help you repair your device, I would
                            appreciate a message from you explaining the issue,
                            if you can reproduce the issue consistently, and, if
                            possible, links to pictures and/or videos (I
                            personally use{" "}
                            <a href="https://imgbb.com/">imgbb</a> and{" "}
                            <a href="https://vimeo.com/">Vimeo</a>).
                        </LeftSideBubble>
                        <LeftSideBubble>Chat Message one</LeftSideBubble>
                    </LeftSideMessageDiv>

                    <RightSideMessageDiv>
                        <RightSideMessageHeading username="Username" />
                        <RightSideBubble>Chat Message two</RightSideBubble>
                    </RightSideMessageDiv>

                    <LeftSideMessageDiv>
                        <LeftSideMessageHeading username="Provo Techspert" />
                        <LeftSideBubble>Chat Message three</LeftSideBubble>
                    </LeftSideMessageDiv>

                    <RightSideMessageDiv>
                        <RightSideMessageHeading username="Username" />
                        <RightSideBubble>Chat Message four</RightSideBubble>
                    </RightSideMessageDiv>

                    <LeftSideMessageDiv>
                        <LeftSideMessageHeading username="Provo Techspert" />
                        <LeftSideBubble>Chat Message five</LeftSideBubble>
                    </LeftSideMessageDiv>

                    <RightSideMessageDiv>
                        <RightSideMessageHeading username="Username" />
                        <RightSideBubble>Chat Message six</RightSideBubble>
                    </RightSideMessageDiv>

                    <LeftSideMessageDiv>
                        <LeftSideMessageHeading username="Provo Techspert" />
                        <LeftSideBubble>Chat Message seven</LeftSideBubble>
                    </LeftSideMessageDiv>

                    <RightSideMessageDiv>
                        <RightSideMessageHeading username="Username" />
                        <RightSideBubble>Chat Message eight</RightSideBubble>
                    </RightSideMessageDiv>

                    <LeftSideMessageDiv>
                        <LeftSideMessageHeading username="Provo Techspert" />
                        <LeftSideBubble>Chat Message nine</LeftSideBubble>
                    </LeftSideMessageDiv>

                    <RightSideMessageDiv>
                        <RightSideMessageHeading username="Username" />
                        <RightSideBubble>Chat Message ten</RightSideBubble>
                    </RightSideMessageDiv>

                    <LeftSideMessageDiv>
                        <LeftSideMessageHeading username="Provo Techspert" />
                        <LeftSideBubble>Chat Message eleven</LeftSideBubble>
                    </LeftSideMessageDiv>

                    <RightSideMessageDiv>
                        <RightSideMessageHeading username="Username" />
                        <RightSideBubble>Chat Message twelve</RightSideBubble>
                    </RightSideMessageDiv>

                    <LeftSideMessageDiv>
                        <LeftSideMessageHeading username="Provo Techspert" />
                        <LeftSideBubble>Chat Message thirteen</LeftSideBubble>
                    </LeftSideMessageDiv>

                    <RightSideMessageDiv>
                        <RightSideMessageHeading username="Username" />
                        <RightSideBubble>Chat Message fourteen</RightSideBubble>
                    </RightSideMessageDiv>

                    <LeftSideMessageDiv>
                        <LeftSideMessageHeading username="Provo Techspert" />
                        <LeftSideBubble>Chat Message fifteen</LeftSideBubble>
                    </LeftSideMessageDiv>

                    <RightSideMessageDiv>
                        <RightSideMessageHeading username="Username" />
                        <RightSideBubble>Chat Message sixteen</RightSideBubble>
                    </RightSideMessageDiv>

                    <LeftSideMessageDiv>
                        <LeftSideMessageHeading username="Provo Techspert" />
                        <LeftSideBubble>Chat Message seventeen</LeftSideBubble>
                        <LeftSideBubble>Chat Message eighteen</LeftSideBubble>
                        <LeftSideBubble>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Pellentesque luctus tellus id nisl fringilla
                            venenatis. Phasellus quam lacus, fermentum nec
                            tortor ut, tristique semper magna. Morbi faucibus
                            fringilla ligula. Sed.
                        </LeftSideBubble>
                    </LeftSideMessageDiv>

                    <RightSideMessageDiv>
                        <RightSideMessageHeading username="Username" />
                        <RightSideBubble>Chat Message nineteen</RightSideBubble>
                        <RightSideBubble>Chat Message twenty</RightSideBubble>
                        <RightSideBubble>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Pellentesque luctus tellus id nisl fringilla
                            venenatis. Phasellus quam lacus, fermentum nec
                            tortor ut, tristique semper magna. Morbi faucibus
                            fringilla ligula. Sed.
                        </RightSideBubble>
                    </RightSideMessageDiv>

                    <div ref={messagesEndRef}></div>
                </div>
                <div
                    className="shadow_up"
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        zIndex: "1",
                        backgroundColor: "blanchedalmond",
                        padding: ".5em",
                    }}
                >
                    <input
                        className="small message_font shadow_down corner_rounding"
                        style={{
                            width: "100%",
                            backgroundColor: "linen",
                            marginRight: "0.3em",
                            border: ".2em double",
                            padding: ".5em",
                        }}
                    ></input>
                    <button
                        onClick={addMessage}
                        className="small main_text small_corner_rounding shadow_down"
                    >
                        &rarr;
                    </button>
                    <audio id="audio_tag" src={notifySound} />
                </div>
            </div>
        </div>
    );
}
export default Chat;

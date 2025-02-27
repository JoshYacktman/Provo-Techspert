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

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
if (isSafari) {
    import("./chat_safari.css");
}

import notifySound from "/sounds/notify.mp3";

var chats = [
    "Chat One",
    "Nintendo_Switch12345",
    "Chat Two",
    "Chat Three",
    "Chat Four",
    "Chat Five",
    "Chat Six",
    "Chat Seven",
    "Chat Eight",
    "Chat Nine",
    "Chat Ten",
    "Chat Eleven",
    "Chat Twelve",
];
var currentChat = chats[0];
var messages = {
    "Chat One": [
        {
            sender: "Provo Techspert",
            side: "left",
            messages: [
                `Hello {Username}, my name is Joshua Yacktman or, as my website calls me, the Provo Techspert.
            To help you repair your device, I would appreciate a message from you explaining the issue,
            if you can reproduce the issue consistently, and, if possible, links to pictures and/or videos
            (I personally use imgbb and Vimeo).`,
                "Chat Message one",
            ],
        },
        {
            sender: "TestUsername",
            side: "right",
            messages: ["Chat Message two"],
        },
        {
            sender: "Provo Techspert",
            side: "left",
            messages: ["Chat Message three"],
        },
        {
            sender: "TestUsername",
            side: "right",
            messages: ["Chat Message four"],
        },
        {
            sender: "Provo Techspert",
            side: "left",
            messages: [
                "Chat Message five",
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque luctus tellus id nisl fringilla venenatis.
            Phasellus quam lacus, fermentum nec tortor ut, tristique semper magna. Morbi faucibus fringilla ligula. Sed.`,
            ],
        },
        {
            sender: "TestUsername",
            side: "right",
            messages: [
                "Chat Message six",
                `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque luctus tellus id nisl fringilla venenatis.
            Phasellus quam lacus, fermentum nec tortor ut, tristique semper magna. Morbi faucibus fringilla ligula. Sed.`,
            ],
        },
        {
            sender: "Provo Techspert",
            side: "left",
            messages: ["Chat Message seven"],
        },
    ],
};

function Chat() {
    const userName = localStorage.getItem("username");
    if (userName == null) {
        window.location.href = "/";
        return;
    }

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
        if (!relatedTarget || !(relatedTarget instanceof Node)) {
            setOpenStatus(false);
        }
    };

    const playNotifySound = () => {
        const audio = document.getElementById("audio_tag");
        try {
            audio.pause();
            audio.currentTime = 0;
            audio.play();
        } catch {}
    };

    // Function to scroll to the bottom
    const messagesEndRef = useRef(null);

    const scrollToBottomInstant = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    };

    const scrollToBottomSmooth = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 0);
    };

    const addMessage = () => {
        const input = document.getElementById("sendMessage");
        var newMessage = input.value.trim();
        if (!newMessage) {
            scrollToBottomSmooth();
            return;
        }

        setGroupedMessages((prev) => {
            const lastGroup = prev[prev.length - 1];

            if (lastGroup?.sender === userName) {
                return prev.map((group, index) =>
                    index === prev.length - 1
                        ? {
                              ...group,
                              messages: [...group.messages, newMessage],
                          }
                        : group,
                );
            } else {
                return [
                    ...prev,
                    {
                        sender: userName,
                        side: "right",
                        messages: [newMessage],
                    },
                ];
            }
        });
        console.log(messages);
        input.value = "";
        playNotifySound();
        scrollToBottomSmooth();
    };

    const [groupedMessages, setGroupedMessages] = useState(messages[currentChat]);

    useEffect(() => {
        scrollToBottomInstant();
    }, []);

    function createChat() {
        return;
    }

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
                            padding: ".35em",
                        }}
                    >
                        <button
                            style={{
                                width: "80%",
                                marginRight: ".4em",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            className="small message_font small_corner_rounding"
                            onClick={createChat}
                        >
                            Create Chat
                        </button>

                        <button
                            className="small main_text small_corner_rounding"
                            onClick={toggleStatus}
                            style={{ flexGrow: 1 }}
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
                    {chats.map((chat, index) => (
                        <ChatButton key={index}  text={chat} />
                    ))}
                </div>
                <Dropup OptionsMenu={ChatDropdownOptions} userName={userName} />
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
                            textShadow: "0em .1em .9em #e8a61b",
                        }}
                    >
                        {currentChat}
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
                    {groupedMessages.map((group, index) =>
                        group.side === "right" ? (
                            <RightSideMessageDiv key={index}>
                                <RightSideMessageHeading
                                    username={group.sender}
                                />
                                {group.messages.map((msg, i) => (
                                    <RightSideBubble key={i}>
                                        {msg}
                                    </RightSideBubble>
                                ))}
                            </RightSideMessageDiv>
                        ) : (
                            <LeftSideMessageDiv key={index}>
                                <LeftSideMessageHeading
                                    username={group.sender}
                                />
                                {group.messages.map((msg, i) => (
                                    <LeftSideBubble key={i}>
                                        {msg}
                                    </LeftSideBubble>
                                ))}
                            </LeftSideMessageDiv>
                        ),
                    )}

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
                            padding: ".5em",
                        }}
                        id="sendMessage"
                        placeholder="Type a message..."
                        onKeyDown={(e) => {
                            if (e.key === "Enter") addMessage();
                        }}
                    />
                    <div
                        style={{
                            padding: ".15em",
                            display: "flex",
                            alignItems: "center",
                        }}
                        className="shadow_down small_corner_rounding"
                    >
                        <button
                            onClick={addMessage}
                            className="small main_text small_corner_rounding"
                        >
                            &rarr;
                        </button>
                    </div>
                    <audio id="audio_tag" src={notifySound} rel="preload" />
                </div>
            </div>
        </div>
    );
}
export default Chat;

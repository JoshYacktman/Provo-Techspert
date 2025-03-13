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
  ChatPopUp,
} from "./chat_components";
import "./chat.css";

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
if (isSafari) {
  import("./chat_safari.css");
}

function Chat() {
  const userName = localStorage.getItem("username");
  const notify = new Audio("/sounds/notify.mp3");
  if (userName == null) {
    window.location.href = "/";
    return;
  }

  const [chats, setChats] = useState([
    "Chat One - Username_Test12",
    "Nintendo_Switch - Username_Test12",
  ]);

  const [currentChat, setCurrentChat] = useState(chats[0]);

  const [messages, setMessages] = useState({
    "Chat One - Username_Test12": [
      {
        sender: "Provo Techspert",
        side: "left",
        messages: [
          `Hello ${userName}, my name is Joshua Yacktman or, as my website calls me, the Provo Techspert.
                        To help you repair your device, I would appreciate a message from you explaining the issue,
                        if you can reproduce the issue consistently, and, if possible, links to pictures and/or videos
                        (I personally use imgbb and Vimeo).`,
          "Chat Message one",
        ],
      },
      {
        sender: userName,
        side: "right",
        messages: ["Chat Message two"],
      },
      {
        sender: "Provo Techspert",
        side: "left",
        messages: ["Chat Message three"],
      },
      {
        sender: userName,
        side: "right",
        messages: ["Chat Message four"],
      },
      {
        sender: "Provo Techspert",
        side: "left",
        messages: [
          "Chat Message five",
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        ],
      },
      {
        sender: userName,
        side: "right",
        messages: [
          "Chat Message six",
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        ],
      },
      {
        sender: "Provo Techspert",
        side: "left",
        messages: ["Chat Message seven"],
      },
    ],
    "Nintendo_Switch - Username_Test12": [
      {
        sender: "Provo Techspert",
        side: "left",
        messages: [
          `Hello ${userName}, my name is Joshua Yacktman or, as my website calls me, the Provo Techspert.
                        To help you repair your device, I would appreciate a message from you explaining the issue,
                        if you can reproduce the issue consistently, and, if possible, links to pictures and/or videos
                        (I personally use imgbb and Vimeo).`,
        ],
      },
    ],
  });

  const [sidebarOpenStatus, setSidebarOpenStatus] = useState(false);

  const toggleStatus = (isMainPage = false) => {
    if (!isMainPage) {
      setSidebarOpenStatus(!sidebarOpenStatus);
    } else {
      setSidebarOpenStatus(false);
    }
  };

  const hoverEnterStatus = (event) => {
    event.stopPropagation();
    setSidebarOpenStatus(true);
  };

  const hoverExitStatus = (event) => {
    const relatedTarget = event.relatedTarget;
    if (!relatedTarget || !(relatedTarget instanceof Node)) {
      setSidebarOpenStatus(false);
    }
  };

  const playNotifySound = () => {
    notify.play();
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
    if (chats.length === 0) {
      return;
    }

    const input = document.getElementById("sendMessage");
    var newMessage = input.value.trim();
    if (!newMessage) {
      scrollToBottomSmooth();
      return;
    }

    setMessages((prev) => {
      const chatMessages = prev[currentChat]; // Get current chat messages or default to an empty array
      const lastGroup = chatMessages[chatMessages.length - 1];

      const updatedChatMessages =
        lastGroup?.sender === userName
          ? chatMessages.map((group, index) =>
              index === chatMessages.length - 1
                ? {
                    ...group,
                    messages: [...group.messages, newMessage],
                  }
                : group,
            )
          : [
              ...chatMessages,
              {
                sender: userName,
                side: "right",
                messages: [newMessage],
              },
            ];

      return {
        ...prev,
        [currentChat]: updatedChatMessages, // Update only the current chat
      };
    });

    input.value = "";
    playNotifySound();
    scrollToBottomSmooth();
  };

  function deleteChat(chatName) {
    setChats((prevChats) => {
      const updatedChats = prevChats.filter((chat) => chat !== chatName);

      // Ensure current chat updates correctly after state change
      setCurrentChat(updatedChats.length > 0 ? updatedChats[0] : "");

      console.log(updatedChats);
      return updatedChats;
    });

    setMessages((prev) => {
      const updatedMessages = { ...prev };
      delete updatedMessages[chatName];
      return updatedMessages;
    });
  }

  useEffect(() => {
    scrollToBottomInstant();
  }, [currentChat]);

  function openPopup() {
    document.getElementById("popupOverlay").style.display = "flex";
  }

  function createChat() {
    const input = document.getElementById("newChatInput");
    var newChatName = input.value.trim();

    // Add the newMessage to chats, set it as currentChat, and add the hello message to the new chat
    if (chats.includes(newChatName)) {
      alert("A chat with this name already exists!");
      return;
    }
    newChatName = newChatName + " - " + userName;

    setChats((prevChats) => [...prevChats, newChatName]);
    setMessages((prevMessages) => ({
      ...prevMessages,
      [newChatName]: [
        {
          sender: "Provo Techspert",
          side: "left",
          messages: [
            `Hello ${userName}, my name is Joshua Yacktman or, as my website calls me, the Provo Techspert.
                        To help you repair your device, I would appreciate a message from you explaining the issue,
                        if you can reproduce the issue consistently, and, if possible, links to pictures and/or videos
                        (I personally use imgbb and Vimeo).`,
          ],
        },
      ],
    }));

    setCurrentChat(newChatName);

    input.value = "";
    document.getElementById("popupOverlay").style.display = "none";
    return;
  }

  return (
    <div className="work_area">
      <ChatPopUp createChat={createChat} />
      <div
        className="sidebar shadow_down"
        id="sidebar"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          width: sidebarOpenStatus ? "auto" : "0",
        }}
        onMouseLeave={() => hoverExitStatus(true)}
      >
        <div className="shadow_down bottom_rounded" style={{ zIndex: "1" }}>
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
              onClick={openPopup}
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
            <ChatButton
              key={index}
              text={chat}
              setChat={setCurrentChat}
              deleteChat={deleteChat}
            />
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
              width: "70%",
              textAlign: "center",
            }}
          >
            {currentChat ? currentChat : "Create a chat!"}
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
          {(messages[currentChat] || []).map((group, index) =>
            group.side === "right" ? (
              <RightSideMessageDiv key={index}>
                <RightSideMessageHeading username={group.sender} />
                {group.messages.map((msg, i) => (
                  <RightSideBubble key={i}>{msg}</RightSideBubble>
                ))}
              </RightSideMessageDiv>
            ) : (
              <LeftSideMessageDiv key={index}>
                <LeftSideMessageHeading username={group.sender} />
                {group.messages.map((msg, i) => (
                  <LeftSideBubble key={i}>{msg}</LeftSideBubble>
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
              className="small main_text small_corner_rounding shadow_down"
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Chat;

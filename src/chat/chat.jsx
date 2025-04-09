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

  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState({});
  const [currentChat, setCurrentChat] = useState("");
  const [sidebarOpenStatus, setSidebarOpenStatus] = useState(false);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let port = window.location.port;
    const protocol = window.location.protocol === "http:" ? "ws" : "wss";
    socketRef.current = new WebSocket(
      `${protocol}://${window.location.hostname}:${port}/ws`,
    );

    socketRef.current.onopen = () => {
      console.log("WebSocket Connected!");
      // Request initial chat data
      socketRef.current.send(JSON.stringify({ type: "refresh" }));
    };

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received message:", message);

      if (message.type === "ping") {
        socketRef.current.send(JSON.stringify({ type: "pong" }));
        console.log("Sent pong");
      } else if (typeof message === "string") {
        // Handle acknowledgment or error messages
        if (message.includes("Successfully created chat")) {
          const newChatName = message.split(": ")[1];
          setCurrentChat(newChatName); // Switch to newly created chat
        } else if (
          message === "Chat not found" ||
          message.includes("cannot create chats")
        ) {
          alert(message);
        }
        // Request updated chat data after operation
        socketRef.current.send(JSON.stringify({ type: "refresh" }));
      } else if (message.error) {
        alert(message.error);
      } else {
        // Handle chat data update
        const chatData = message;
        const updatedChats = Object.keys(chatData);
        const updatedMessages = Object.fromEntries(
          Object.entries(chatData).map(([chatName, chat]) => [
            chatName,
            chat.messages,
          ]),
        );

        setChats(updatedChats);
        setMessages(updatedMessages);
        if (!currentChat && updatedChats.length > 0) {
          setCurrentChat(updatedChats[0]);
        }
      }
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket Closed!");
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

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

  const scrollToBottomInstant = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  const scrollToBottomSmooth = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const addMessage = () => {
    if (!currentChat) return;

    const input = document.getElementById("sendMessage");
    const newMessage = input.value.trim();
    if (!newMessage) {
      scrollToBottomSmooth();
      return;
    }

    socketRef.current.send(
      JSON.stringify({
        type: "message",
        chatName: currentChat,
        message: newMessage,
      }),
    );

    input.value = "";
    playNotifySound();
    scrollToBottomSmooth();
  };

  const deleteChat = (chatName) => {
    socketRef.current.send(
      JSON.stringify({
        type: "delete",
        chatName: chatName,
      }),
    );
  };

  const createChat = () => {
    const input = document.getElementById("newChatInput");
    const newChatName = input.value.trim();

    if (!newChatName) {
      alert("Chat name is required!");
      return;
    }

    socketRef.current.send(
      JSON.stringify({
        type: "create",
        chatName: newChatName,
      }),
    );

    input.value = "";
    document.getElementById("popupOverlay").style.display = "none";
  };

  useEffect(() => {
    scrollToBottomInstant();
  }, [currentChat]);

  function openPopup() {
    document.getElementById("popupOverlay").style.display = "flex";
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
              ←
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
            ≡
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
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
//TODO: get popups on website if api request fails and have spinning icon

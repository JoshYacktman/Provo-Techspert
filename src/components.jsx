import React, { useState } from "react";
import { useLocation } from "react-router-dom";
const favicon =
    "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";

export function Dropdown({ OptionsMenu }) {
    var location = useLocation().pathname;
    const [openStatus, setOpenStatus] = useState(false);

    // If we click the button, it changes the state. If it is open, we want to close the dropdown, if it is closed we want it open
    const toggleStatus = () => {
        setOpenStatus(!openStatus);
    };

    // If we hover over the button and it isn't open and we want it open, we want it open.
    // If it is already open, keep it open.
    const hoverEnterStatus = () => {
        if (!openStatus) {
            setOpenStatus(true);
        }
    };

    const hoverExitStatus = (event) => {
        const relatedTarget = event.relatedTarget;

        // If (theres no new element hovered) or ((the new element is not related to the current element)
        // and (there is no other ancestor in dropdown)) then we close the dropdown
        if (
            !relatedTarget ||
            !(relatedTarget instanceof Node) ||
            (!event.currentTarget.contains(relatedTarget) &&
                relatedTarget.closest(".dropdown") === null)
        ) {
            setOpenStatus(false);
        }
    };
    return (
        <div className="dropdown">
            <button
                className="main_text small shadow_down"
                onClick={toggleStatus}
                onMouseEnter={hoverEnterStatus}
                onMouseLeave={hoverExitStatus}
            >
                {location === "/" ? "Join/Sign In" : "Username"}
            </button>
            <div className="hidden_div">
                <div
                    className={`dropdown_content ${openStatus ? "visible" : "hidden"}`}
                    onMouseLeave={hoverExitStatus}
                >
                    <OptionsMenu />
                </div>
            </div>
        </div>
    );
}

export function Dropup({ OptionsMenu }) {
    var location = useLocation().pathname;
    const [openStatus, setOpenStatus] = useState(false);

    const toggleStatus = () => {
        setOpenStatus(!openStatus);
    };

    const hoverEnterStatus = () => {
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

    return (
        <div
            className="dropup "
            onMouseLeave={hoverExitStatus}
            style={{ width: "100%" }}
        >
            <div
                className="top_rounded shadow_up"
                style={{ alignSelf: "center", padding: "0.2em" }}
            >
                <button
                    className="main_text small corner_rounding"
                    onClick={toggleStatus}
                    onMouseEnter={hoverEnterStatus}
                    style={{ width: "100%", padding: ".4em" }}
                >
                    {location === "/" ? "Join/Sign In" : "Username"}
                </button>
            </div>
            <div>
                <div
                    className={`dropup_content ${openStatus ? "visible" : "hidden"}`}
                >
                    <OptionsMenu />
                </div>
            </div>
        </div>
    );
}

const LeftSideDefault = () => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <img
                className="logo_img"
                src={`data:image/png;base64,${favicon}`}
            />
            <h1
                className="main_text medium"
                style={{ display: "inline-block" }}
            >
                Provo Techspert
            </h1>
        </div>
    );
};

const RightSideDefault = ({ OptionsMenu }) => {
    return <Dropdown OptionsMenu={OptionsMenu} />;
};

export function Header({
    OptionsMenu,
    LeftSide = LeftSideDefault,
    RightSide = RightSideDefault,
}) {
    return (
        <header className="metallic shadow_down">
            <div className="splitter">
                <div className="left push_left">
                    <LeftSide />
                    {/* TODO: In the future when the chat starts to be filled out this will be dependent on if it is the chat page and, if it is,
          whether or not it is a small screen (60 em) */}
                </div>
                <div className="right push_right">
                    <RightSide OptionsMenu={OptionsMenu} />
                </div>
            </div>
        </header>
    );
}

export function NotFound() {
    return (
        <main className="center" style={{ padding: 2 + "em" }}>
            404: Address unknown. Try going to simply
            https://ProvoTechspert.click
        </main>
    );
}

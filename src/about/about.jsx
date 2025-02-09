import React, { lazy } from "react";
import { Header } from "../components";
import "./about.css";

function JoinButtonClicked() {
    window.location.href = "/chat/";
}

function SignInButtonClicked() {
    window.location.href = "/chat/";
}

function AboutDropdownOptions() {
    return (
        <form>
            <div className="form_format">
                <label className="main_text small">Username</label>
                <input className="bordered_montserrat small" />
                <label className="main_text small">Password</label>
                <input className="bordered_montserrat small" />
                <label className="main_text small">Email (Join Only)</label>
                <input className="bordered_montserrat small" />
            </div>
            <div style={{ flexDirection: "row" }}>
                <button
                    type="button"
                    className="main_text"
                    onClick={JoinButtonClicked}
                >
                    Join
                </button>
                <button
                    type="button"
                    className="main_text"
                    onClick={SignInButtonClicked}
                >
                    Sign In
                </button>
            </div>
        </form>
    );
}

function About() {
    const GitHubButtonClicked = () => {
        window.open("https://github.com/JoshYacktman/Provo-Techspert");
    };

    return (
        <div>
            <Header OptionsMenu={AboutDropdownOptions} />
            <div>
                {/* Banner */}
                <div className="banner">
                    <img src="/images/banner.jpg" />
                    <h1 className="text_overlay complementary_font large">
                        Repair should be honest.
                    </h1>
                </div>

                {/* Why Me? */}
                <div
                    className="splitter picture_left"
                    style={{ backgroundColor: "var(--contrast_color_1)" }}
                >
                    <div className="left center">
                        <img
                            src="/images/promo_1.jpg"
                            className="promo_photo corner_rounding shadow_down"
                        />
                    </div>
                    <div className="right index_text center">
                        <h1 className="complementary_font large">Why Me?</h1>
                        <div className="paragraph_list">
                            <p
                                className="bordered_montserrat small"
                                style={{ paddingTop: 1.5 + "em" }}
                            >
                                1. I don't keep your device while replacement
                                parts are being delivered
                            </p>
                            <p className="bordered_montserrat small">
                                2. You choose my commision based on my
                                performance and only have to pay for replacement
                                parts
                            </p>
                            <p className="bordered_montserrat small">
                                3. You can choose to cancel the repair process
                                at any point
                            </p>
                            <p className="bordered_montserrat small">
                                4. You can watch and be a part of every step
                            </p>
                            <p className="bordered_montserrat small">
                                5. I record my work and give you the recording
                            </p>
                        </div>
                        <h1
                            className="complementary_font large"
                            style={{ paddingTop: 0.5 + "em" }}
                        >
                            Anything You Should Know?
                        </h1>
                        <div className="paragraph_list">
                            <p className="bordered_montserrat small">
                                1. You have to sign a release of liability
                                waiver before repairs can begin
                            </p>
                            <p className="bordered_montserrat small">
                                2. If you choose to purchase the parts and not
                                go through with the repair there are no refunds
                            </p>
                            <p className="bordered_montserrat small">
                                3. Use your real email, the chat service sends
                                email notifications after messages and doesn't
                                sell any data
                            </p>
                        </div>
                    </div>
                </div>

                {/* My Process */}
                <div
                    className="splitter picture_right"
                    style={{ backgroundColor: "var(--contrast_color_2)" }}
                >
                    <div className="left index_text center">
                        <h1 className="complementary_font large">My Process</h1>
                        <div className="paragraph_list">
                            <p
                                className="bordered_montserrat small"
                                style={{ paddingTop: 1.5 + "em" }}
                            >
                                1. I determine the issue with you in person and
                                purchase any needed parts upfront
                            </p>
                            <p className="bordered_montserrat small">
                                2. You are messaged in the chat service (alerts
                                you by email) when the parts arrive and you
                                bring in the device
                            </p>
                            <p className="bordered_montserrat small">
                                3. You sign a release of liability waiver
                                allowing me to begin repairs which you can watch
                                in person
                            </p>
                            <p className="bordered_montserrat small">
                                4. I return the device to you, upload the video
                                of my work, and let you choose my commision with
                                no obligation for any pay
                            </p>
                        </div>
                    </div>
                    <div className="right center">
                        <img
                            src="/images/promo_2.jpg"
                            className="promo_photo corner_rounding shadow_down"
                            loading="lazy"
                            decoding="async"
                        />
                        {/* TODO: Make this a picture of the chat screen with a user account */}
                    </div>
                </div>

                {/* About Me */}
                <div
                    className="splitter picture_left"
                    style={{ backgroundColor: "var(--contrast_color_3)" }}
                >
                    <div className="left center">
                        <img
                            src="/images/profile.jpg"
                            className="promo_photo corner_rounding shadow_down"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                    <div className="right index_text center">
                        <h1 className="complementary_font large">
                            Meet the Technician
                        </h1>
                        <p
                            className="main_text medium"
                            style={{ paddingTop: 0.5 + "em" }}
                        >
                            Joshua Yacktman
                        </p>
                        <p className="bordered_montserrat small">
                            I am a Freshman at BYU studying Computer Science
                            with a passion for both hardware and software alike.
                            Starting at a young age I found great enjoyment in
                            solving puzzles and taking things apart. This has
                            led to passions such as competetive Rubik's Cube
                            solving, programming, and (as you're likely here
                            for) tech repair!
                        </p>
                    </div>
                </div>

                <footer className="metallic shadow_up">
                    <div className="push_left">
                        <button
                            className="main_text small shadow_up"
                            onClick={GitHubButtonClicked}
                        >
                            GitHub
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default About;

import React, { useState } from "react";
import { Header } from "../components";
import "./about.css";

const blankBanner =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABgQAAAKJAQMAAABOO9BRAAAAA1BMVEVEREQ1TRdOAAAAjklEQVR4Xu3AgQAAAACAoP2pF6kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABrr4QABG5gDGgAAAABJRU5ErkJggg==";
const blankImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA1IAAANSAQMAAABV6G1EAAAAA1BMVEVEREQ1TRdOAAAAb0lEQVR4Xu3BAQ0AAADCoPdPbQ8HFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwZmanAAHsp6wLAAAAAElFTkSuQmCC";
const headers = {
  "Content-Type": "application/json",
};

function AboutDropdownOptions() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid = userName.length >= 3 && password.length >= 5;

  async function handleJoinSignIn() {
    setLoading(true);

    try {
      let response = await fetch(
        "https://provotechspert.click/api/auth/manage",
        {
          method: "POST",
          headers,
          body: JSON.stringify({ username: userName, password }),
        },
      );

      let text = await response.text();

      if (text === "User created") {
        localStorage.setItem("username", userName);
        window.location.href = "/chat/";
      } else if (text === "Existing user") {
        response = await fetch("https://provotechspert.click/api/auth/login", {
          method: "POST",
          headers,
          body: JSON.stringify({ username: userName, password }),
        });

        text = await response.text();

        if (text !== "User logged in") {
          alert(text);
        } else {
          localStorage.setItem("username", userName);
          window.location.href = "/chat/";
        }
      } else {
        alert(text);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form>
      <div className="form_format">
        <label className="main_text small">Username</label>
        <input
          className="bordered_message_font small form_input small_corner_rounding"
          maxLength="15"
          minLength="3"
          value={userName}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleJoinSignIn();
            }
          }}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <label className="main_text small">Password</label>
        <input
          className="bordered_message_font small form_input small_corner_rounding"
          maxLength="20"
          minLength="5"
          type="password"
          value={password}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleJoinSignIn();
            }
          }}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div style={{ flexDirection: "row" }}>
        <button
          type="button"
          className="main_text very_small dropdown_buttons"
          onClick={handleJoinSignIn}
          disabled={!isValid || loading}
        >
          {loading ? "Loading..." : "Join/Sign In"}
        </button>
      </div>
    </form>
  );
}

function About() {
  const userName = localStorage.getItem("username");
  if (userName !== null) {
    window.location.href = "/chat";
    return;
  }

  const GitHubButtonClicked = () => {
    window.open("https://github.com/JoshYacktman/Provo-Techspert");
  };

  const [bannerLoaded, setBannerLoaded] = useState(false);
  const [promoOneLoaded, setPromoOneLoaded] = useState(false);
  const [promoTwoLoaded, setPromoTwoLoaded] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);

  return (
    <div>
      <Header OptionsMenu={AboutDropdownOptions} />
      <div>
        {/* Banner */}
        <div className="banner">
          <img
            src={bannerLoaded ? "/images/banner.jpg" : blankBanner}
            onLoad={() => setBannerLoaded(true)}
            alt="Banner"
          />
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
              src={promoOneLoaded ? "/images/promo_1.jpg" : blankImage}
              className="promo_photo corner_rounding shadow_down"
              onLoad={() => setPromoOneLoaded(true)}
              alt="Promo 1"
            />
          </div>
          <div className="right index_text center">
            <h1 className="complementary_font large">Why Me?</h1>
            <div className="paragraph_list">
              <p
                className="bordered_message_font small"
                style={{ paddingTop: 1.5 + "em" }}
              >
                1. I don't keep your device while replacement parts are being
                delivered
              </p>
              <p className="bordered_message_font small">
                2. You choose my commision based on my performance and only have
                to pay for replacement parts
              </p>
              <p className="bordered_message_font small">
                3. You can choose to cancel the repair process at any point
              </p>
              <p className="bordered_message_font small">
                4. You can watch and be a part of every step
              </p>
              <p className="bordered_message_font small">
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
              <p className="bordered_message_font small">
                1. You have to sign a release of liability waiver before repairs
                can begin
              </p>
              <p className="bordered_message_font small">
                2. If you choose to purchase the parts and not go through with
                the repair there are no refunds
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
                className="bordered_message_font small"
                style={{ paddingTop: 1.5 + "em" }}
              >
                1. I determine the issue with you in person and purchase any
                needed parts upfront
              </p>
              <p className="bordered_message_font small">
                2. You are messaged in the chat service when the parts arrive
                and you bring in the device
              </p>
              <p className="bordered_message_font small">
                3. You sign a release of liability waiver allowing me to begin
                repairs which you can watch in person
              </p>
              <p className="bordered_message_font small">
                4. I return the device to you, upload the video of my work, and
                let you choose my commision with no obligation for any pay
              </p>
            </div>
          </div>
          <div className="right center">
            <img
              src={promoTwoLoaded ? "/images/promo_2.jpg" : blankImage}
              className="promo_photo corner_rounding shadow_down"
              onLoad={() => setPromoTwoLoaded(true)}
              alt="Promo 2"
            />
          </div>
        </div>

        {/* About Me */}
        <div
          className="splitter picture_left"
          style={{ backgroundColor: "var(--contrast_color_3)" }}
        >
          <div className="left center">
            <img
              src={profileLoaded ? "/images/profile.jpg" : blankImage}
              className="promo_photo corner_rounding shadow_down"
              onLoad={() => setProfileLoaded(true)}
              alt="Profile"
            />
          </div>
          <div className="right index_text center">
            <h1 className="complementary_font large">Meet the Technician</h1>
            <p className="main_text medium" style={{ paddingTop: 0.5 + "em" }}>
              Joshua Yacktman
            </p>
            <p className="bordered_message_font small">
              I am a Freshman at BYU studying Computer Science with a passion
              for both hardware and software alike. Starting at a young age I
              found great enjoyment in solving puzzles and taking things apart.
              This has led to passions such as competetive Rubik's Cube solving,
              programming, and (as you're likely here for) tech repair!
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

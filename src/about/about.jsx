import React from "react";

import bannerImg from "/images/banner.jpg";
import promo1Img from "/images/promo_1.jpg";
import promo2Img from "/images/promo_2.jpg";
import profileImg from "/images/profile.jpg";


function About() {
    return (
        <div>
            {/* Banner */}
            <div className="banner">
                <img src={bannerImg} />
                <h1 className="text_overlay complementary_font large">Provo Techspert</h1>
            </div>


            {/* Why Me? */}
            <div className="splitter picture_left" style={{backgroundColor: "var(--contrast_color_1)"}}>
                <div className="left center">
                    <img src={promo1Img} className="promo_photo rounded shadow_down" />
                </div>
                <div className="right index_text center">
                    <h1 className="complementary_font large">Why Me?</h1>
                    <div className="paragraph_list">
                        <p className="formal_font normal" style={{paddingTop: 1.5 + "em"}}>1. I don't keep your device while replacement parts are being delivered</p>
                        <p className="formal_font normal">2. You choose my commision based on my performance and only have to pay for replacement parts</p>
                        <p className="formal_font normal">3. You can choose to cancel the repair process at any point</p>
                        <p className="formal_font normal">4. You can watch and be a part of every step</p>
                        <p className="formal_font normal">5. I record my work and give you the recording</p>
                    </div>
                    <h1 className="complementary_font large" style={{paddingTop: .5 + "em"}}>Anything You Should Know?</h1>
                    <div className="paragraph_list">
                        <p className="formal_font normal">1. You have to sign a release of liability waiver before repairs can begin</p>
                        <p className="formal_font normal">2. If you choose to purchase the parts and not go through with the repair there are no refunds</p>
                        <p className="formal_font normal">3. Use your real email, the chat service sends email notifications after messages and doesn't sell any data</p>
                    </div>
                </div>
            </div>


            {/* My Process */}
            <div className="splitter picture_right" style={{backgroundColor: "var(--contrast_color_2)"}}>
                <div className="left index_text center">
                    <h1 className="complementary_font large">My Process</h1>
                    <div className="paragraph_list">
                        <p className="formal_font normal"  style={{paddingTop: 1.5 + "em"}}>1. I determine the issue with you in person and purchase any needed parts upfront</p>
                        <p className="formal_font normal">2. You are messaged in the chat service (alerts you by email) when the parts arrive and you bring in the device</p>
                        <p className="formal_font normal">3. You sign a release of liability waiver allowing me to begin repairs which you can watch in person</p>
                        <p className="formal_font normal">4. I return the device to you, upload the video of my work, and let you choose my commision with no obligation for any pay</p>
                    </div>
                </div>
                <div className="right center">
                    <img src={promo2Img} className="promo_photo rounded shadow_down" />
                    {/* TODO: Make this a picture of the chat screen with a user account */}
                </div>
            </div>


            {/* About Me */}
            <div className="splitter picture_left" style={{backgroundColor: "var(--contrast_color_3)"}}>
                <div className="left center">
                    <img src={profileImg} className="promo_photo rounded shadow_down" />
                </div>
                <div className="right index_text center">
                    <h1 className="complementary_font large">Meet the Technician</h1>
                    <p className="formal_font medium" style={{paddingTop: 0.5 + "em"}}>Joshua Yacktman</p>
                    <p className="formal_font normal" style={{paddingTop: 2 + "em"}}>I am a Freshman at BYU studying Computer Science with a passion for both hardware and software alike. Starting at a young age I found great enjoyment in solving puzzles and taking things apart. This has led to passions such as competetive Rubik's Cube solving, programming, and (as you're likely here for) tech repair!</p>
                </div>
            </div>
        </div>
    );
}

export default About;
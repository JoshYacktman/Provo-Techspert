import React from "react";

function Settings () {
    return (
        <div className="work_area">
            <h1>Account Settings</h1>
            <p>Proper settings component</p>
            <p>Database inference</p>
            <form>
                <div>
                    <label for="new-email">New Email:</label>
                    <input type="email" name="new-email" placeholder="Enter new email" />
                    <button type="button" className="shadow_down">Change Email</button>
                </div>

                <div id="change-password">
                    <label for="new-password">New Password:</label>
                    <input type="password" name="new-password" placeholder="Enter new password" />
                    <button type="button">Change Password</button>
                </div>

                <div>
                    <label>Delete Account?</label>
                    <button type="button">Delete Account</button>
                </div>
            </form>
        </div>
    );
}

export default Settings;
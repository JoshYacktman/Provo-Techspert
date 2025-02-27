import React from "react";
import ReactDOM from "react-dom/client";

function Test () {
    function openPopup() {
        document.getElementById("popupOverlay").style.display = "flex";
    }

    function closePopup() {
        document.getElementById("popupOverlay").style.display = "none";
    }

    return (
      <div>
            <button onClick={openPopup}>Create Chat</button>

            <div className="overlay" id="popupOverlay" onClick={closePopup}>
                <div className="popup" onClick={(event) => event.stopPropagation()}>
                  <div className="popup-header">
                      <p className="header_text">Chat Name:</p>
                        <button onClick={closePopup}>&times;</button>
                  </div>
                  <input type="text" placeholder="Broken..." />
                    <button style={{ marginTop: "0.3em" }} >Create</button>
              </div>
          </div>
      </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Test />);

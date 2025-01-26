import React, {useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./about/about";
import Chat from "./chat/chat";
import Settings from "./settings/settings";
import { Header, NotFound } from "./components";

import "../public/css/main.css";
import "../public/css/utils.css";
import "../public/css/page_fills.css";

function App() {
  const calculateWidthInEm = () => {
    return window.innerWidth / parseFloat(getComputedStyle(document.documentElement).fontSize);
  };
  const [screenWidthInEm, setScreenWidthInEm] = useState(calculateWidthInEm());

  const appResizeHandler = () => {
    const newWidthInEm = calculateWidthInEm();
    setScreenWidthInEm(newWidthInEm);
    setDeviceLoad(newWidthInEm > 60 ? "desktop" : "mobile");
  }
  const [deviceLoad, setDeviceLoad] = useState(screenWidthInEm > 60 ? "desktop" : "mobile");
  window.addEventListener('resize', appResizeHandler);

  return (
    <BrowserRouter style={{ height: 100 + "%" }}>
      <Header />

      <Routes style={{ height: 100 + "%" }}>
        <Route path="/" element={<About deviceLoad={deviceLoad} />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
// TODO: Make Tauri Mobile and Desktop bundles

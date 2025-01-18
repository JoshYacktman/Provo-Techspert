import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./about/about";
import Chat from "./chat/chat";
import Settings from "./settings/settings";
import { Header, Footer, NotFound } from "./components";

import "../public/css/main.css";
import "../public/css/utils.css";
import "../public/css/page_fills.css";
import "../index.css";

function App() {
  return (
    <BrowserRouter style={{ height: 100 + "%" }}>
      <Header />

      <Routes style={{ height: 100 + "%" }}>
        <Route path="/" element={<About />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
// TODO: Make Tauri Mobile and Desktop bundles

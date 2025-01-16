import React from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";

import "./app.css";
import Header from "./components/Header";
import NewContact from "./pages/NewContact";
import Contacts from "./pages/Contacts";
import ContactDetail from "./pages/ContactDetail";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

const root = document.getElementById("root");
if (root !== null) {
  const appRoot = createRoot(root);
  appRoot.render(
    <React.Fragment>
      <ToastContainer position="bottom-right" theme="dark" />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home key="home" />} />
            <Route path="/contacts" element={<Contacts key="contacts" />} />
            <Route path="/new-contact" element={<NewContact key="new-contact" />} />
            <Route path="/contact/:id" element={<ContactDetail key="contact-detail" />} key="contact-detail"></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </React.Fragment>
  );
}

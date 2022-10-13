import React, { useState } from "react";
import "../style/App.css";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Arsip from "../pages/Arsip";
import Detail from "../pages/Detail";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import ErrorPage from "../pages/errorPage";
import { LocaleProvider } from "../contexts/locale-contexts";

function App() {
  const [localContext, setLocalContext] = useState({
    locale: localStorage.getItem("locale"),
    toggleLocale: () => handleTranslate()
  });

  const [thema, setTemaContext] = useState({
    pageThema: localStorage.getItem("thema"),
    toggleThema: () => handleThema()
  });

  const handleTranslate = () => {
    const prevLanguage = localStorage.getItem("locale");
    const newLocale = prevLanguage === "id" ? "en" : "id";
    localStorage.setItem("locale", newLocale);
    setLocalContext({
      ...localContext,
      locale: newLocale,
    });
  }

  const handleThema = () => {
    const prevThema = localStorage.getItem("thema");
    const newThema = prevThema === "dark" ? "light" : "dark";
    localStorage.setItem("thema", newThema);
    setTemaContext({
      ...thema,
      pageThema: newThema,
    });
  };
  return (
    <LocaleProvider value={{ localContext, thema }}>
      <div className={`App ${thema.pageThema}`}>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/arsip"
              element={
                <ProtectedRoute>
                  <Arsip />
                </ProtectedRoute>
              }
            />
            <Route
              path="/detail/:id"
              element={
                <ProtectedRoute>
                  <Detail />
                </ProtectedRoute>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
      </div>
    </LocaleProvider>
  );
}

export default App;

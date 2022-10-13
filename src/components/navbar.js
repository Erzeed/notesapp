/* eslint-disable react/no-unescaped-entities */
import React from "react";
import "../style/navbar.css";
import { Link } from "react-router-dom";
import iconPlus from "../asset/icon/icons8-plus-24.png";
import iconLogOut from "../asset/icon/icons8-log-out.png";
import iconTranslate from "../asset/icon/icons8-translate.png";
import iconsLightMode from "../asset/icon/icons8-light-mode.png";
import iconsDarkMode from "../asset/icon/icons8-dark-mode.png";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { LocaleConsumer } from "../contexts/locale-contexts";

export const Navbar = ({ openForm, onKeyKlik, isLogin }) => {
  const navigate = useNavigate();
  const handlLogOut = () => {
    const logOut = confirm("Anda yakin ingin keluar");
    if (logOut) {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  };
  return (
    <LocaleConsumer>
      {({ thema, localContext }) => {
        const {locale, toggleLocale} = localContext;
        const {pageThema, toggleThema} = thema;
        return (
          <div className={`topBar ${pageThema}`}>
            <div className="logo">
              <p>{locale === "id" ? "Catatan" : "Notes"}</p>
            </div>
            <div className="topBar_searchBar">
              {isLogin ? (
                <input
                  type="text"
                  onKeyUp={onKeyKlik}
                  placeholder={locale === "id" ? "Cari" : "Search"}
                />
              ) : (
                ""
              )}
            </div>
            <nav>
              {isLogin ? (
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/arsip">
                      {locale === "id" ? "Arsip" : "Archived"}
                    </Link>
                  </li>
                </ul>
              ) : (
                ""
              )}
              <div className="newProject">
                {openForm !== undefined ? (
                  <button className="btnNewProject" onClick={openForm}>
                    <img src={iconPlus} alt="icon plus" />
                  </button>
                ) : (
                  ""
                )}
                <button className="btnNewProject" onClick={toggleThema}>
                  <img src={
                    pageThema === "light" ? iconsLightMode : iconsDarkMode
                  } alt="icon theme mode" />
                </button>
                <button className="btnNewProject" onClick={toggleLocale}>
                  <img src={iconTranslate} alt="icon translate" />
                </button>
                {isLogin ?
                  <button className="btnNewProject" onClick={handlLogOut}>
                    <img src={iconLogOut} alt="icon logOut" />
                  </button>
                  : ""
                }
              </div>
            </nav>
          </div>
        );
      }}
    </LocaleConsumer>
  );
};

Navbar.propTypes = {
  openForm: PropTypes.func,
  onKeyKlik: PropTypes.func,
  isLogin: PropTypes.bool.isRequired
};

import React from "react";
// import { useState, useEffect } from "react";
import { Buttom } from "../components/button";
import useDataInput from "../utils/custom-hooks";
import { register } from "../utils/data-api";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { LocaleConsumer } from "../contexts/locale-contexts";
import "../style/register.css";

function Register() {
  const navigate = useNavigate();
  const [dataUser, setInputData] = useDataInput();
  const onHandleChange = (data) => {
    setInputData(data);
  };

  const onHandleSubmit = async () => {
    const response = await register(dataUser);
    if (response.error === false) {
      alert("succes");
      navigate("/login");
    }
  };

  const onNewLogin = () => {
    navigate("/login");
  };

  return (
    <LocaleConsumer>
      {({ localContext, thema }) => {
        const {locale} = localContext;
        const {pageThema} = thema;
        return (
          <div className={`container ${pageThema} register`}>
            <Navbar isLogin={false} />
            <div className="register">
              <p>{locale === "id" ? "Daftar" : "Register"}</p>
              <form>
                <input
                  type="name"
                  id="name"
                  placeholder="Name"
                  onChange={(data) => onHandleChange(data)}
                />
                <br />
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  onChange={(data) => onHandleChange(data)}
                />
                <br />
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  onChange={(data) => onHandleChange(data)}
                />
                <br />
              </form>
              <Buttom
                onClick={onHandleSubmit}
                title={locale === "id" ? "Daftar" : "Register"}
                // loading={this.props.isLoading}
              />
              <div className="registerNewAccount">
                <p onClick={onNewLogin}>
                  {locale === "id" ? "Masuk Sekarang" : "Login Now"}
                </p>
              </div>
            </div>
          </div>
        );
      }}
    </LocaleConsumer>
  );
}

export default Register;

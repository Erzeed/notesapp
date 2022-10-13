import React from "react";
// import { useState, useEffect } from "react";
import { Buttom } from "../components/button";
import useDataInput from "../utils/custom-hooks";
import { useNavigate } from "react-router-dom";
import { login, putAccessToken } from "../utils/data-api";
import { Navbar } from "../components/navbar";
import { LocaleConsumer } from "../contexts/locale-contexts";
import "../style/register.css";

function Login() {
  const navigate = useNavigate();
  const [dataUser, setInputData] = useDataInput();
  const onHandleChange = (data) => {
    setInputData(data);
  };

  const onHandleSubmit = async () => {
    const response = await login(dataUser);
    if (response.error === false) {
      alert("succes");
      putAccessToken(response.data.accessToken);
      navigate("/");
    }
  };

  const onRegister = () => {
    navigate("/register");
  };

  return (
    <LocaleConsumer>
      {({ localContext, thema }) => {
        const {locale} = localContext;
        const {pageThema} = thema;
        return (
          <div className={`container ${pageThema} login`}>
            <Navbar isLogin={false} />
            <div className="login">
              <p>{locale === "id" ? "Masuk Sekarang" : "Login Now"}</p>
              <form>
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
                title={locale === "id" ? "Masuk" : "Login"}
                // loading={this.props.isLoading}
              />
              <div className="loginAccount">
                <p onClick={onRegister}>{locale === "id" ? "Daftar Sekarang" : "Register Now"}</p>
              </div>
            </div>
          </div>
        );
      }}
    </LocaleConsumer>
  );
}

export default Login;

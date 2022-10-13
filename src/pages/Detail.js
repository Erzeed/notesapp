import React from "react";
import { useState, useEffect } from "react";
import { Navbar } from "../components/navbar";
import "../style/detail.css";
import { useParams } from "react-router-dom";

function Detail() {
  const [note, setNote] = useState(null);
  const params = useParams();
  const data = JSON.parse(localStorage.getItem("data"));

  useEffect(() => {
    document.title = "Detail";
    setNote(showData());
  }, []);

  const showData = () => {
    let tempData = null;
    data.forEach((e) => {
      if (e.id == params.id) {
        tempData = e;
      }
    });
    return tempData;
  };

  return (
    <div className="detail">
      <Navbar />
      <div className="detail__note">
        <div className="note__title">
          <h1>{note !== null ? note.title : "data tidak ditemukan"}</h1>
        </div>
        <div className="note__body">
          <p>{note !== null ? note.body : ""}</p>
        </div>
      </div>
    </div>
  );
}

export default Detail;

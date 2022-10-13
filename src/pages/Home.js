import React, { useState, useEffect } from "react";
import "../style/App.css";
import { CardContainer } from "../components/cardContainer";
import { Form } from "../components/form";
import { Navbar } from "../components/navbar";
import { searchData } from "../utils/handleData";
import {
  getActiveNotes,
  addNote,
  archiveNote,
  deleteNote,
} from "../utils/data-api";
import { useSearchParams } from "react-router-dom";

function Home() {
  const [data, setData] = useState({
    title: "",
    body: "",
  });

  const [countText, setCountText] = useState(50);
  const [dataNote, setDataNote] = useState();
  const [showData, setShowData] = useState();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    async function getData() {
      const dataActiveNote = await getActiveNotes();
      setDataNote(dataActiveNote.data);
    }
    getData();
    document.title = "Home";
  }, [showData]);

  const onHandleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
    onHandleCountText(e.target.id, e.target.value.length);
  };

  const onHandleCountText = (columnName, charLength) => {
    if (columnName === "title") {
      setCountText(50 - charLength);
    }
  };

  const onHandleSubmit = async () => {
    const response = await addNote(data);
    const { title, body } = data;
    if (title == "" || body == "") {
      alert("Semua data harus terisi");
    } else if (response.error === false) {
      alert("succes");
      setShowData(data);
      setData({
        title: "",
        body: "",
      });
    }
    setCountText(50);
  };

  const onHandleForm = (display) => {
    const form = document.querySelector(".container_form");
    form.style.display = display;
  };

  const onHandleMove = async () => {
    const id = localStorage.getItem("id");
    const moveToArsip = await archiveNote(id);
    setShowData(moveToArsip);
  };

  const onHandleDelete = async () => {
    const id = localStorage.getItem("id");
    const newDataNote = await deleteNote(id);
    setShowData(newDataNote);
  };

  const onHandleSearch = async (event) => {
    const search = event.target.value;
    const dataSearch = await searchData(event);
    setSearchParams({ search });
    setDataNote(dataSearch);
  };

  return (
    <div className="home">
      <Navbar
        onKeyKlik={onHandleSearch}
        isLogin={true}
        openForm={() => onHandleForm("block")}
      />
      <CardContainer
        dataNote={dataNote}
        onClickBtn={() => onHandleMove("arsip")}
        onDelete={onHandleDelete}
        title={"Notes"}
      />
      <Form
        title={data.title}
        char={countText}
        content={data.body}
        onCancel={() => onHandleForm("none")}
        onSubmit={onHandleSubmit}
        onChange={onHandleChange}
      />
    </div>
  );
}

export default Home;

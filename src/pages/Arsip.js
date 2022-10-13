import React, { useState, useEffect } from "react";
import "../style/App.css";
import { CardContainer } from "../components/cardContainer";
import { Navbar } from "../components/navbar";
import { searchDataArsip } from "../utils/handleData";
import { getArchivedNotes, deleteNote, unarchiveNote } from "../utils/data-api";
import { useSearchParams } from "react-router-dom";
import { LocaleConsumer } from "../contexts/locale-contexts";

function Arsip() {
  const [showData, setShowData] = useState();
  const [triger, setTriger] = useState();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const id = localStorage.getItem("id");
  document.title = "Arsip";

  useEffect(() => {
    handleData();
  }, [triger]);

  const handleData = async () => {
    const dataArsipNote = await getArchivedNotes();
    setShowData(dataArsipNote.data);
  };

  const onHandleMove = async () => {
    const moveNote = await unarchiveNote(id);
    setTriger(moveNote);
  };

  const onHandleDelete = async () => {
    const newDataNote = await deleteNote(id);
    setTriger(newDataNote);
  };

  const onHandleSearch = async (event) => {
    const search = event.target.value;
    const dataSearch = await searchDataArsip(event);
    setSearchParams({ search });
    setShowData(dataSearch);
  };

  return (
    <LocaleConsumer>
      {({ localContext }) => {
        const {locale } = localContext;
        return (
          <div className="Arsip">
            <Navbar onKeyKlik={onHandleSearch} isLogin={true} />
            <CardContainer
              dataNote={showData}
              onClickBtn={() => onHandleMove("unArsip")}
              onDelete={onHandleDelete}
              title={locale === "id" ? "Arsip" : "Archived"}
            />
          </div>
        );
      }}
    </LocaleConsumer>
  );
}

export default Arsip;

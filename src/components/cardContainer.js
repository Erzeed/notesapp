import React from "react";
import { Card } from "./card";
import "../style/cardContainer.css";
import PropTypes from "prop-types";
import { LocaleConsumer } from "../contexts/locale-contexts";

export const CardContainer = ({ title, dataNote, onClickBtn, onDelete }) => {
  const onHandleMove = (id) => {
    localStorage.setItem("id", id);
  };

  return (
    <LocaleConsumer>
      {({ thema, localContext }) => {
        const {locale} = localContext;
        const {pageThema} = thema;
        return (
          <div className={`app_main__note ${pageThema}`}>
            <div className="app_main__note__title">
              <h3>{title}</h3>
            </div>
            <div className="app_main__note__body">
              {dataNote ? (
                dataNote.length !== 0 ? (
                  dataNote.map((card) => {
                    return (
                      <Card
                        key={card.id}
                        onClickArchive={onHandleMove}
                        onDelete={onDelete}
                        onClickBtn={onClickBtn}
                        {...card}
                      />
                    );
                  })
                ) : (
                  <p className="text">{locale === 'id' ? 'Data tidak ditemukan' : 'Data not found'}</p>
                )
              ) : (
                <p className="text">{locale === 'id' ? 'Data kosong' : 'Empty data'}</p>
              )}
            </div>
          </div>
        );
      }}
    </LocaleConsumer>
  );
};

CardContainer.propTypes = {
  onClickBtn: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  dataNote: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

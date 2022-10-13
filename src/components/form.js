import React from "react";
import "../style/form.css";
import PropTypes from "prop-types";
import { LocaleConsumer } from "../contexts/locale-contexts";

export const Form = ({
  onSubmit,
  onChange,
  onCancel,
  char,
  title,
  content,
}) => {
  return (
    <LocaleConsumer>
      {({ localContext, thema }) => {
        const {locale} = localContext;
        const {pageThema} = thema;
        return (
          <div className={`container_form ${pageThema}`} style={{ display: "none" }}>
            <form action="">
              <label htmlFor="judul">{locale === 'id' ? 'Judul' : 'Title'} ({char})</label>
              <input
                type="text"
                name="judul"
                onChange={onChange}
                maxLength={"50"}
                placeholder="Judul"
                id="title"
                value={title}
              />
              <label htmlFor="content">{locale === 'id' ? 'Kontent' : 'Content'}</label>
              <textarea
                name="content"
                id="body"
                onChange={onChange}
                placeholder="Content"
                cols="30"
                rows="10"
                value={content}
              ></textarea>
            </form>
            <div className="container_form__action">
              <button type="submit" onClick={onSubmit}>
              {locale === 'id' ? 'Kirimkan' : 'Submit'}
              </button>
              <button onClick={onCancel}>
              {locale === 'id' ? 'Tutup' : 'Close'}
              </button>
            </div>
          </div>
        );
      }}
    </LocaleConsumer>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  char: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

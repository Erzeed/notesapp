import React from "react";
import "../style/card.css";
import Archive from '../asset/icon/arsip.svg';
import Unarchive from '../asset/icon/unarsive.svg';
import Trash from '../asset/icon/trash.svg';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export const Card = ({ title, body, createdAt, archived, id, onClickArchive,onClickBtn,onDelete }) => {
    const randomColor = () => {
        const colors = [
            "#CDF0EA",
            "#fbe9f3",
            "#F9F9F9",
            "#FAF4B7",
            "#DFF6FF",
            "#F7FF93"
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };
    const showFormattedDate = (date) => {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Date(date).toLocaleDateString("id-ID", options);
    };
    const limitBodyText = (text,long) => {
        if (text.length > long) {
            return text.substring(0, long) + "...";
        }   else {
            return text;
        }
    };


    return (
        <div className='card' style={{backgroundColor: randomColor()}}>
            <div className="card_date">
                <p>{showFormattedDate(createdAt)}</p>
            </div>
            <div className="card_title">
                <h2>
                    <Link to={`/detail/${id}`}>{limitBodyText(title,16)}</Link>
                </h2>
            </div>
            <div className="card_subtitle">
                <p>{limitBodyText(body,100)}</p>
            </div>
            <div className="card__actions">
                <button className="card_actions__btn"  >
                    {archived ? <img src={Unarchive} alt="unarchive" onClick={() => {onClickArchive(id); onClickBtn()} }/> : 
                    <img src={Archive} alt="archive" onClick={() => {onClickArchive(id); onClickBtn()}}/>}
                </button>
                <button className="card_trash__btn">
                    <img src={Trash} onClick={() => {onClickArchive(id); onDelete()}}  alt="delete" />
                </button>
            </div>
        </div>
    );
};

Card.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    onClickArchive: PropTypes.func.isRequired,
    onClickBtn: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

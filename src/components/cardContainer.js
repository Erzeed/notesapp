import React from 'react';
import { Card } from './card';
import '../style/cardContainer.css'

export const CardContainer = ({title,dataNote,onClickBtn,onDelete}) => {
    
    const onHandleMove = (id) => {
        localStorage.setItem("id", (id));
    }
    
    return (
        <div className="app_main__note">
            <div className="app_main__note__title">
                <h3>{title}</h3>
            </div>
            <div className="app_main__note__body">
                { 
                    dataNote.length !== 0 ?
                        dataNote.map(card => {
                            return <Card key={card.id} onClickArchive={onHandleMove} onDelete={onDelete} onClickBtn={onClickBtn} {...card}  />
                        }) 
                    : <p>Data Kosong</p>
                }
            </div>
        </div>
    );
}

import React from 'react';
import '../style/navbar.css'


export const Navbar = ({openForm,onKeyKlik}) => {

    return(
        <div className="topBar" >
            <div className="logo">
                <p>Simple Note's</p>
            </div>
            <div className="topBar_searchBar">
                <input type="text" onKeyUp={onKeyKlik}  placeholder="Search" />
            </div>
            <div className="nav">
                <div className="newProject">
                    <button className='btnNewProject'  onClick={openForm}>New Project +</button>
                </div>
            </div>
        </div>
    )
}
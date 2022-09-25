import React from 'react'
import '../style/form.css'

export const Form = ({ onSubmit, onChange ,onCancel,char,title, content}) => {

    return (
        <div className="container_form" style={{display: 'none'}}>
            <form action=''>
                <label htmlFor="judul">Judul ({char})</label>
                    <input type="text" name="judul" onChange={onChange} maxLength={'50'}  placeholder="Judul" id="title"  value={title}/>
                <label htmlFor="content">Conten</label>
                    <textarea name="content" id="body" onChange={onChange}   placeholder="Content" cols="30" rows="10" value={content} ></textarea>
            </form>
            <div className="container_form__action">
                <button type="submit" onClick={onSubmit}>Submit</button>
                <button onClick={onCancel}>Close</button>
            </div>
        </div>
)}
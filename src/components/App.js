import React from 'react'
import { useState } from 'react';
import '../style/App.css';
import { CardContainer } from './cardContainer';
import { Form } from './form';
import { Navbar } from './navbar';
import getInitialData from '../utils/data.js'



function App() {
  
  const [data,setData] = useState({
      id: +new Date(),
      title: '',
      body: '',
      createdAt: new Date().toISOString(),
      archived: false
  })

  const [countText, setCountText] = useState(50)
  const [dataNote, setdataNote] = useState(getInitialData())
  const [showData , setShowData] = useState(dataNote)
  
  const onHandleChange = (e) => {
    setData({
      ...data,
      [e.target.id] : e.target.value
    })
    onHandleCountText(e.target.id ,e.target.value.length)
  }
  
  const onHandleCountText = (columnName,charLength) => {
    if(columnName === 'title'){
      setCountText(50 - charLength)
    }
  }

  const onHandleSubmit = () => {
    const time = new Date().toISOString()
    const {body,title} = data

    if(body === '' || title === ''){
      alert('Semua kolom harus terisi')
    }else {
      setData({
        ...data,
          id: +new Date(),
          createdAt: time,
          archived: false
      })
      dataNote.push(data)
    }
  }

  const onHandleForm = (display) => {
    const form = document.querySelector('.container_form')
    form.style.display = display
  }

  const onHandleMove = (kategori) => {
    const id = localStorage.getItem('id')
    const newData = dataNote.map(e => {
        if(e.id == id){
            if(kategori === 'arsip'){
                return {...e, archived: true}
            }else if(kategori === 'unArsip'){
              return {...e, archived: false}
            }
          }
        return e
    })
    setdataNote(newData)
    setShowData(newData)
  }

  const onHandleDelete = _ => {
    const id = localStorage.getItem('id')
    const arr = []
    dataNote.map(e => {
      if(id != e.id){
        arr.push(e)
      }
    })
    setdataNote(arr)
    setShowData(arr)
  }

  const onHandleSearch = event => {
    const text = event.target.value
    const arr = []
    dataNote.filter(e => {
      if(e.title.toLowerCase().includes(text.toLowerCase())){
        arr.push(e)
        setShowData(arr)
      }else {
        setShowData(arr)
      }
    })
  }

  return (
    <div className="App">
      <Navbar onKeyKlik={onHandleSearch}   openForm={() => onHandleForm('block')}/>
      <CardContainer dataNote={showData.filter(e => e.archived === false ? e : '')} onClickBtn={() => onHandleMove('arsip')} onDelete={onHandleDelete} title={"Notes"}/>
      <CardContainer dataNote={showData.filter(e => e.archived === true ? e : '')} onClickBtn={() => onHandleMove('unArsip')} onDelete={onHandleDelete} title={"Arsip"} />
      <Form title={"Judul"} char={countText} body={"Content"} onCancel={() => onHandleForm('none')} onSubmit={onHandleSubmit} onChange={onHandleChange} />
    </div>
  );
}

export default App;

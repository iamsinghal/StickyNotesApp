import React from 'react';
import { connect } from 'react-redux';
import {addNote} from '../actions/noteActions';
import '../App.css';


 let AddNote = ({dispatch}) =>{
  
    let note = {
        title :"",
        content : ""
    }

    let title, content

        return(
            <form className="add-box" onSubmit={e => {
                e.preventDefault()
                if (!title.value.trim() || !content.value.trim() ) {
                  return
                }
                note.title = title.value;
                note.content = content.value;
                console.log(note);
                dispatch(addNote(note))
                title.value = ''
                content.value =''
              }}>
                <div >  
                <div>
                    <label className="control-label" htmlFor="name">Title:</label> 
                    <input type="text" className="form-control" id="name" name="name" ref={node => { title = node }} placeholder="Title" />                    
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="tagline">Content:</label>
                    <textarea type="text" className="form-control" id="tagline" name="tagline" ref={node => { content = node }}  placeholder="Content" />                    
                </div>
                <div className="form-group">
                    <button className="btn" type="submit">Add Note</button>
                </div>
                </div>
            </form>
        )
}

AddNote = connect()(AddNote);

export default AddNote;
    


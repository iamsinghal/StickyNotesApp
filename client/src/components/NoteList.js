import React, { Component } from 'react';
import {getNotes} from '../actions/noteActions';
import {fetchNotes} from '../actions/noteActions'
import {connect} from 'react-redux';
import Note from './Note';
// import Draggable from 'react-draggable';


class NoteList extends Component{

    constructor(props) {
        super(props);
        props =this
        
    }
   
    fetch(){

        var limit = this.refs.limit.value === "" ? 10 : this.refs.limit.value ;
        var startFrom = this.refs.startFrom.value === "" ? 0 : this.refs.startFrom.value ;
        var orderBy = this.menu.value;
        this.refs.limit.value = '';
        this.refs.startFrom.value = '';
        this.menu.value = "ASC";

        return {limit: limit, startFrom: startFrom, orderBy : orderBy}
    }

   render() {
    return (
     <div className="noteList"> 
            <div > 
                    { 
                         this.props.note.map(function(s,index){
                             return(
                                     <Note  key={index} info ={s} id ={index}/>
                             )         
                         }) 
                     }
         </div>
      
    </div>
    );
  }
}

const mapStateToProps = (state) => {
    console.log("From Get notes in notejs");
    
    console.log(state);
    return {
        n: state.getNotesReducers,
        note: state.noteReducers


    }
}

const mapDispatchToProps = (dispatch) => {
    console.log("From Get notes in notejs");
    
    return {
        getNotes : () =>{
            dispatch(getNotes());
        },
        fetchNotes : (value) =>{
            dispatch(fetchNotes(value));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (NoteList);
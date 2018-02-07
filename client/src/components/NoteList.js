import React, { Component } from 'react';
import {getNotes} from '../actions/noteActions';
import {connect} from 'react-redux';
import Note from './Note';


class NoteList extends Component{

    constructor(props) {
        super(props);
        props =this
    }
    
   render() {
    return (
     <div> 
         <button onClick ={()=> this.props.getNotes()}> Show All Notes</button> 
         <br />
         <br />
         <label> Start From </label> <input type="text" /> 
         <label> Limit </label> <input type="text" /> 

         <select>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
         </select>

         <button> Fetch </button>
         <div> 
                    { 
                         this.props.note.map(function(s,index){
                             return(
                                     <Note info ={s} key ={index}/>
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
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (NoteList);
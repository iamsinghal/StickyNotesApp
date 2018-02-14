import React, {Component} from 'react';
import {connect} from 'react-redux';
import Note from './Note.jsx';
// import Draggable from 'react-draggable';

class NoteList extends Component {

    constructor(props) {
        super(props);
        props = this

    }

    render() {
        return (
            <div className="noteList">
                <div >
                    {this
                        .props
                        .note
                        .map(function (s, index) {
                            return (<Note key={index} info ={s} id ={index}/>)
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
    return {note: state.noteReducers}
}

export default connect(mapStateToProps)(NoteList);
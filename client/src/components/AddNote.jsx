import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addNote} from '../actions/noteActions';
import {getId} from '../actions/noteActions';
import '../App.css';

let lastId;

class AddNote extends Component {

    constructor(props) {
        super(props);
        props = this
    }

    componentWillMount() {
        this
            .props
            .getId()
    }

    newNote() {
        var arr = this.props.note.map(o => o.id);
        if (arr.length !== 0) 
            lastId = Math.max.apply(Math, arr);
        
        var note = {
            "title": "",
            "content": "",
            "id": 0
        }

        note.title = this.refs.title.value;
        note.content = this.refs.content.value;
        note.id = ++lastId || 0;
        return note
    }

    render() {

        return (
            <form
                className="add-box"
                onSubmit={(e) => {
                e.preventDefault();
                if (!this.refs.title.value.trim() || !this.refs.content.value.trim()) {
                    return
                }
                this
                    .props
                    .addNote(this.newNote());
                this.refs.title.value = '';
                this.refs.content.value = ''
            }}>
                <div>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            ref="title"
                            placeholder="Title"/>
                    </div>

                    <div className="form-group">
                        <label>Content:</label>
                        <textarea
                            type="text"
                            className="form-control"
                            ref="content"
                            placeholder="Content"/>
                    </div>

                    <div className="form-group">
                        <button type="submit">Add Note</button>
                    </div>
                </div>
            </form>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        addNote: (value) => {
            dispatch(addNote(value));
        },
        getId: () => {
            dispatch(getId());
        }
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {lastNoteId: state.getIdReducer, note: state.noteReducers}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNote);
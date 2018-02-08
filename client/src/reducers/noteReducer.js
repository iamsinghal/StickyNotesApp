
import axios from 'axios';

const noteReducers = (state= [{
    title:"New Note",
    content :"Click here to edit...",
    id:0
}], action) => {

    switch(action.type){

        case "ADD_NOTE":
        var param = {
            title : action.payload.title,
            content : action.payload.content,
            id: action.id
        }
        axios
        .post('http://localhost:8888/addNote/',param)
        .then(res =>{
            console.log("Posted", res);
        })
        state = [
            ...state,
            {
                title: action.payload.title,
                content: action.payload.content,
                id: action.id++

            }
            
        ]
        console.log("New State", state)
        break;

        case "UPDATE_NOTE":

         param = {
            title : action.payload.title,
            content : action.payload.content,
            id: action.payload.id
        }
        axios
        .post('http://localhost:8888/updateNote/',param)
        .then(res =>{
            console.log("Posted", res);
        })

        var id = action.id;
        var newState = [
            ...state.slice(0, id),
            Object.assign({}, state[id], action.payload),
            ...state.slice(id+1)
        ]

         state = newState;
       
        break;

        case "DELETE_NOTE":

        param = action.payload.id;
        axios
        .delete('http://localhost:8888/deleteNote/',{data : { id : param}})
        .then(res =>{
            console.log("Delete request", res);
        })

        console.log("State before delete",state);
         id = action.id;

         state = state.filter(function( obj ) {
            return obj.id !== id;
        });
        break;


        case "GET_NOTES_FULFILLED":
            var notes = []

            notes = action.payload;

            state =notes;
            break;



        default:
        return state;

    }
    return state;
};

export default noteReducers;

import axios from 'axios';
import {apiURL} from '../config';

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
        .post(`${apiURL}/note/add`,param)
        .then(res =>{
            console.log("Posted", res);
        })
        state = [
            ...state,
            {
                title: action.payload.title,
                content: action.payload.content,
                id: action.id

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
        .put(`${apiURL}/note/${param.id}`,param)
        .then(res =>{
            console.log("Posted", res);
        })

        var id = action.payload.id;
        var obj = {}


        state.forEach((val, i)=>{
            if(id === val.id){
                val.title = action.payload.title;
                val.content = action.payload.content;

            }
            obj = state;
        })

         state = obj;
       
        break;

        case "DELETE_NOTE":

        param = action.payload.id;
        axios
        .delete(`${apiURL}/note/${param}`,{data : { id : param}})
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

        case "FETCH_NOTES_FULFILLED":
             notes = []

            notes = action.payload;

            state =notes;
            break;

        default:
        return state;

    }
    return state;
};

export default noteReducers;
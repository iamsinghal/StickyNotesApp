import axios from 'axios';
import {apiURL} from '../config';


let nextNodeId =0;

// const getId = () =>{
//         axios
//         .get(`${apiURL}/note/getId`)
//         .then( res =>{
//                 res.data.forEach(obj=>{
//                     var note = {
//                         title: obj.title,
//                         content : obj.content,
//                         id: obj.id
//                     }
//                     nextNodeId = note.id
//                 })
//             }
//        )
// }
// let lastId = getId(); 

export const addNote = (payload) => ({
  type: 'ADD_NOTE',
  id: nextNodeId++,
  payload
})

export const updateNote = (payload) => (
  {
  type: 'UPDATE_NOTE',
  id: payload.id,
  payload 
})

export const getNotes = (payload =1 ) => ({
  type: 'GET_NOTES',
  payload : new Promise((resolve, reject) => {
    var notes =[];
    axios
    .get(`${apiURL}/getNotes`)
    .then( res =>{
            res.data.forEach(obj=>{
                var note = {
                    title: obj.title,
                    content : obj.content,
                    id: obj.id
                }

                notes.push(note);
            })
            resolve(notes);
        }
   )
  })
})

export const fetchNotes = (payload =1 ) => ({
  
type: 'FETCH_NOTES',
payload : new Promise((resolve, reject) => {
    var limit = payload.limit
    var start = payload.startFrom
    var orderBy = payload.orderBy
    var notes =[];
    axios
    .get(`${apiURL}/note/${limit}/${start}/${orderBy}`)
    .then( res =>{
            res.data.forEach(obj=>{
                var note = {
                    title: obj.title,
                    content : obj.content,
                    id: obj.id
                }
                notes.push(note);
            })
            resolve(notes);
        }
   )
  })
})

export const deleteNote = (payload = {id: -1}) => ({
  type: 'DELETE_NOTE',
  id: payload.id,
  payload
})

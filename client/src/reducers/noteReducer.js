
const noteReducers = (state= [{
    title:"New Note",
    content :"Click here to edit...",
    id:0
}], action) => {

    switch(action.type){
        case "ADD_NOTE":

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
        var id = action.id;
        var newState = [
            ...state.slice(0, id),
            Object.assign({}, state[id], action.payload),
            ...state.slice(id+1)
        ]

         state = newState;
       
        break;

        case "DELETE_NOTE":
        console.log("State before delete",state);
         id = action.id;

         state = state.filter(function( obj ) {
            return obj.id !== id;
        });
        //  state = [...state.splice(id,1)]
        //  console.log("After Slice", state);
        break;

      
      

        default:
        return state;

    }
    return state;
};

export default noteReducers;
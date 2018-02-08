
const getNotesReducer = (state= [{
    title:"",
    content :""
}], action) => {

    switch(action.type){

        case "GET_NOTES_FILTER":
        console.log("In GET notes reducers");
        state = [
            ...state,
        ]
        break;

        default:
        return state;

    }
    return state;
};

export default getNotesReducer;
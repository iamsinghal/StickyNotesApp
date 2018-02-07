
const noteReducers = (state= [{
    title:"",
    content :""
}], action) => {

    switch(action.type){
        case "ADD_NOTE":

        state = [
            ...state,
            {
                title: action.payload.title,
                content: action.payload.content
            }
            
        ]
        console.log("New State", state)
        break;

        case "UPDATE_NOTE":
        state = {
            title: action.payload.title,
            content: action.content
        };
        break;

        default:
        return state;

    }
    return state;
};

export default noteReducers;
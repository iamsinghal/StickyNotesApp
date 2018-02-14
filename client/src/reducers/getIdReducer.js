const getIdReducer = (state = [], action) => {

    switch (action.type) {

        case "GET_ID_FULFILLED":
            var notes = []

            notes = action.payload;
            if (notes[0]) {
                state = notes[0].id;
            }
            break;

        default:
            return state;

    }
    return state;
};

export default getIdReducer;
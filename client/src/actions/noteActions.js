let nextNodeId =0;
export const addNote = (payload) => ({
  type: 'ADD_NOTE',
  id: nextNodeId++,
  payload
})

export const updateNote = (payload) => ({
  type: 'UPDATE_NOTE',
  id: nextNodeId++,
  payload
})

export const getNotes = (payload =1 ) => ({
  type: 'GET_NOTES',
  id: nextNodeId++,
  payload
})

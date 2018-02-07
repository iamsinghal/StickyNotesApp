let nextNodeId =0;
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
  id: nextNodeId++,
  payload
})

export const deleteNote = (payload = {id: -1}) => ({
  type: 'DELETE_NOTE',
  id: payload.id,
  payload
})

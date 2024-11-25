import { createSlice } from '@reduxjs/toolkit'

const flightSlice = createSlice({
  name: 'flights',
  initialState: {
    results: null,
  },
  reducers: {
    setFlightResults(state, action) {
      state.results = action.payload
    },
  },
})

export const { setFlightResults } = flightSlice.actions
export default flightSlice.reducer

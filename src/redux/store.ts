import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slices/themeSlice'
import flightReducer from './slices/flightSlice'

const store = configureStore({
  reducer: {
    theme: themeReducer,
    flights: flightReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

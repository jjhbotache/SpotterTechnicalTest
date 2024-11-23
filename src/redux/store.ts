import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slices/themeSlice'

export interface RootState {
  theme: 'light' | 'dark';
}

const store = configureStore({
  reducer: {
    theme: themeReducer
  }
})

export default store

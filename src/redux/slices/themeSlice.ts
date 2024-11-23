import { createSlice } from '@reduxjs/toolkit'

const media = window.matchMedia('(prefers-color-scheme: dark)')

const themeSlice = createSlice({
  name: 'theme',
  initialState: media.matches ? 'dark' : 'light',
  reducers: {
    toggleTheme: (state) => (state === 'light' ? 'dark' : 'light')
  }
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer

import { configureStore } from '@reduxjs/toolkit'
import tripListSlice from './feature/tripListSlice'


export const store = configureStore({
  reducer: {
   
    trips: tripListSlice
  }
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType <typeof store.getState>
export default store
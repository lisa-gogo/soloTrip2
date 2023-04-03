import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { PORT } from '../../App'
import { Trip } from '../../types'
import { RootState } from '../store'

type initialState = {
  loading: boolean,
  trips: Trip [],
  error : string
}

const initialState : initialState= {
  loading: false,
  trips: [],
  error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetchTrips = createAsyncThunk('trips/fetchTrips', () => {
  return axios
    .get(`${PORT}/api/trip`)
    .then(response => response.data)
})

const tripSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTrips.pending, state => {
      state.loading = true
    })
    builder.addCase(
      fetchTrips.fulfilled,
      (state, action: PayloadAction<Trip[]>) => {
        state.loading = false
        state.trips = action.payload
        state.error = ''
      }
    )
    builder.addCase(fetchTrips.rejected, (state, action) => {
      state.loading = false
      state.trips = []
      state.error = action.error.message || 'Something went wrong'
    })
  }
})


export default tripSlice.reducer
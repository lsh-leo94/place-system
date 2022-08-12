import { configureStore } from '@reduxjs/toolkit'
import placeReducer from '../reducers/placesSlice'

export const store = configureStore({
  reducer: {
    places: placeReducer
  }
})